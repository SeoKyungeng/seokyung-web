# 디자인 컨셉

## (주)서경엔지니어링 홈페이지

---

## 1. 디자인 방향

| 항목 | 결정 |
|------|------|
| **톤 & 무드** | Industrial Precision — 다크 베이스, 정밀 가공의 날카로움과 신뢰감 |
| **스타일** | 미니멀 구조 + 대담한 타이포 + 인터랙티브 포인트 |
| **컬러** | 미드나잇 + 블루 악센트 (차가운 금속성, 정밀 테크) |
| **모션** | 적극적 — GSAP 스크롤 트리거, 텍스트 리빌, 패럴랙스, 수평 스크롤 |
| **레퍼런스 무드** | Stripe, Linear, Vercel의 구조적 깔끔함 + 산업/제조업 무게감 |

### 디자인 원칙

1. **Precision** — 정밀 가공을 디자인 언어로. 날카로운 타이포, 정확한 그리드, 얇은 라인 디테일
2. **Contrast** — 다크/라이트 전환으로 시각적 리듬 생성. 단조로운 반복 금지
3. **Motion with Purpose** — 모든 애니메이션에 의미 부여. 장식적 모션 지양
4. **Asymmetric Tension** — 완벽한 대칭 금지. 비대칭 레이아웃으로 시선 유도

### 페이지별 스타일 분기

| 페이지 | 스타일 | 톤 |
|--------|--------|-----|
| 홈 | 영상 히어로 + 벤토 그리드 + 수평 스크롤 | Cinematic |
| 회사소개 | 대형 타이포 + 비대칭 레이아웃 | Editorial |
| 설비현황 | sticky 카드 스태킹 + 탭 필터 | Technical |
| 가공제품 | 풀블리드 갤러리 + 마소닉 그리드 | Visual |
| 지속가능경영 | 카드 그리드 + 아이콘 모션 | Clean |
| 문의하기 | 스플릿 레이아웃 + 플로팅 라벨 | Functional |

---

## 2. 컬러 시스템

### Core Palette

| 토큰 | 값 | 용도 |
|------|----|------|
| `midnight` | `#0A0E1A` | 히어로, 다크 섹션 배경 |
| `slate` | `#151923` | 다크 카드, 푸터 배경 |
| `steel` | `#1E2432` | 다크 서피스, 보더 |
| `smoke` | `#F8F9FB` | 라이트 섹션 배경 |
| `white` | `#FFFFFF` | 본문 배경 |

### Accent

| 토큰 | 값 | 용도 |
|------|----|------|
| `primary-400` | `#1447E6` | 주요 악센트 — CTA, 링크, 하이라이트 |
| `primary-300` | `#6B8AF5` | 다크 배경 위 호버 |
| `primary-500` | `#1038C0` | 라이트 배경 위 악센트 |

### Text

| 토큰 | 값 | 용도 |
|------|----|------|
| `gray-950` | `#0B0F1A` | 라이트 배경 제목 |
| `gray-700` | `#374151` | 라이트 배경 본문 |
| `gray-500` | `#6B7280` | 보조 텍스트, 라벨 |
| `white` | `#FFFFFF` | 다크 배경 위 텍스트 |
| `white/60` | `rgba(255,255,255,0.6)` | 다크 배경 위 보조 텍스트 |

### Gradient

| 이름 | 값 | 용도 |
|------|----|------|
| `glow` | `radial-gradient(ellipse, primary-400/15, transparent 70%)` | 배경 글로우 이펙트 |
| `hero-overlay` | `linear-gradient(to bottom, midnight/80, midnight/95)` | 히어로 영상 오버레이 |
| `section-fade` | `linear-gradient(to bottom, midnight, slate)` | 다크 섹션 전환 |

### Texture

- **그레인 오버레이**: `noise.svg` 또는 CSS grain — 다크 배경에 미세한 노이즈 텍스처 (opacity 3-5%)
- **글로우 블롭**: 시안 계열 radial gradient blob — 히어로, CTA 섹션 배경에 은은한 빛 효과
- **얇은 라인**: 1px `steel` 보더 — 카드, 섹션 구분

