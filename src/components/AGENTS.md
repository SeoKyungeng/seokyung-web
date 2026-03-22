<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-03-22 | Updated: 2026-03-22 -->

# components

## Purpose
재사용 가능한 React 컴포넌트. 공통 컴포넌트와 페이지별 컴포넌트로 구분.

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `common/` | 전역 공통 컴포넌트 — Header, Footer, Card, Toast 등 (see `common/AGENTS.md`) |
| `home/` | 홈 페이지 전용 컴포넌트 (Phase 2) |
| `about/` | 회사소개 페이지 전용 컴포넌트 (Phase 2) |
| `equipment/` | 설비현황 페이지 전용 컴포넌트 (Phase 2) |
| `products/` | 가공제품 페이지 전용 컴포넌트 (Phase 2) |
| `sustainability/` | 지속가능경영 페이지 전용 컴포넌트 (Phase 2) |
| `contact/` | 문의하기 페이지 전용 컴포넌트 (Phase 2) |

## For AI Agents

### Working In This Directory
- `common/`은 여러 페이지에서 공유하는 컴포넌트
- 페이지별 디렉토리는 해당 페이지에서만 사용하는 컴포넌트
- Server Component 기본, 클라이언트 상태/이벤트 필요 시 `"use client"` 추가
- props 인터페이스는 컴포넌트 파일 내부에 정의

<!-- MANUAL: -->
