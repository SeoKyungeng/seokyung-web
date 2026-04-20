<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-03-22 | Updated: 2026-04-20 -->

# [locale]

## Purpose
로케일별(`ko`/`en`) 페이지 라우트. 루트 레이아웃에서 Header, Footer, Provider 통합. Vercel Analytics 삽입 지점.

## Key Files

| File | Description |
|------|-------------|
| `layout.tsx` | 루트 레이아웃 — 폰트, i18n Provider, Lenis/Toast/Transition Provider, Header, Footer, GrainOverlay, Vercel `<Analytics />`, JSON-LD Organization 스키마, `generateMetadata` (OG 이미지 포함) |
| `page.tsx` | 홈 페이지 — Sanity fetchers로 콘텐츠 조회 |
| `not-found.tsx` | 404 페이지 (Syne 120px + 홈 CTA) |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `about/` | 회사소개 — `getCeo`, `getPhilosophy`, `getOrganization` |
| `equipment/` | 설비현황 — `getEquipmentList` |
| `products/` | 가공제품 — `getProductList` |
| `sustainability/` | 지속가능경영 — `getSustainability` |
| `contact/` | 문의하기 — `getCompanyInfo`, 폼 액션 `sendContactEmail` |

## For AI Agents

### Working In This Directory
- 레이아웃이 `<main id="main-content">`를 제공하므로 페이지에서 `<main>` 사용 금지
- 페이지 컴포넌트는 `async function` + `getTranslations()` + Sanity fetchers 패턴
- `params`는 `Promise<{ locale: string }>` — `const { locale } = await params` 필수
- `generateStaticParams()`로 `["ko", "en"]` 정적 파라미터 제공
- 콘텐츠 fetch는 반드시 `@/lib/sanity/fetchers` 경유 — 직접 `sanityClient.fetch` 금지 (cache + revalidateTag 이점 상실)

### Common Patterns
```tsx
import { getTranslations } from "next-intl/server";
import { getEquipmentList } from "@/lib/sanity/fetchers";

export default async function EquipmentPage() {
  const t = await getTranslations("pages.equipment");
  const equipment = await getEquipmentList();
  return <section>...</section>;
}
```

### 메타데이터 패턴
- `generateMetadata({ params })` 로 locale 기반 OG, title, description 구성
- `SITE_URL`은 `@/lib/constants` 에서 import

<!-- MANUAL: -->
