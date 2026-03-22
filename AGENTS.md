<!-- Generated: 2026-03-22 | Updated: 2026-03-22 -->

# seokyung-web

## Purpose
(주)서경엔지니어링 B2B 기업 홈페이지. CNC/MCT 정밀 가공 전문기업의 다국어(KO/EN) 웹사이트.

## Key Files

| File | Description |
|------|-------------|
| `package.json` | pnpm 패키지 매니저, 의존성 및 스크립트 |
| `next.config.ts` | Next.js 16 설정 + next-intl 플러그인 |
| `tsconfig.json` | TypeScript 설정 (ES2022, bundler resolution) |
| `postcss.config.mjs` | Tailwind CSS v4 PostCSS 플러그인 |
| `eslint.config.mjs` | ESLint 9 flat config (eslint-config-next 네이티브) |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `src/` | 애플리케이션 소스 코드 (see `src/AGENTS.md`) |
| `docs/` | 디자인 문서 및 프로젝트 관리 (see `docs/AGENTS.md`) |
| `public/` | 정적 자산 (폰트, 이미지) |

## For AI Agents

### Working In This Directory
- 패키지 매니저는 **pnpm** 사용
- Next.js **16** — `proxy.ts` (middleware.ts deprecated), `params: Promise<>` 비동기 패턴
- Tailwind CSS **v4** — CSS-first `@theme` 설정 (tailwind.config.ts 없음)
- next-intl **v4** — `[locale]` App Router 세그먼트 라우팅
- ESLint는 `eslint .` 명령 사용 (`next lint` 제거됨)

### Testing Requirements
- `pnpm lint` — ESLint 검사
- `pnpm build` — TypeScript + 프로덕션 빌드 검증

### Common Patterns
- Server Components 기본, Client Components는 `"use client"` 명시
- 다국어 텍스트: Server → `getTranslations`, Client → `useTranslations`
- 콘텐츠 데이터: `src/data/*.json` (LocalizedText 패턴)
- 컬러 시스템: midnight/cyan-400 다크 테마

## Dependencies

### External
- `next` ^16.2.1 — React 프레임워크
- `react` ^19.2.4 — UI 라이브러리
- `next-intl` ^4.8.3 — i18n
- `framer-motion` ^12.38.0 — 컴포넌트 애니메이션
- `gsap` ^3.14.2 — 스크롤 기반 애니메이션
- `lenis` ^1.3.19 — 스무스 스크롤
- `lucide-react` ^0.577.0 — 아이콘
- `tailwindcss` ^4.2.2 — CSS 프레임워크

<!-- MANUAL: -->
