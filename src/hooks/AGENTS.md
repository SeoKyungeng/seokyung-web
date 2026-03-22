<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-03-22 | Updated: 2026-03-22 -->

# hooks

## Purpose
커스텀 React 훅. 모든 훅은 Client Component 전용 (`"use client"`).

## Key Files

| File | Description |
|------|-------------|
| `useReducedMotion.ts` | `prefers-reduced-motion` 감지. `useSyncExternalStore` 기반, SSR 안전 |

## For AI Agents

### Working In This Directory
- 모든 훅 파일에 `"use client"` 선언 필수
- 미디어 쿼리 기반 훅은 `useSyncExternalStore` 패턴 사용 (setState-in-effect 금지)

<!-- MANUAL: -->
