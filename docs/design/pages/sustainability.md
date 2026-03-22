# 지속가능경영 페이지 구성

---

## 레이아웃

### Section 1 — 페이지 헤더 (70vh)

```
┌─────────────────────────────────────────────────────┐
│  [midnight 배경 + 그레인]                              │
│                                                     │
│  · SUSTAINABILITY                                   │
│                                                     │
│  지속가능경영                           ← Syne 64px   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Section 2 — ESG 소개

```
┌─────────────────────────────────────────────────────┐
│  [white 배경]                          py-24 md:py-40│
│                                                     │
│               · ESG MANAGEMENT                      │
│                                                     │
│   서경엔지니어링은 지속가능 경영을 추구하며             │
│   신성장 동력을 발굴, 개발하며 전략적 투자를 통해        │
│   지속 성장을 이루는 기업입니다.    ← H2 중앙 정렬      │
│                                                     │
│                  ──────                             │
│             (primary-400, w-16, 2px)                │
│                                                     │
│   기업의 장기적인 가치 창출과 지속가능한 경영을         │
│   목표로 하며, 환경적, 사회적, 거버넌스적 요소를        │
│   평가하고 관리하여 지속가능한 성과를 추구합니다.        │
│                     ← 본문 paragraph, max-w-3xl      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

- 패턴: CeoSection과 동일 (풀너비 중앙 텍스트, `max-w-3xl mx-auto text-center`)
- SectionLabel: "ESG MANAGEMENT"
- H2: highlight 스타일, 중앙 정렬
- accent line: `w-16 h-0.5 bg-primary-400 mx-auto`
- 본문: `text-gray-600`, `max-w-3xl mx-auto`

### Section 3 — ESG 경영 방침

```
┌─────────────────────────────────────────────────────┐
│  [smoke 배경]                          py-24 md:py-40│
│                                                     │
│  · ESG POLICY                                       │
│  ESG 경영 방침                                       │
│                                                     │
│  ┌──────────────────────┐ ┌───────────────────┐     │
│  │                      │ │                   │     │
│  │  [이미지 placeholder]  │ │  E                │     │
│  │  aspect-[7/5]        │ │  환경경영           │     │
│  │  (Lucide 아이콘)       │ │                   │     │
│  │  md:col-span-7       │ │  설명 텍스트 ...    │     │
│  │                      │ │                   │     │
│  └──────────────────────┘ │  · 항목 1          │     │
│                           │  · 항목 2          │     │
│                           │  · 항목 3          │     │
│                           │  md:col-span-5    │     │
│                           └───────────────────┘     │
│                                                     │
│  ┌──────────────────┐ ┌────────────────────────┐    │
│  │                  │ │                        │    │
│  │  S               │ │  [이미지 placeholder]   │    │
│  │  사회적 책임       │ │  aspect-[7/5]          │    │
│  │                  │ │  (Lucide 아이콘)         │    │
│  │  설명 텍스트 ...   │ │  md:col-span-7        │    │
│  │                  │ │                        │    │
│  │  · 항목 1        │ └────────────────────────┘    │
│  │  · 항목 2        │                               │
│  │  md:col-span-5  │                               │
│  └──────────────────┘                               │
│                                                     │
│  ┌──────────────────────┐ ┌───────────────────┐     │
│  │                      │ │                   │     │
│  │  [이미지 placeholder]  │ │  G                │     │
│  │  aspect-[7/5]        │ │  투명한 지배구조     │     │
│  │  (Lucide 아이콘)       │ │                   │     │
│  │  md:col-span-7       │ │  설명 텍스트 ...    │     │
│  │                      │ │                   │     │
│  └──────────────────────┘ │  · 항목 1          │     │
│                           │  · 항목 2          │     │
│                           │  md:col-span-5    │     │
│                           └───────────────────┘     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

- 패턴: EquipmentShowcase zigzag (5:7 비대칭 2컬럼, 홀짝 교차)
- SectionLabel: "ESG POLICY" + SectionTitle: "ESG 경영 방침"
- 이미지 영역: `md:col-span-7`, `aspect-[7/5]`, Lucide 아이콘 placeholder (추후 실제 이미지 교체)
- 텍스트 영역: `md:col-span-5`
  - 큰 E/S/G 문자: `font-display text-3xl font-bold text-primary-400`
  - subtitle: `font-semibold text-gray-950`
  - description: `text-gray-600`
  - items: bullet list, `text-sm text-gray-600`
- 홀짝 order 교차: `index % 2 === 0` → 이미지 좌 / 텍스트 우, 홀수 → 반전
- ESG 블록 구성:
  - E (환경경영): Leaf 아이콘
  - S (사회적 책임): Users 아이콘
  - G (투명한 지배구조): Shield 아이콘

---

## 모바일 레이아웃 (< 768px)

### ESG 소개 모바일

- 그대로 유지 (중앙 텍스트는 모바일에도 적합)
- `max-w-3xl` → 모바일에서 전체 너비

### ESG 방침 모바일

- zigzag → 1컬럼 세로 스택
- 이미지 상단, 텍스트 하단 (순서 고정)
- 각 블록 아래 구분선 또는 간격

---

## 모션

| 요소 | 기법 | 트리거 |
|------|------|--------|
| ESG 소개 비전문 | fade-in + y(20→0) | scroll enter |
| accent line | scaleX(0→1) + delay 0.3s | scroll enter |
| ESG 소개문 | fade-in + y(20→0) | scroll enter |
| ESG 블록 이미지 (짝수) | slide-in 좌→우 (x: -60→0) | scroll enter |
| ESG 블록 이미지 (홀수) | slide-in 우→좌 (x: +60→0) | scroll enter |
| ESG 블록 텍스트 | stagger fade-in + y(16→0) | scroll enter |

---

## 상태 디자인

| 상태 | 처리 |
|------|------|
| ESG 이미지 로딩 | skeleton (`aspect-[7/5]`, `smoke` 배경 + 펄스) |
| ESG 이미지 실패 | 플레이스홀더 (해당 Lucide 아이콘, `gray-300`) |

---

## 배경 리듬

| 섹션 | 배경 |
|------|------|
| Section 1 — 페이지 헤더 | midnight |
| Section 2 — ESG 소개 | white |
| Section 3 — ESG 경영 방침 | smoke |
