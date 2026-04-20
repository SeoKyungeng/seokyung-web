<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-20 | Updated: 2026-04-20 -->

# api

## Purpose
Next.js App Router Route Handlers 컨테이너. locale 라우팅에서 제외되도록 `proxy.ts` matcher가 `api`를 skip함.

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `revalidate/` | Sanity 웹훅 수신 → 태그 기반 ISR 재검증 (see `revalidate/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- `/api/*` 경로는 `src/proxy.ts` matcher에서 제외 — locale prefix 없음
- Next.js 16: `revalidateTag(tag, profile)` — 두 번째 인자(`"default" | "max"`) 필수

<!-- MANUAL: -->
