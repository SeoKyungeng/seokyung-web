<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-03-22 | Updated: 2026-03-22 -->

# src

## Purpose
애플리케이션 전체 소스 코드. Next.js App Router 구조 기반.

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `app/` | Next.js App Router 페이지 및 레이아웃 (see `app/AGENTS.md`) |
| `components/` | 재사용 가능한 React 컴포넌트 (see `components/AGENTS.md`) |
| `data/` | 더미/실제 콘텐츠 JSON 데이터 (see `data/AGENTS.md`) |
| `hooks/` | 커스텀 React 훅 (see `hooks/AGENTS.md`) |
| `i18n/` | 다국어 라우팅 및 설정 (see `i18n/AGENTS.md`) |
| `lib/` | TypeScript 타입 정의 및 유틸리티 (see `lib/AGENTS.md`) |
| `messages/` | i18n 번역 메시지 파일 (see `messages/AGENTS.md`) |
| `providers/` | React Context 프로바이더 (see `providers/AGENTS.md`) |
| `styles/` | 글로벌 CSS 및 Tailwind 테마 (see `styles/AGENTS.md`) |

## Key Files

| File | Description |
|------|-------------|
| `proxy.ts` | Next.js 16 proxy (next-intl 미들웨어, locale 라우팅) |

## For AI Agents

### Working In This Directory
- `proxy.ts`는 Next.js 16의 `middleware.ts` 대체 파일
- 절대 경로 import: `@/*` → `./src/*`
- Server Component가 기본. 클라이언트 훅 사용 시 `"use client"` 필수

<!-- MANUAL: -->
