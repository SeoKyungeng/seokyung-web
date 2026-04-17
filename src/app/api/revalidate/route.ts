import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

/**
 * Sanity 웹훅 수신 → 해당 문서 타입 태그 재검증.
 *
 * Sanity Studio → API → GROQ-powered Webhooks 에서 아래와 같이 설정:
 *   URL:        https://<domain>/api/revalidate
 *   Dataset:    production
 *   Trigger:    Create / Update / Delete
 *   Filter:     _type in ["equipment","product","client","companyInfo","ceo",
 *                         "philosophy","organization","sustainability","stats"]
 *   Projection: {_type}
 *   Secret:     SANITY_REVALIDATE_SECRET 값
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: "SANITY_REVALIDATE_SECRET 미설정" },
      { status: 500 }
    );
  }

  const signature = req.headers.get(SIGNATURE_HEADER_NAME);
  if (!signature) {
    return NextResponse.json(
      { message: "서명 헤더 누락" },
      { status: 401 }
    );
  }

  const rawBody = await req.text();
  const valid = await isValidSignature(rawBody, signature, secret);
  if (!valid) {
    return NextResponse.json(
      { message: "Invalid signature" },
      { status: 401 }
    );
  }

  let parsed: { _type?: string };
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const type = parsed._type;
  if (!type) {
    return NextResponse.json(
      { message: "Bad payload: _type 누락" },
      { status: 400 }
    );
  }

  revalidateTag(type, "max");

  return NextResponse.json({ revalidated: true, tag: type });
}
