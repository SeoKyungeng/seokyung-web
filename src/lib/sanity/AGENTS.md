<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-20 | Updated: 2026-04-20 -->

# sanity

## Purpose
런타임 Sanity 클라이언트 · GROQ 쿼리 · 타입 정의 · 페처 유틸. 서버 컴포넌트에서 콘텐츠 fetch 시 사용되는 **단일 진입점**.

## Key Files

| File | Description |
|------|-------------|
| `client.ts` | `createClient` 인스턴스 — `perspective: "published"`, `useCdn: false` (ISR 충돌 회피) |
| `env.ts` | 환경변수 검증 (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `_DATASET`, `_API_VERSION`) — 누락 시 throw |
| `queries.ts` | `defineQuery` 기반 GROQ — equipment/product/client/companyInfo/ceo/philosophy/organization/sustainability/stats |
| `fetchers.ts` | `React.cache`로 래핑된 fetch 함수들 — `{ next: { revalidate: 3600, tags: [type] } }` ISR 적용 |
| `types.ts` | `DOCUMENT_TYPES` const array + 모든 Sanity 응답 타입. `revalidateTag`·웹훅 필터의 단일 source-of-truth |

## For AI Agents

### Working In This Directory
- **ISR 태그 재검증**이 기본 — 각 페처는 `revalidate: 3600` + 태그(문서 타입 이름)로 fetch
- **React.cache**로 페처를 감싸서 동일 렌더 트리 내 중복 요청을 dedupe
- `useCdn: false`는 의도적 — Sanity CDN + Next.js ISR 캐시가 충돌하는 문제 회피 (PR #4 참고)
- `DocumentType` 유니언은 `DOCUMENT_TYPES` const array에서 파생 — 신규 문서 추가 시 두 곳(여기 + `sanity/schemas/index.ts`) 동기화
- 이미지 URL은 GROQ projection 단계에서 `asset->url`로 unwrap (string만 반환)

### Common Patterns
```tsx
// Server Component에서
import { getCompanyInfo, getPhilosophy } from "@/lib/sanity/fetchers";

export default async function Page() {
  const [company, philosophy] = await Promise.all([
    getCompanyInfo(),
    getPhilosophy(),
  ]);
  // ...
}
```

### 신규 문서 추가 체크리스트
1. `sanity/schemas/` 스키마 추가 + `index.ts` 등록
2. `types.ts`의 `DOCUMENT_TYPES` 배열 + `Sanity*` 타입 추가
3. `queries.ts`의 GROQ 쿼리 추가 (`defineQuery`)
4. `fetchers.ts`의 `cache`-wrapped 페처 추가 (태그 = 문서 타입 이름)

## Dependencies

### Internal
- `@/lib/types` — `LocalizedText` 기본 타입 재사용

### External
- `next-sanity` ^12.3.0 — `createClient`, `defineQuery`
- `@sanity/client` — Sanity 코어 클라이언트 타입

<!-- MANUAL: -->
