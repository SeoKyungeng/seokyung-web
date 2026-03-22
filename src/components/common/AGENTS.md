<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-03-22 | Updated: 2026-03-22 -->

# common

## Purpose
전역 공통 컴포넌트. 모든 페이지에서 재사용되는 UI, 레이아웃, 미디어, 피드백 컴포넌트.

## Key Files

| File | Description |
|------|-------------|
| `Header.tsx` | PC 네비게이션 + 모바일 풀스크린 오버레이 메뉴. 스크롤 60px 배경 전환. Client Component |
| `Footer.tsx` | CTA 밴드 + 3컬럼 회사정보/링크/연락처 + 카피라이트 |
| `LanguageToggle.tsx` | KO \| EN 로케일 전환. next-intl `router.replace` 사용. Client Component |
| `PageHeader.tsx` | 70vh 페이지 헤더 섹션 (SectionLabel + 타이틀 + 서브타이틀 + GlowBlob) |
| `GrainOverlay.tsx` | SVG feTurbulence 노이즈 텍스처 오버레이 (opacity 3%, z-[100]) |
| `GlowBlob.tsx` | 시안 radial-gradient 장식 블롭 (configurable size/position) |
| `SectionLabel.tsx` | · UPPERCASE 시안 dot 라벨 (letter-spacing 0.15em) |
| `SectionTitle.tsx` | Syne H2/H3 타이틀. Framer Motion 워드별 fade-in. reduced-motion 즉시 표시. Client Component |
| `CTAButton.tsx` | CTA 버튼 — solid/outline/dark 변형. Link 또는 button 렌더링 |
| `Card.tsx` | steel 보더 카드. hover 시 primary 보더 + translateY(-4px) |
| `ImageLightbox.tsx` | 이미지 라이트박스. focus trap, 키보드/스와이프 네비, aria-modal. Client Component |
| `BlurUpImage.tsx` | next/image 기반. blur(20px) → sharp fade-in 0.5s. Client Component |
| `Skeleton.tsx` | 로딩 스켈레톤 (smoke 배경, pulse 애니메이션) |
| `Toast.tsx` | 토스트 알림 UI — success/error/warning, 좌측 보더 색상 구분 |

## For AI Agents

### Working In This Directory
- Server Component 가능한 컴포넌트: GrainOverlay, GlowBlob, SectionLabel, CTAButton, Card, PageHeader, Footer, Skeleton
- Client Component 필수: Header, LanguageToggle, SectionTitle, BlurUpImage, ImageLightbox, Toast
- 내부 링크는 `@/i18n/navigation`의 `Link` 사용
- `useReducedMotion()` 훅으로 모션 비활성화 대응
- z-index 체계: Header(z-40), 모바일메뉴(z-50), Toast(z-[60]), GrainOverlay(z-[100])

### Common Patterns
- props 인터페이스는 컴포넌트 파일 내부에 정의
- `className` prop으로 외부 스타일 확장 허용
- 디자인 토큰(midnight, primary-400, steel 등)은 Tailwind 유틸리티 클래스로 사용

<!-- MANUAL: -->
