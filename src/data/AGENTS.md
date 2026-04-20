<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-03-22 | Updated: 2026-04-20 -->

# data

## Purpose
콘텐츠 JSON **백업**. Sanity CMS 도입(PR #1) 이후 런타임 미사용 — 참고용, 추후 삭제 예정. 실제 데이터는 동일 이름의 Sanity 문서(`companyInfo`, `ceo`, `organization`, `equipment`, `product`, `sustainability`, `stats`)가 보유.

## Key Files

| File | Description |
|------|-------------|
| `company.json` | 회사 정보 |
| `ceo.json` | CEO 인사말 |
| `organization.json` | 조직도 |
| `equipment.json` | CNC/MCT 설비 목록 |
| `products.json` | 가공제품 목록 |
| `sustainability.json` | ESG 정책 |
| `stats.json` | 통계 수치 |

## For AI Agents

### Working In This Directory
- **런타임 의존 금지** — 페이지/컴포넌트는 반드시 `@/lib/sanity/fetchers` 사용
- 콘텐츠 수정은 Sanity Studio(`/studio`)에서 수행 — 이 JSON 파일을 고쳐도 사이트에 반영되지 않음
- `scripts/migrate-to-sanity.ts` 초기 시드용 참고 자료 역할
- 장기적으로는 디렉토리 전체 삭제 예정 — 신규 코드에서 import 하지 말 것

### 타입 참조
- LocalizedText 등 타입 정의: `src/lib/types.ts`
- Sanity 응답 타입: `src/lib/sanity/types.ts`

<!-- MANUAL: -->