> 클라이언트 브랜드 컬러 수령 후 악센트 컬러 조정 예정

---

## 3. 타이포그래피

### 폰트 패밀리

| 용도 | 폰트 | 비고 |
|------|-------|------|
| 영어 Display (H1, H2) | **Syne** | 기하학적, 날카로운 — 정밀 가공 느낌. Google Fonts 무료 |
| 한국어 | **Pretendard** | Variable, 무료. 본문 + 한국어 제목 |
| 영어 Body | **Geist** | Vercel 제작. 모던, 가독성. 무료 |
| Mono (스펙 데이터) | **Geist Mono** | 설비 스펙, 숫자 데이터에 활용 |

### 스케일

| 레벨 | 크기 (PC) | 크기 (모바일) | weight | 용도 |
|------|-----------|---------------|--------|------|
| Display | 72–80px | 40–48px | 700 | 히어로 타이틀 (Syne) |
| H1 | 56–64px | 32–40px | 700 | 페이지 타이틀 |
| H2 | 40–48px | 28–32px | 600 | 섹션 타이틀 |
| H3 | 24–28px | 20–24px | 600 | 서브 타이틀 |
| Body L | 18–20px | 16–18px | 400 | 리드 텍스트 |
| Body | 16px | 15px | 400 | 본문 |
| Caption | 13–14px | 12–13px | 400 | 라벨, 보조 |
| Mono | 14–16px | 13–14px | 400 | 스펙 데이터, 수치 (Geist Mono) |

### 타이포 디테일

- 영어 Display: **letter-spacing -0.03em** (타이트한 자간으로 임팩트)
- 섹션 라벨: **uppercase + letter-spacing 0.15em + Caption 크기** (예: "EQUIPMENT", "PRODUCTS")
- 숫자 데이터: **Geist Mono + tabular-nums** (정렬된 데이터 표현)

---

## 4. 모션 & 인터랙션

### 모션 라이브러리

| 도구 | 용도 |
|------|------|
| **Framer Motion** | React 컴포넌트 애니메이션, 레이아웃 트랜지션, exit 애니메이션 |
| **GSAP ScrollTrigger** | 스크롤 기반 애니메이션, 핀, 수평 스크롤 |
| **Lenis** | 스무스 스크롤 |

### 애니메이션 매트릭스

| 요소 | 기법 | easing | duration |
|------|------|--------|----------|
| 히어로 텍스트 | 라인별 clip-path reveal (아래→위) | `power3.out` | 1.2s (stagger 0.15s) |
| 히어로 스크롤 | 영상 scale-up + 텍스트 opacity-out | `none (scrub)` | scroll-driven |
| 섹션 타이틀 | 워드별 slide-up + fade-in | `power2.out` | 0.8s (stagger 0.05s) |
| 카운터 숫자 | 0→N 롤링 (Geist Mono) | `power1.out` | 2s |
| 설비 항목 | fade-in + y(30→0) + stagger | `easeOut` | 0.6s |
| 수평 스크롤 | GSAP pin + horizontal translateX | `none (scrub)` | scroll-driven |
| 갤러리 아이템 | stagger fade-in + y(30→0) | `power2.out` | 0.5s (stagger 0.08s) |
| CTA 버튼 | 마그네틱 커서 + 배경 그라디언트 시프트 | `spring` | 0.3s |
| 카드 호버 | translate-y(-4px) + border-color 전환 | `ease-out` | 0.25s |
| 라이트박스 | scale(0.9→1) + backdrop-blur fade-in | `spring` | 0.4s |
| 페이지 전환 | 컨텐츠 fade + slide (Framer Motion AnimatePresence) | `ease-in-out` | 0.3s |

### 커스텀 커서 (선택)

- CTA, 갤러리 아이템 등 인터랙티브 요소에 마그네틱 효과
- 호버 시 커서 확대 + 라벨 ("보기", "문의") 표시

