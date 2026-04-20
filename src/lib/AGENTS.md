<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-03-22 | Updated: 2026-04-20 -->

# lib

## Purpose
타입 정의·상수·유틸·서버 액션·밸리데이션 스키마·Sanity 런타임 클라이언트. 앱 전역에서 재사용하는 비 UI 로직.

## Key Files

| File | Description |
|------|-------------|
| `types.ts` | 콘텐츠 타입 — `LocalizedText`(`{ko,en}`) 및 파생 타입 (Company, CEO, EquipmentItem, ProductItem, ESGPolicy, Stat 등) |
| `constants.ts` | 전역 상수 — `SITE_URL` 등 |
| `email.ts` | `nodemailer` 트랜스포터 초기화 + 문의 메일 템플릿 |
| `motion.ts` | framer-motion 이징/지속시간 상수 (Supanova design 기반) |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `actions/` | 서버 액션 — `contact.ts` (`"use server"` 문의 폼 제출 → nodemailer) |
| `schemas/` | `zod` 밸리데이션 스키마 — `contact.ts` (ContactFormData 타입 파생) |
| `sanity/` | Sanity 런타임: client/env/queries/fetchers/types (see `sanity/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- `LocalizedText { ko: string; en: string }` 패턴은 프로젝트 전체 다국어 텍스트의 기본 형태 — Sanity `localizedString`/`localizedText` 오브젝트와 동일 구조
- 서버 전용 코드(`email.ts`, `actions/`)는 클라이언트 번들에 포함되지 않도록 주의 (`"use server"` 지시어 또는 서버 컴포넌트에서만 import)
- Sanity 페처 추가·변경은 `sanity/AGENTS.md` 가이드 참고
- 신규 서버 액션은 `actions/`에 파일 단위로 추가, Zod 스키마는 `schemas/`에 대응 파일 배치

<!-- MANUAL: -->
