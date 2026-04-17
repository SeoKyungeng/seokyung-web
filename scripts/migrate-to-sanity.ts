/**
 * 기존 src/data/*.json → Sanity CMS 마이그레이션 스크립트
 *
 * 실행: pnpm migrate:sanity
 * 필요 env: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_WRITE_TOKEN
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const PUBLIC_DIR = resolve(process.cwd(), "public");
const DATA_DIR = resolve(process.cwd(), "src/data");

function readJson<T>(name: string): T {
  return JSON.parse(readFileSync(resolve(DATA_DIR, name), "utf8"));
}

// ─────────────────────────────────────────────────────────────
// 이미지 업로드 (중복 방지 캐시)
// ─────────────────────────────────────────────────────────────
const imageCache = new Map<string, { _type: "image"; asset: { _type: "reference"; _ref: string } }>();

async function uploadImage(webPath: string | null | undefined) {
  if (!webPath) return null;
  if (imageCache.has(webPath)) return imageCache.get(webPath)!;

  const filePath = resolve(PUBLIC_DIR, webPath.replace(/^\//, ""));
  if (!existsSync(filePath)) {
    console.warn(`  [image missing] ${webPath}`);
    return null;
  }

  const buf = readFileSync(filePath);
  const asset = await client.assets.upload("image", buf, {
    filename: webPath.split("/").pop(),
  });
  const ref = {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: asset._id },
  };
  imageCache.set(webPath, ref);
  console.log(`  ↑ image ${webPath} → ${asset._id}`);
  return ref;
}

// ─────────────────────────────────────────────────────────────
// 타입 정의 (원본 JSON)
// ─────────────────────────────────────────────────────────────
type Loc = { ko: string; en: string };

// ─────────────────────────────────────────────────────────────
// 마이그레이션 함수들
// ─────────────────────────────────────────────────────────────
async function migrateCompany() {
  const src = readJson<{
    name: Loc;
    address: Loc;
    phone: string;
    fax: string;
    email: string;
    coordinates: { lat: number; lng: number };
  }>("company.json");

  await client.createOrReplace({
    _id: "companyInfo",
    _type: "companyInfo",
    ...src,
  });
  console.log("✓ companyInfo");
}

async function migrateCeo() {
  const src = readJson<{
    name: Loc;
    title: Loc;
    greeting: { highlight: Loc; body: Loc };
  }>("ceo.json");

  await client.createOrReplace({ _id: "ceo", _type: "ceo", ...src });
  console.log("✓ ceo");
}

async function migratePhilosophy() {
  const src = readJson<{
    slogan: Loc;
    values: Array<{
      key: string;
      icon: string;
      title: Loc;
      subtitle: Loc;
      items: Loc[];
    }>;
  }>("philosophy.json");

  await client.createOrReplace({
    _id: "philosophy",
    _type: "philosophy",
    slogan: src.slogan,
    values: src.values.map((v, i) => ({
      _key: `v-${i}-${v.key}`,
      _type: "value",
      ...v,
      items: v.items.map((it, j) => ({ _key: `it-${j}`, _type: "localizedText", ...it })),
    })),
  });
  console.log("✓ philosophy");
}

async function migrateOrganization() {
  const src = readJson<{
    departments: Array<{ id: string; name: Loc; parent: string | null }>;
  }>("organization.json");

  await client.createOrReplace({
    _id: "organization",
    _type: "organization",
    departments: src.departments.map((d, i) => ({
      _key: `dept-${i}-${d.id}`,
      _type: "department",
      deptId: d.id,
      name: d.name,
      parent: d.parent ?? undefined,
    })),
  });
  console.log("✓ organization");
}

async function migrateSustainability() {
  const src = readJson<any>("sustainability.json");

  async function esg(entry: any) {
    return {
      key: entry.key,
      title: entry.title,
      subtitle: entry.subtitle,
      description: { _type: "localizedText", ...entry.description },
      icon: entry.icon,
      image: await uploadImage(entry.image),
      items: entry.items.map((it: Loc, i: number) => ({
        _key: `it-${i}`,
        _type: "localizedString",
        ...it,
      })),
    };
  }

  await client.createOrReplace({
    _id: "sustainability",
    _type: "sustainability",
    intro: {
      vision: { _type: "localizedText", ...src.intro.vision },
      description: { _type: "localizedText", ...src.intro.description },
    },
    e: await esg(src.esg.e),
    s: await esg(src.esg.s),
    g: await esg(src.esg.g),
  });
  console.log("✓ sustainability");
}

async function migrateStats() {
  const src = readJson<{ items: any[] }>("stats.json");

  await client.createOrReplace({
    _id: "stats",
    _type: "stats",
    items: src.items.map((s, i) => ({
      _key: `stat-${i}`,
      _type: "stat",
      label: s.label,
      value: typeof s.value === "number" ? s.value : undefined,
      text: s.text ?? undefined,
      prefix: s.prefix ?? undefined,
      suffix: s.suffix ?? undefined,
    })),
  });
  console.log("✓ stats");
}

async function migrateClients() {
  const src = readJson<{
    clients: Array<{ id: string; name: Loc; logo: string | null }>;
  }>("clients.json");

  for (const [i, c] of src.clients.entries()) {
    const logo = await uploadImage(c.logo);
    await client.createOrReplace({
      _id: `client-${c.id}`,
      _type: "client",
      clientId: c.id,
      name: c.name,
      logo: logo ?? undefined,
      order: i,
    });
  }
  console.log(`✓ clients (${src.clients.length})`);
}

async function migrateProducts() {
  const src = readJson<{
    items: Array<{
      id: string;
      image: string;
      alt: Loc;
    }>;
  }>("products.json");

  for (const [i, p] of src.items.entries()) {
    const image = await uploadImage(p.image);
    if (!image) continue;
    await client.createOrReplace({
      _id: `product-${p.id}`,
      _type: "product",
      productId: p.id,
      image,
      alt: p.alt,
      order: i,
    });
  }
  console.log(`✓ products (${src.items.length})`);
}

async function migrateEquipment() {
  const src = readJson<Record<string, any[]>>("equipment.json");
  const categoryOrder = ["cnc", "mct", "lathe", "other"];
  let index = 0;

  for (const cat of categoryOrder) {
    for (const item of src[cat] ?? []) {
      const photo = await uploadImage(item.photo);
      await client.createOrReplace({
        _id: `equipment-${item.id}`,
        _type: "equipment",
        equipmentId: item.id,
        category: item.type,
        name: item.name,
        model: item.model || undefined,
        manufacturer: item.manufacturer,
        quantity: item.quantity,
        photo: photo ?? undefined,
        specs: (item.specs ?? []).map((s: any, i: number) => ({
          _key: `spec-${i}`,
          _type: "spec",
          label: s.label,
          value: s.value,
        })),
        order: index++,
      });
    }
  }
  console.log(`✓ equipment (${index})`);
}

// ─────────────────────────────────────────────────────────────
// 실행
// ─────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n▶ Sanity 마이그레이션 시작`);
  console.log(`  projectId: ${projectId}`);
  console.log(`  dataset:   ${dataset}\n`);

  await migrateCompany();
  await migrateCeo();
  await migratePhilosophy();
  await migrateOrganization();
  await migrateSustainability();
  await migrateStats();
  await migrateClients();
  await migrateProducts();
  await migrateEquipment();

  console.log(`\n✅ 완료\n`);
}

main().catch((e) => {
  console.error("❌ 실패:", e);
  process.exit(1);
});
