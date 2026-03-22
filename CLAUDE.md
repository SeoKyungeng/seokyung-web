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

(주)서경엔지니어링 B2B 기업 홈페이지. Next.js 16 App Router + TypeScript + Tailwind CSS v4 + next-intl v4.

### Next.js 16 주의사항
- `middleware.ts` 대신 **`proxy.ts`** 사용 (deprecated convention)
- `next lint` 명령 제거됨 → `eslint .` 직접 사용
- 페이지 `params`는 **`Promise<{ locale: string }>`** 타입 — `await params` 필수

### Tailwind CSS v4
- CSS-first 설정: `src/styles/globals.css`의 `@theme { }` 블록
- `tailwind.config.ts` 파일 없음
- 커스텀 토큰: `midnight`, `slate`, `steel`, `smoke`, `primary-300/400/500`

### i18n (next-intl v4)
- `[locale]` App Router 세그먼트: `/ko/`, `/en/`
- 내부 링크: `@/i18n/navigation`의 `Link` 사용 (next/link 직접 사용 금지)
- Server Component → `getTranslations()`, Client Component → `useTranslations()`
- 번역 파일: `src/messages/{ko,en}.json` — 양쪽 키 구조 반드시 동일
- 콘텐츠 데이터: `src/data/*.json` (`{ ko: "...", en: "..." }` LocalizedText 패턴)

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
