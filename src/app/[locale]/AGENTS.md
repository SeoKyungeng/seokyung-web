<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-03-22 | Updated: 2026-03-22 -->

# [locale]

## Purpose
로케일별(`ko`/`en`) 페이지 라우트. 루트 레이아웃에서 Header, Footer, Provider 통합.

## Key Files

| File | Description |
|------|-------------|
| `layout.tsx` | 루트 레이아웃 — 폰트, i18n Provider, LenisProvider, ToastProvider, Header, Footer, GrainOverlay 통합 |
| `page.tsx` | 홈 페이지 (히어로 섹션) |
| `not-found.tsx` | 404 페이지 (Syne 120px + 홈 CTA) |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `about/` | 회사소개 페이지 |
| `equipment/` | 설비현황 페이지 |
| `products/` | 가공제품 페이지 |
| `sustainability/` | 지속가능경영 페이지 |
| `contact/` | 문의하기 페이지 |

## For AI Agents

### Working In This Directory
- 레이아웃이 `<main id="main-content">`를 제공하므로 페이지에서 `<main>` 사용 금지
- 페이지 컴포넌트는 `async function` + `getTranslations()` 패턴
- `params`는 `Promise<{ locale: string }>` — `const { locale } = await params` 필수
- `generateStaticParams()`로 `["ko", "en"]` 정적 파라미터 제공

### Common Patterns
```tsx
import { getTranslations } from "next-intl/server";

export default async function SomePage() {
  const t = await getTranslations("pages.someKey");
  return <section>...</section>;
}
```

<!-- MANUAL: -->
