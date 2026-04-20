<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-20 | Updated: 2026-04-20 -->

# schemas

## Purpose
Sanity 스키마 정의. 싱글턴 6종 + 컬렉션 3종 + 공용 오브젝트(localized). 필드 단위 i18n(`{ko,en}`) 패턴을 기반으로 한다.

## Key Files

| File | Description |
|------|-------------|
| `index.ts` | `schemaTypes` 배열 + `SINGLETON_TYPES` Set — 스키마 등록의 단일 source |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `documents/` | 컬렉션형 문서 (다중 문서 허용) — `equipment`, `product`, `client` |
| `singletons/` | 싱글턴 문서 (문서 ID 고정, 단일 인스턴스) — `companyInfo`, `ceo`, `philosophy`, `organization`, `sustainability`, `stats` |
| `objects/` | 재사용 오브젝트 타입 — `localizedString`, `localizedText` (필드 단위 i18n) |

## For AI Agents

### Working In This Directory
- 다국어 텍스트는 `localizedString`/`localizedText` 오브젝트 사용 — `{ ko: string, en: string }` 구조
- 이미지는 `image` 타입으로 정의하고 GROQ에서 `field.asset->url` 로 unwrap
- 싱글턴은 `structure.ts`에서 `documentId` 고정 — 스키마 쪽에서는 일반 문서처럼 정의
- 정렬 필드(`order`)는 컬렉션에서 관례적으로 사용 — GROQ `order(order asc)` 로 정렬

### Common Patterns
- 필드 이름은 camelCase, slug·id 성격 필드는 `*Id` (예: `equipmentId`)로 구분 → GROQ projection에서 `"id": equipmentId` 형태로 rename
- 복잡한 ESG 블록처럼 반복 구조는 `esgFields()` 같은 query 헬퍼로 wrap (see `src/lib/sanity/queries.ts`)

## Dependencies

### Internal
- 소비자: `../structure.ts`, `../../sanity.config.ts`

### External
- `sanity` — `defineType`, `defineField`, `defineArrayMember`

<!-- MANUAL: -->
