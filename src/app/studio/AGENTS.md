<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-20 | Updated: 2026-04-20 -->

# studio

## Purpose
Sanity Studio 임베드 라우트. `/studio/*` 경로에서 CMS UI 제공. i18n 라우팅 및 사이트 레이아웃에서 격리됨.

## Key Files

| File | Description |
|------|-------------|
| `layout.tsx` | 독립 `<html>`/`<body>` 루트 — `[locale]` 레이아웃 프로바이더 우회, `noindex, nofollow` 메타 |
| `[[...tool]]/page.tsx` | Sanity catch-all 라우트 — `<NextStudio config={config} />` 렌더, `"use client"` |

## For AI Agents

### Working In This Directory
- `[[...tool]]` 은 Sanity가 요구하는 **optional catch-all** — Studio 내부 경로를 모두 흡수
- 이 라우트는 `proxy.ts` matcher에서 `studio`로 제외됨 — next-intl locale prefix 미적용
- `layout.tsx`가 루트 `[locale]/layout.tsx`와 완전히 분리되어 폰트/Provider/Header/Footer 로드 안 함 (Studio UI만)
- `sanity.config.ts` 는 프로젝트 루트에서 `../../../../sanity.config` 로 import

## Dependencies

### Internal
- `sanity.config.ts` — 프로젝트 루트 config
- 관련: `src/proxy.ts` matcher, `src/app/api/revalidate/` 웹훅

### External
- `next-sanity/studio` — `NextStudio` 컴포넌트

<!-- MANUAL: -->