---

## 5. 레이아웃 원칙

- **최대 너비**: 1400px (콘텐츠 영역)
- **와이드 브레이크**: 일부 섹션 전체 너비 (풀블리드)
- **그리드**: CSS Grid 기반 — 12컬럼 + 자유 배치
- **여백**: 섹션 간 160px (PC) / 100px (모바일)
- **좌우 패딩**: 20px (모바일), 40px (태블릿), 80px (PC)
- **브레이크포인트**: 640 / 768 / 1024 / 1280 / 1536px

### 레이아웃 패턴

| 패턴 | 사용처 |
|------|--------|
| **풀블리드 히어로** | 홈 히어로, 페이지 헤더 |
| **비대칭 2컬럼** (4:6) + sticky 카드 스태킹 | 설비현황, ESG 방침 (zigzag) |
| **풀너비 중앙 텍스트** | CEO 인사말, ESG 소개 |
| **3컬럼 카드 그리드** | 경영이념 |
| **텍스트/로고 그리드** (4열) | 주요 고객사 |
| **벤토 그리드** | 홈 회사 소개 통계 |
| **수평 스크롤** | 홈 설비 하이라이트 |
| **sticky 카드 스태킹** | 설비현황 갤러리 |
| **마소닉 그리드** | 가공제품 갤러리 |
| **스플릿 레이아웃** (6:4) | 문의하기 폼 + 정보 |

---

## 6. 공통 컴포넌트

| 컴포넌트 | 설명 |
|----------|------|
| **Header** | 로고 좌측, 네비 중앙, 언어토글+CTA 우측. 투명 시작 → 스크롤 시 `midnight` + backdrop-blur 전환. 1px 하단 보더 |
| **Footer** | `midnight` 배경 + 그레인 텍스처. 상단에 대형 CTA 밴드. 3컬럼 (회사정보 / 네비 / 연락처). 하단 카피라이트 + 1px 상단 보더 |
| **SectionLabel** | uppercase 영문 라벨 (Caption, `gray-400`, letter-spacing 0.15em) + 좌측 시안 dot 또는 짧은 라인 |
| **SectionTitle** | 대형 타이포 (Syne). 워드별 reveal 애니메이션 |
| **CTAButton** | 시안 배경, `midnight` 텍스트. 호버 시 마그네틱 + 글로우. 또는 아웃라인 변형 (시안 보더, 투명 배경) |
| **Card** | `steel` 보더 1px, 투명 배경. 호버 시 보더 `primary-400` 전환 + translate-y(-4px) |
| **ImageLightbox** | backdrop-blur + 다크 오버레이. 이미지 scale-in. 좌우 네비 + ESC 닫기 |
| **GrainOverlay** | 전체 페이지 노이즈 텍스처 (pointer-events: none, opacity 3%) |
| **GlowBlob** | 시안 radial gradient — 마우스 따라가기 또는 고정 위치 배경 장식 |

---

## 7. 기술 구현 참고

| 항목 | 도구/방식 |
|------|-----------|
| 스무스 스크롤 | `lenis` |
| 스크롤 애니메이션 | `gsap` + `ScrollTrigger` |
| 컴포넌트 애니메이션 | `framer-motion` |
| 갤러리 라이트박스 | 커스텀 구현 (Framer Motion + Dialog) |
| 아이콘 | `lucide-react` (얇은 라인 스타일, 미니멀) |
| 노이즈 텍스처 | SVG filter `feTurbulence` 또는 CSS background-image |
| 폰트 로딩 | `next/font` (Syne, Geist, Geist Mono) + `next/font/local` (Pretendard) |

---

## 8. 다국어(i18n) UI 스펙

### 언어 토글 버튼

PC:
```
[ 네비게이션 메뉴들 ]     [KO | EN]  [ 문의하기 ]
                           ↑ 활성: white, 비활성: white/40
```

모바일 (햄버거 메뉴 내부):
```
메뉴 항목들
...
──────────
[KO | EN]     ← 메뉴 하단 배치
```

