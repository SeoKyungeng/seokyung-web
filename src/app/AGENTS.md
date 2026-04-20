<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-03-22 | Updated: 2026-04-20 -->

# app

## Purpose
Next.js App Router 기반 페이지 라우팅. `[locale]` 세그먼트로 다국어 지원, `/studio`에 Sanity Studio 임베드, `/api/*`로 Route Handlers 노출.

## Key Files

| File | Description |
|------|-------------|
| `robots.ts` | `robots.txt` 생성 — 크롤러 정책 |
| `sitemap.ts` | `sitemap.xml` 생성 — 다국어 URL 매핑 |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `[locale]/` | 로케일별 페이지 및 레이아웃 (see `[locale]/AGENTS.md`) |
| `api/` | Route Handlers — Sanity 재검증 웹훅 등 (see `api/AGENTS.md`) |
| `studio/` | Sanity Studio 임베드 라우트 — `/studio/*` (see `studio/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- 페이지는 `[locale]/` 하위에 위치 (사이트 UI)
- `params`는 `Promise<{ locale: string }>` 타입 (Next.js 16 비동기 패턴)
- `[locale]/` 와 `studio/` 는 별도의 `<html>` 루트 레이아웃을 가짐 — Studio는 사이트 Provider에서 격리됨
- 레이아웃에서 `<main id="main-content">` 제공 — 페이지에서 `<main>` 사용 금지
- `/api/*`, `/studio/*` 는 `src/proxy.ts` matcher에서 제외되어 locale prefix 미적용

<!-- MANUAL: -->
