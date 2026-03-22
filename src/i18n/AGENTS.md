<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-03-22 | Updated: 2026-03-22 -->

# i18n

## Purpose
next-intl v4 다국어 설정. 라우팅, 요청 설정, 네비게이션 헬퍼.

## Key Files

| File | Description |
|------|-------------|
| `routing.ts` | `defineRouting` — locales: `["ko", "en"]`, defaultLocale: `"ko"` |
| `request.ts` | `getRequestConfig` — 요청별 locale 감지 및 메시지 로드 |
| `navigation.ts` | `createNavigation` — locale-aware `Link`, `useRouter`, `usePathname` 제공 |

## For AI Agents

### Working In This Directory
- 내부 링크는 반드시 `@/i18n/navigation`의 `Link` 사용 (next/link 직접 사용 금지)
- Server Component에서 번역: `getTranslations` (from `next-intl/server`)
- Client Component에서 번역: `useTranslations` (from `next-intl`)

<!-- MANUAL: -->