| 항목 | 스펙 |
|------|------|
| 형태 | 텍스트 토글 (`KO` / `EN`), 구분자 `|` |
| 위치 (PC) | Header 우측, CTA 버튼 좌측 |
| 위치 (모바일) | 햄버거 메뉴 패널 하단 |
| 활성 상태 | `white`, font-weight 600 |
| 비활성 상태 | `white/40`, font-weight 400 |
| 호버 (PC) | 비활성 항목 → `white/70` |
| 전환 애니메이션 | 텍스트 cross-fade (0.2s ease) |

### URL 구조

| 항목 | 정의 |
|------|------|
| 패턴 | `/ko/about`, `/en/about` (Next.js App Router `[locale]` 세그먼트) |
| 기본 언어 | 한국어 (`/ko/`) |
| 리다이렉트 | `/` → `/ko/` (Accept-Language 감지 또는 기본 한국어) |
| 저장 | 선택 언어 `localStorage`에 저장, 재방문 시 적용 |
| 라우팅 | `next-intl` createNavigation 패턴 활용 |

### 텍스트 확장 대응

| 전환 방향 | 비율 | 대응 |
|----------|------|------|
| KO → EN | 약 1.3x 확장 | 네비 메뉴: `max-width` + `text-overflow: ellipsis`. CTA 버튼: `padding-x` 여유 확보 |
| EN → KO | 약 0.7x 축소 | 카드 타이틀: `min-width` 유지하여 공백 과다 방지 |

주요 변환 예시:
- "회사소개" ↔ "About Us" (확장 1.0x)
- "설비현황" ↔ "Equipment" (확장 1.1x)
- "가공제품" ↔ "Products" (축소 0.9x)
- "지속가능경영" ↔ "Sustainability" (확장 1.5x — 주의)
- "문의하기" ↔ "Contact" (축소 0.7x)

> "지속가능경영"↔"Sustainability" 전환 시 Header 너비 변화가 가장 크므로, PC Header에서 메뉴 간격을 `gap: 32px` 이상 확보

### 다국어 SEO

| 항목 | 정의 |
|------|------|
| hreflang | `<link rel="alternate" hreflang="ko" href="/ko/..." />` + `<link rel="alternate" hreflang="en" href="/en/..." />` |
| canonical | 각 언어 페이지가 자기 자신을 canonical로 지정 |
| sitemap | 언어별 URL 세트 포함 |
| OG 태그 | `og:locale` = `ko_KR` / `en_US`, 언어별 title/description |

---

## 9. 모바일 Header / Footer

### 모바일 Header

```
┌─────────────────────────────────┐
│  [로고]              [☰]       │  ← 햄버거 아이콘
└─────────────────────────────────┘
```

햄버거 메뉴 펼침 (풀스크린 오버레이):
```
┌─────────────────────────────────┐
│  [로고]              [✕]       │  ← 닫기
│                                 │
│         홈                      │
│         회사소개                  │
│         설비현황                  │
│         가공제품                  │
│         지속가능경영               │
│         문의하기                  │
│                                 │
│  ─────────────────────────      │
│  [KO | EN]                      │
└─────────────────────────────────┘
```

| 항목 | 스펙 |
|------|------|
| 배경 | `midnight` + backdrop-blur |
| 메뉴 항목 | Syne 24px (영어) / Pretendard 24px (한국어), `white`, 세로 `gap: 24px` |
| 활성 메뉴 | `primary-400` 텍스트 |
| 열기 애니메이션 | 오버레이 fade-in (0.3s) + 메뉴 항목 stagger slide-up (0.05s per item) |
| 닫기 애니메이션 | 전체 fade-out (0.2s) |
| 닫기 방법 | ✕ 버튼, 메뉴 항목 클릭 시 자동 닫힘 |
| 언어 토글 | 하단 구분선 아래 배치 |

### Header 스크롤 전환

