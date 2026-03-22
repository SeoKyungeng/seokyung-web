<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-03-22 | Updated: 2026-03-22 -->

# app

## Purpose
Next.js App Router 기반 페이지 라우팅. `[locale]` 세그먼트로 다국어 지원.

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `[locale]/` | 로케일별 페이지 및 레이아웃 (see `[locale]/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- 모든 페이지는 `[locale]/` 하위에 위치
- `params`는 `Promise<{ locale: string }>` 타입 (Next.js 16 비동기 패턴)
- 페이지 컴포넌트는 async Server Component
- 레이아웃에서 `<main id="main-content">` 제공 — 페이지에서 `<main>` 사용 금지

<!-- MANUAL: -->
