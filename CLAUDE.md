# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # 개발 서버 (Turbopack)
pnpm build        # 프로덕션 빌드 + TypeScript 검사
pnpm lint         # ESLint (eslint .)
pnpm start        # 프로덕션 서버
```

## Architecture

(주)서경엔지니어링 B2B 기업 홈페이지. Next.js 16 App Router + TypeScript + Tailwind CSS v4 + next-intl v4 + Sanity CMS.

### Next.js 16 주의사항
- `middleware.ts` 대신 **`proxy.ts`** 사용 (deprecated convention)
- `proxy.ts` matcher는 `api|trpc|studio|_next|_vercel|.*\..*` 제외 — 신규 API 라우트 추가 시 영향 없음, 신규 앱 라우트는 i18n 대상에 포함됨
- `next lint` 명령 제거됨 → `eslint .` 직접 사용
- 페이지 `params`는 **`Promise<{ locale: string }>`** 타입 — `await params` 필수
- `revalidateTag(tag, profile)` — Next 16부터 두 번째 인자 필수 (`"default" | "max"` 등)

### Tailwind CSS v4
- CSS-first 설정: `src/styles/globals.css`의 `@theme { }` 블록
- `tailwind.config.ts` 파일 없음
- 커스텀 토큰: `midnight`, `slate`, `steel`, `smoke`, `primary-300/400/500`

### i18n (next-intl v4)
- `[locale]` App Router 세그먼트: `/ko/`, `/en/`
- 내부 링크: `@/i18n/navigation`의 `Link` 사용 (next/link 직접 사용 금지)
- Server Component → `getTranslations()`, Client Component → `useTranslations()`
- 번역 파일: `src/messages/{ko,en}.json` — 양쪽 키 구조 반드시 동일
- 콘텐츠 데이터: **Sanity CMS**에서 fetch (`{ ko, en }` LocalizedText 패턴 유지)
- `src/data/*.json`은 **참고용 백업** — 런타임에 사용되지 않음, 추후 삭제 예정

### Sanity CMS
- Studio: `/studio` 라우트에 임베드 (Next.js 16 App Router 내부)
- 스키마: `sanity/schemas/` — 싱글턴 6종 + 컬렉션 3종
- i18n 전략: **필드 단위 객체** (`localizedString`, `localizedText`) — `{ ko, en }` 구조
- 데이터 접근: `src/lib/sanity/fetchers.ts` (타입별 함수, ISR 3600s + 태그 재검증)
- 이미지: Sanity CDN (`cdn.sanity.io`) — `next.config.ts`의 `remotePatterns`에 허용
- 재검증 웹훅: `src/app/api/revalidate/route.ts` — `@sanity/webhook` HMAC 서명 검증
- 아키텍처 설명: `docs/sanity-architecture.md` — `[[...tool]]` 라우팅, 레이아웃 격리, ISR 흐름
- 도입 계획서: `docs/plan/CMS_PLAN.md`
- 담당자 매뉴얼: `docs/cms-manual.md`

### 레이아웃 구조
- `layout.tsx`가 `<main id="main-content">` 제공 → 페이지에서 `<main>` 사용 금지
- Provider 중첩 순서: `NextIntlClientProvider` > `LenisProvider` > `ToastProvider`
- 전역 요소: `GrainOverlay`(z-[100]), `Header`(z-40), `Footer`

### 컴포넌트 규칙
- Server Component 기본. 클라이언트 훅/이벤트 필요 시 `"use client"` 명시
- z-index 체계: Header(40) < 모바일메뉴(50) < Toast(60) < GrainOverlay(100)
- 모션 비활성화: `useReducedMotion()` 훅 (`useSyncExternalStore` 기반)
- GSAP ticker 콜백은 named reference 저장 → cleanup에서 `ticker.remove()` 호출

### 디자인 문서
- `docs/design/design.md`가 디자인 시스템의 **정본(source of truth)**
- 수치 불일치 시: `design.md` > `pages/*.md` > `CHECKLIST.md`
- 개발 진행도: `docs/plan/CHECKLIST.md`

## Style

- 한국어 사용
- 커밋 메시지는 한국어, conventional commit prefix 사용
- 커밋 메시지에 클로드 관련 언급 금지
