<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-20 | Updated: 2026-04-20 -->

# revalidate

## Purpose
Sanity Studio GROQ-powered Webhook 수신 엔드포인트. HMAC 서명 검증 후 수정된 문서 타입에 해당하는 ISR 태그를 재검증.

## Key Files

| File | Description |
|------|-------------|
| `route.ts` | `POST` 핸들러 — `@sanity/webhook` `isValidSignature`로 서명 검증 → `revalidateTag(type, "max")` |

## For AI Agents

### Working In This Directory
- **서명 검증 필수** — `SANITY_REVALIDATE_SECRET` 환경변수 기준 HMAC 검증, 실패 시 401
- 웹훅 payload projection은 `{_type}` 고정 — `_type` 누락 시 400
- `revalidateTag(type, "max")` 의 두 번째 인자는 Next.js 16에서 필수 (`"default" | "max"`)
- 태그 이름은 Sanity 문서 타입명과 동일 — `src/lib/sanity/types.ts`의 `DOCUMENT_TYPES` 가 진실

### Sanity Webhook 설정 (Studio 측)
```
URL:        https://<domain>/api/revalidate
Trigger:    Create / Update / Delete
Filter:     _type in [DOCUMENT_TYPES 전체]
Projection: {_type}
Secret:     SANITY_REVALIDATE_SECRET 값
```

### Testing Requirements
- Studio에서 문서 발행 → 수초 내 해당 페이지 재생성 확인
- 서명 오류·타임아웃 케이스는 Sanity Studio 의 Webhook 로그로 진단

## Dependencies

### External
- `@sanity/webhook` ^4.0.4 — `isValidSignature`, `SIGNATURE_HEADER_NAME`
- `next/cache` — `revalidateTag`

<!-- MANUAL: -->
