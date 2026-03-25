# 설비현황 페이지 구성

> 카테고리 탭 필터 + sticky 카드 스태킹 — 설비 브라우징 최적화

---

## 레이아웃

### Section 1 — 페이지 헤더 (70vh)

```
┌─────────────────────────────────────────────────────┐
│  [midnight 배경 + GrainOverlay + GlowBlob ×2]        │
│                                                     │
│  · EQUIPMENT                                        │
│                                                     │
│  설비현황                 ← Syne 48-56px, weight 400  │
│                                                     │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐          │
│  │ 14+  │  │ CNC  │  │ MCT  │  │범용선반│          │
│  │총 설비│  │ X대  │  │ X대  │  │ X대  │ ← 카운터  │
│  └──────┘  └──────┘  └──────┘  └──────┘          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

- midnight 배경 + GrainOverlay + GlowBlob 2개 (헤더 깊이감)
- 숫자: Geist Mono, 0→N 롤링 카운터
- 카드: `steel` 보더, 투명 배경
- 카운터 4개: 총 설비, CNC, MCT, 범용선반 (기타는 카운터 미표시)

---

### Section 2 — 설비 갤러리

#### 2-1. Sticky 탭 바

```
┌─────────────────────────────────────────────────────┐
│  [sticky, z-30, bg-white/90 backdrop-blur]          │
│                                                     │
│   [전체]  [CNC]  [MCT]  [범용선반]  [기타]           │
│      ●                                              │
│   (슬라이딩 dot 인디케이터 — primary-400)             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

- `position: sticky`, `top: 0`, `z-30`
- 배경: `bg-white/90 backdrop-blur`
- 활성 탭 아래 dot 인디케이터: Framer Motion `layoutId` 슬라이딩, `primary-400` 색상
- 모바일: 수평 스크롤(`overflow-x: auto`) + `scroll-snap`

