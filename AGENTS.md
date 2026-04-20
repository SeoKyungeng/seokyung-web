<!-- Generated: 2026-03-22 | Updated: 2026-04-20 -->

# seokyung-web

## Purpose
(주)서경엔지니어링 B2B 기업 홈페이지. CNC/MCT 정밀 가공 전문기업의 다국어(KO/EN) 웹사이트. **Sanity CMS**로 콘텐츠 운영.

## Key Files

| File | Description |
|------|-------------|
| `package.json` | pnpm 패키지 매니저, 의존성 및 스크립트 (`migrate:sanity` 포함) |
| `next.config.ts` | Next.js 16 설정 + next-intl 플러그인 + `cdn.sanity.io` 이미지 허용 |
| `sanity.config.ts` | Sanity Studio 설정 — `/studio` basePath, 싱글턴 액션 제한 |
| `tsconfig.json` | TypeScript 설정 (ES2022, bundler resolution) |
| `postcss.config.mjs` | Tailwind CSS v4 PostCSS 플러그인 |
| `eslint.config.mjs` | ESLint 9 flat config (eslint-config-next 네이티브) |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `src/` | 애플리케이션 소스 코드 (see `src/AGENTS.md`) |
| `sanity/` | Sanity Studio 스키마 및 데스크 구조 (see `sanity/AGENTS.md`) |
| `docs/` | 디자인 문서 및 프로젝트 관리 (see `docs/AGENTS.md`) |
| `public/` | 정적 자산 (폰트, 이미지, 사이트 소유확인 파일) |
| `scripts/` | 마이그레이션 스크립트 (`migrate-to-sanity.ts`) |

## For AI Agents

프로젝트 규칙·스타일·아키텍처 정본은 `CLAUDE.md` — 중복하지 않음.

### Quality Gates
- `pnpm lint`
- `pnpm build` (TypeScript 검사 포함)
- `pnpm dev` → `/studio` 접근 sanity check (Sanity 로그인 필요)

### Key Docs
- `CLAUDE.md` — 프로젝트 정본 가이드
- `docs/sanity-architecture.md` — Studio/ISR 구조
- `docs/cms-manual.md` — 담당자 CMS 운영 매뉴얼

## Dependencies

### External
- `next` ^16.2.1 — React 프레임워크
- `react` ^19.2.4 — UI 라이브러리
- `next-intl` ^4.8.3 — i18n
- `sanity` ^5.21.0 / `next-sanity` ^12.3.0 — CMS Studio + 런타임 클라이언트
- `@sanity/vision` — GROQ 플레이그라운드
- `@sanity/webhook` — 재검증 웹훅 HMAC 검증
- `@vercel/analytics` — Vercel Analytics
- `framer-motion` ^12.38.0 — 컴포넌트 애니메이션
- `gsap` ^3.14.2 — 스크롤 기반 애니메이션
- `lenis` ^1.3.19 — 스무스 스크롤
- `lucide-react` ^0.577.0 — 아이콘
- `tailwindcss` ^4.2.2 — CSS 프레임워크
- `nodemailer` — 문의 폼 메일 전송
- `react-hook-form` + `zod` — 문의 폼 밸리데이션

<!-- MANUAL: -->