| 항목 | 스펙 |
|------|------|
| 트리거 | 스크롤 60px 이상 |
| 전환 | 투명 → `midnight/90` + `backdrop-blur-lg` (blur 12px) |
| duration | 0.3s ease |
| 하단 보더 | `1px steel` (스크롤 후에만 표시) |

### 활성 메뉴 표시

| 항목 | 스펙 |
|------|------|
| PC | 현재 페이지 메뉴: `white` 텍스트 + `primary-400` 하단 2px 밑줄 (offset 4px) |
| 모바일 | 현재 페이지 메뉴: `primary-400` 텍스트 |
| 비활성 | `white/70` |
| 호버 (PC) | `white` (비활성→활성 전환, 0.2s) |

### 모바일 Footer

```
┌─────────────────────────────────┐
│         [CTA 밴드]              │
│   정밀 가공이 필요하신가요?        │
│       [ 문의하기 → ]            │
│                                 │
│  ─────────────────────────      │
│                                 │
│  (주)서경엔지니어링               │
│  경기도 OO시 ...                │
│  TEL: 031-XXX-XXXX             │
│  FAX: 031-XXX-XXXX             │
│                                 │
│  ─────────────────────────      │
│                                 │
│  홈 | 회사소개 | 설비현황          │
│  가공제품 | 지속가능경영 | 문의하기  │
│                                 │
│  ─────────────────────────      │
│  © 2026 (주)서경엔지니어링        │
└─────────────────────────────────┘
```

- 3컬럼 → 1컬럼 세로 배치
- CTA 밴드 유지 (풀너비)
- 네비 링크: 가로 나열 + 줄바꿈 허용

---

## 10. 상태 디자인 (공통 패턴)

### 로딩 패턴

| 패턴 | 스타일 | 용도 |
|------|--------|------|
| 스켈레톤 (카드) | `smoke` 배경 + 펄스 애니메이션 (opacity 0.5↔1, 1.5s) | 설비 카드 |
| 스켈레톤 (이미지) | `smoke` 배경, 원본 비율 유지 + 펄스 | 갤러리, 설비 사진 |
| Blur-up | 20px blur 저해상도 → 원본 fade-in (0.5s) | 가공제품 갤러리 이미지 |
| 인라인 스피너 | 16px 시안 원형 스피너 | 버튼 내부 (전송 중) |

### 데이터 의존 컴포넌트 상태 매핑

| 컴포넌트 | loading | error | empty |
|----------|---------|-------|-------|
| 히어로 영상 | poster 이미지 표시 | poster 이미지 고정 | N/A |
| 갤러리 이미지 | skeleton + blur-up | 깨진 이미지 아이콘 + `smoke` 배경 | "등록된 제품이 없습니다" 텍스트 + 아이콘 |
| 설비 이미지 | skeleton | 플레이스홀더 (장비 아이콘) | N/A |
| 지도 | skeleton (지도 비율) | 주소 텍스트 + 외부 지도 링크 | N/A |
| ESG 이미지 | skeleton | 플레이스홀더 (Lucide 아이콘) | N/A |

### 404 페이지

```
┌─────────────────────────────────────────────┐
│  [midnight 배경 + 그레인]                      │
│                                             │
│              404                 ← Syne 120px, white/10
│                                             │
│     페이지를 찾을 수 없습니다       ← H2, white │
│                                             │
│     [ 홈으로 돌아가기 → ]          ← 시안 CTA  │
│                                             │
└─────────────────────────────────────────────┘
```

### 토스트 컴포넌트

| 항목 | 스펙 |
|------|------|
| 위치 | 우상단 (PC), 상단 중앙 (모바일) |
| 너비 | 최대 400px (PC), 풀너비 - 패딩 (모바일) |
| 종류 | 성공(`primary-400` 좌측 보더), 에러(`red-400`), 경고(`amber-400`) |
| 배경 | `white` + `shadow-lg` |
| 자동 닫힘 | 5초 |
| 최대 스택 | 3개, 위로 쌓임 |
| 애니메이션 | slide-in 우→좌 (PC) / slide-down (모바일), 0.3s |