#### 2-2. Sticky 카드 스태킹 (PC)

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ──────────────────────────────────────────────────── │  ← border-t gray-200
│                                                         │
│  ⚙  L400-LC                      ┌───────────────────┐ │
│     CNC 선반                       │                   │ │
│     현대위아 · 1대                  │  [장비 사진]       │ │
│                                   │  aspect-[4/3]     │ │
│     최대 스윙    Φ630 (15")        │  rounded-lg       │ │
│     가공 길이    2120mm            │  bg-smoke         │ │
│     척 사이즈    15"               │                   │ │
│     NC 컨트롤러  FANUC 21i-TB      └───────────────────┘ │
│                                                         │
│  ← md:sticky md:top-20, bg-white                       │
│  ← 다음 항목이 스크롤되어 올라오면 이전 항목을 자연스럽게 덮음 │
│                                                         │
│  ──────────────────────────────────────────────────── │
│                                                         │
│  ⚙  PUMA VT1100                  ┌───────────────────┐ │
│     CNC 수직선반                    │  [다음 장비 사진]  │ │
│     두산 · 1대                     │  sticky 덮어씀    │ │
│     ...                           └───────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

- 각 항목: `md:sticky md:top-20` + `bg-white` — 전체 섹션이 sticky 고정
- 스크롤 시 다음 항목이 올라오며 이전 항목을 `border-t` 기준으로 자연스럽게 덮음
- `max-w-6xl` 내부, `md:grid-cols-12`:
  - 텍스트: `md:col-span-4`
  - 이미지: `md:col-span-6 md:col-start-7`, **corner-notch clip-path 적용**
  - 간격: `md:gap-24`
- 외부 컨테이너: `px-5 md:px-10 lg:px-16` (max-w 제한 없이 화면 활용)
- `zigzag?: boolean` prop 준비 (현재 `false`, 향후 좌우 교차 확장 가능)
- 사진 없을 때: Lucide `Cog` placeholder + 모델명

#### 2-3. 항목 구조 상세

```
┌────────────────────────────────────────────────────────────────┐
│  border-t border-gray-200                                      │
│  bg-white py-12 md:py-16                                       │
│                                                                │
│  [col-span-4]                        [col-span-6, col-start-7] │
│                                                                │
│  ⚙ DOOSAN PUMA 400                  ┌──────────────────────┐ │
│    ← Cog 아이콘 (제목 수직 중앙 정렬)   │  [사진 영역]          │ │
│                                      │  aspect-[4/3]        │ │
│  CNC 선반                             │  rounded-lg          │ │
│    ← text-sm text-gray-500           │  bg-smoke            │ │
│                                      │                      │ │
│  Doosan · 3대                        │  Cog placeholder     │ │
│    ← text-sm text-gray-500           │  (사진 미수령)         │ │
│                                      └──────────────────────┘ │
│  ┄┄┄┄┄ 스펙 영역 (항상 표시) ┄┄┄┄┄    │                       │
│  가공범위    Ø650 × 1,000mm           │                       │
│  최대회전수  3,000 rpm                │                       │
│  위치정밀도  ±0.005mm                 │                       │
│  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄     │                       │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

- 모델명: `font-display text-2xl md:text-3xl font-normal` (weight 400, letter-spacing -0.025em)
- 장비명: `text-sm text-gray-500`
- 제조사 · 수량: `text-sm text-gray-500`
- Cog 아이콘: `h-5 w-5 text-primary-400`, 제목 line-height에 수직 중앙 정렬
- 스펙: 항상 표시 (accordion/버튼 없음), `specs.length > 0` 일 때만 렌더링
- SpecRow: label(`gray-500`, uppercase, tracking-wider) + value(`font-mono`, `gray-950`)
- 행 구분: `border-b border-smoke`, 마지막 행 보더 없음

---

## 모바일 레이아웃 (< 768px)

### 탭 바 모바일

```
┌──────────────────────┐
│  [수평 스크롤 탭 바]   │
│  전체 | CNC | MCT |...│  ← overflow-x: auto, scroll-snap
└──────────────────────┘
```

### 장비 항목 모바일

```
┌──────────────────────┐
│  border-t gray-200   │
│                      │
│  ⚙ DOOSAN PUMA 400  │  ← font-display text-2xl semibold
│  CNC 선반             │
│  Doosan · 3대        │
│                      │
│  가공범위  Ø650×1,000 │  ← 스펙 항상 표시
│  최대회전  3,000 rpm  │
│                      │
│  ┌──────────────────┐│
│  │ [사진 풀너비]      ││  ← aspect-[4/3]
│  └──────────────────┘│
│                      │
└──────────────────────┘
```

- `grid-cols-1`, sticky 해제
- 텍스트 → 이미지 순서 (위에서 아래)
- 스펙 항상 표시

### 페이지 헤더 카운터 모바일

```
┌──────────────────────┐
│  설비현황             │  ← Syne 32px
│                      │
│  ┌────┬────┐        │
│  │14+ │CNC │        │  ← grid-cols-2
│  │총  │X대 │        │
│  ├────┼────┤        │
│  │MCT │범용│        │
│  │X대 │X대 │        │
│  └────┴────┘        │
└──────────────────────┘
```

- 카운터: `grid-cols-2` (2열 × 2행)

---

## 스펙 데이터 디자인

```
┌──────────────────────────────────┐
│  DOOSAN PUMA 400                 │  ← 모델명: font-display, Syne
│                                  │
│  가공범위      Ø650 × 1,000mm    │  ← label: gray-500, uppercase, tracking-wider
│  ──────────────────────────────  │  ← 1px border-b smoke
│  최대회전수    3,000 rpm          │
│  ──────────────────────────────  │
│  위치정밀도    ±0.005mm           │
│  ──────────────────────────────  │  ← 마지막 행 보더 없음
└──────────────────────────────────┘
```

- label(`SpecRow`): `gray-500`, text-sm, uppercase, tracking-wider
- value: `gray-950`, Geist Mono (`font-mono`), text-sm
- 행 구분: 1px `border-b smoke`, `last:border-b-0`

---

## 모션

| 요소 | 기법 | easing | duration | 트리거 |
|------|------|--------|----------|--------|
| 헤더 카운터 | 0→N 롤링 | power1.out | 2s | 페이지 로드 |
| 탭 인디케이터 | layoutId 슬라이딩 dot | spring(400, 30) | ~0.25s | 탭 클릭 |
| 필터 전환 | AnimatePresence scale(0.95→1) + opacity | spring(300, 28) | ~0.3s | 탭 클릭 |
| 텍스트 진입 | stagger fade-in + y(12→0) | easeOut | 0.35s (stagger 0.05s) | 뷰포트 진입 |
| 이미지 진입 | fade-in + scale(0.97→1) | cubic-bezier(0.25,0.46,0.45,0.94) | 0.7s | 뷰포트 진입 |

---

## 상태 디자인

| 상태 | 처리 |
|------|------|
| 이미지 로딩 중 | skeleton (이미지 비율 유지, `smoke` 배경 + 펄스) |
| 이미지 로드 실패 / 미등록 | Lucide `Cog` placeholder (`gray-300`) + 모델명 |
| 필터 결과 없음 | 현재 모든 카테고리에 최소 1개 장비 존재 — 빈 상태 UI 불필요 |
| 스펙 미제공 | 스펙 영역 생략 (`specs.length > 0` 조건부 렌더링) |
