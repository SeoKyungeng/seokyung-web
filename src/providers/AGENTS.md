<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-03-22 | Updated: 2026-03-22 -->

# providers

## Purpose
React Context 프로바이더. 전역 상태 및 서드파티 라이브러리 초기화.

## Key Files

| File | Description |
|------|-------------|
| `LenisProvider.tsx` | Lenis 스무스 스크롤 + GSAP ScrollTrigger 연동. reduced-motion 시 비활성화 |
| `ToastProvider.tsx` | 토스트 알림 상태 관리. `useToast()` 훅 제공. 자동 닫힘 5초, 최대 3개 스택 |

## For AI Agents

### Working In This Directory
- 모든 프로바이더는 `"use client"` 필수
- `layout.tsx`에서 중첩 순서: `NextIntlClientProvider` > `LenisProvider` > `ToastProvider`
- GSAP ticker 콜백은 반드시 named reference로 저장 → cleanup에서 `ticker.remove()` 호출

<!-- MANUAL: -->