---

## 11. 접근성

### 키보드 네비게이션

| 항목 | 스펙 |
|------|------|
| Tab 순서 | Header → 본문 컨텐츠 → Footer (자연스러운 DOM 순서) |
| Skip link | 첫 Tab에서 "본문으로 건너뛰기" 링크 표시 (포커스 시에만) |
| Focus 링 | `outline: 2px solid primary-400`, `outline-offset: 2px` |
| Focus 링 (다크 배경) | `outline: 2px solid primary-300` |

### prefers-reduced-motion 대응

| 모션 | reduced-motion 시 |
|------|-------------------|
| 스크롤 트리거 애니메이션 (fade-in, slide-up 등) | 비활성화. 즉시 표시 |
| 카운터 롤링 | 비활성화. 최종 숫자 즉시 표시 |
| 패럴랙스 | 비활성화. 고정 배경 |
| 수평 스크롤 | 유지 (기능적 인터랙션) |
| 페이지 전환 | fade만 유지 (0.15s) |
| 호버 효과 | 유지 (transform 제거, opacity만) |
| Lenis 스무스 스크롤 | 비활성화. 네이티브 스크롤 |

### 라이트박스 접근성

| 항목 | 스펙 |
|------|------|
| role | `dialog` |
| aria-modal | `true` |
| aria-label | "이미지 확대 보기" |
| Focus trap | 열림 시 닫기 버튼으로 포커스 이동, Tab 순환 (이전/다음/닫기) |
| ESC | 닫기 |
| 스크린리더 | 이미지 alt 텍스트 + "N번째 / 총 M개" 안내 |

### 폼 접근성

| 항목 | 스펙 |
|------|------|
| `<label>` | 모든 input에 `htmlFor`로 연결 |
| aria-required | 필수 필드에 `aria-required="true"` |
| aria-describedby | 에러 메시지 `<span>` id와 연결 |
| aria-invalid | validation 실패 시 `aria-invalid="true"` |
| 에러 메시지 | `role="alert"` (스크린리더 즉시 안내) |

---

## 12. 성능 가이드

### 히어로 영상 LCP 전략

| 항목 | 스펙 |
|------|------|
| poster 이미지 | 필수. WebP, 200KB 이하. 영상 로드 전 LCP 요소로 활용 |
| 영상 포맷 | WebM 우선 + MP4 폴백 (`<source>` 태그 순서) |
| 영상 최대 용량 | 3MB 이하 |
| PC | `preload="metadata"`, 뷰포트 진입 시 재생 |
| 모바일 | **영상 미로드**. poster 이미지만 표시 (정지 이미지). `<source media="(min-width: 768px)">` |
| 자동재생 정책 | `autoplay muted playsinline loop`. iOS Safari/Chrome 호환 |
| 저전력 모드 | 자동재생 차단 시 poster 이미지 유지 (폴백) |

### 폰트 로딩 전략

| 폰트 | 로딩 방식 | 서브셋 |
|------|----------|--------|
| Syne | `next/font/google` | weight 600, 700 |
| Geist | `next/font/local` | weight 400, 600 |
| Geist Mono | `next/font/local` | weight 400 |
| Pretendard | `next/font/local` (Variable) | weight 400, 600, 700만 서브셋 |

- `font-display: swap` (모든 폰트)
- Critical font (Pretendard 400): preload 적용
- 영문 폰트는 latin 서브셋만

### Lenis-GSAP 통합

```js
// Lenis와 GSAP ScrollTrigger 통합 설정
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

### 이미지 최적화

| 항목 | 스펙 |
|------|------|
| 컴포넌트 | `next/image` 사용 (자동 WebP 변환, srcset) |
| 갤러리 | `loading="lazy"`, `sizes="(max-width: 768px) 100vw, 33vw"` |
| 히어로/페이지 헤더 | `priority={true}` (LCP 요소) |
| placeholder | `blur` (blur-up placeholder) |
