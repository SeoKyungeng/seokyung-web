<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-20 | Updated: 2026-04-20 -->

# sanity

## Purpose
Sanity CMS Studio 구성 루트. 스키마 정의와 데스크 구조를 포함하며, `sanity.config.ts`(프로젝트 루트)에서 이 디렉토리를 import 해 `/studio` 라우트에 임베드됨.

## Key Files

| File | Description |
|------|-------------|
| `structure.ts` | 데스크(Studio Structure) — 싱글턴 6개 리스트 + 컬렉션 3개, `SINGLETON_TYPES` re-export |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `schemas/` | 문서/오브젝트 스키마 정의 (see `schemas/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- `sanity.config.ts`(프로젝트 루트)가 이 디렉토리의 `structure`, `schemaTypes`, `SINGLETON_TYPES`를 import
- 싱글턴은 `SINGLETON_TYPES` Set으로 관리 — 추가 시 `schemas/index.ts` + `structure.ts` 양쪽에 반영
- 싱글턴 액션은 `publish`, `discardChanges`, `restore`만 노출 (create/delete 금지)
- Studio 임베드: `src/app/studio/[[...tool]]/page.tsx` 에서 `NextStudio config={config}` 렌더

### Common Patterns
- 신규 문서 타입 추가 흐름:
  1. `schemas/documents/<name>.ts` 또는 `schemas/singletons/<name>.ts` 작성
  2. `schemas/index.ts`의 `schemaTypes` 배열에 등록 (싱글턴은 `SINGLETON_TYPES` Set에도 추가)
  3. `structure.ts`에 `listItem` 또는 `documentTypeListItem` 추가
  4. `src/lib/sanity/types.ts`의 `DOCUMENT_TYPES` + 타입 정의 추가
  5. `src/lib/sanity/queries.ts` + `fetchers.ts`에 GROQ / `cache`-wrapped fetch 추가

## Dependencies

### Internal
- `../sanity.config.ts` — 프로젝트 루트 config 파일 (이 디렉토리를 소비)
- `src/lib/sanity/` — 런타임 Sanity 클라이언트 / 페처 / 타입

### External
- `sanity` ^5.21.0 — Studio 코어
- `@sanity/vision` — GROQ 플레이그라운드 플러그인

<!-- MANUAL: -->
