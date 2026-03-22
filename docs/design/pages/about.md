# 회사소개 페이지 구성

> **섹션 순서**: 페이지 헤더 → CEO 인사말 → 경영이념 → 조직도 → 주요 고객사
> **배경 리듬**: dark → light → light(smoke) → dark → light

---

## 콘텐츠

### CEO 인사말

- **대표자명**: 이설도 (Seol-do Lee)
- **직함**: 대표이사 (CEO)
- **사진**: 미사용 확정

> **인사말 전문**
>
> 여러분 안녕하세요. 서경엔지니어링 대표 이설도입니다.
>
> 회사 발전에 끊임없이 성원을 보내주신 여러분께 깊이 감사드립니다.
>
> 지난 2011년 서경산업으로 출발하여 품질경영, 기술경영, 고객만족이란 비전을 가지고 주요 사업 분야인 방산, 자동화 라인, 조선 부품 임가공의 선두주자로 자리잡기 위해 달려왔습니다.
>
> 급변하는 시장환경에 대처하며 현재뿐만 아닌 미래를 바라보는 지속 가능한 기업으로 자리매김하였습니다.
>
> 고품질을 위한 지속 설비 투자와 인적자원 투자, 글로벌 경쟁력 확보를 위해 사활을 걸고 모든 제품을 분석하고 이해하였습니다.
>
> 당사는 이제 ㈜서경엔지니어링으로 출발하여 변화 속에서도 새로운 전략과 목표를 통한 지속 성장, 경쟁력 확보를 고객 및 협력업체에게 약속합니다.

**데이터 분할 (ceo.json)**

| 필드 | 내용 |
|------|------|
| `highlight` | "변화 속에서도 지속 성장과 경쟁력 확보를 약속합니다" |
| `body` | 전문 텍스트 (단락 구분 `\n\n`) |

### 경영이념

**슬로건**
> 우리는 사람과 기술, 상생의 가치를 존중하는 품질중심의 글로벌 경영을 통해 인류의 더 나은 미래를 만들어 가기 위해 그 역량을 집중한다.

**핵심가치 3가지**

| 키 | 제목 | 부제 | 항목 |
|----|------|------|------|
| customer | 고객 | 고객은 우리의 원동력이다 | 1. 우리의 현재와 미래는 고객의 지원과 신뢰를 쌓아 움직이는 원동력이다. 2. 우리의 생존도 고객만족에 의해 보장된다. 3. 모든 임직원은 부서, 직위에 관계없이 고객 중심으로 판단하고 고객의 만족을 최고로 판단한다. |
| quality | 품질 | 품질은 우리의 명함이다 | 1. 각종 산업의 주요 메인 부품을 제조하는 회사로써 품질은 우리의 명함이다. 2. 우리는 고품질을 위해 과감한 기술 개발과 투자에 앞장서 완벽한 품질관리를 이룬다. 3. 우리는 최고가치 실현을 위해 품질경영 중심으로 우리의 제품에 완벽한 품질을 담보한다. |
| people | 사람 | 사람은 최고의 자산이다 | 1. 우리의 모든 경영이념은 사람을 통해 이루어진다. 2. 조직의 미래는 각 구성원들의 마음가짐과 역량이며 경영진은 솔선수범하여 구성원들의 역량을 배가한다. 3. 구성원들의 꿈과 희망을 존중하며 기업은 발전한다. |

### 조직도

> 인원수 미기재. 부서·팀 구조만 수령.

```
대표이사
├── 관리부 ── 회계팀, 연구개발팀
├── 영업부 ── 신사업영업팀, 국내영업팀, 제작팀
├── 생산기술부 ── MCT가공팀, CNC가공팀
├── 자재부 ── 설계팀, 구매팀, 출하팀
└── 품질관리부 ── 품질보증팀, 품질관리팀
```

> **총 5개 부서, 12개 팀**

### 주요 고객사

| No. | 고객사명 |
|-----|----------|
| 1 | 한진중공업 |
| 2 | 태일송풍기 |
| 3 | 삼연엔지니어링 |
| 4 | (주)와이피씨 |
| 5 | (주)우신엔지니어링 |
| 6 | (주)오에스벨브 |
| 7 | (주)대한약품공업 |

> 고객사 로고 이미지 미수령. 수령 시 로고 그리드로 전환.

---

## 레이아웃

### Section 1 — 페이지 헤더 (70vh)

```
┌─────────────────────────────────────────────────────┐
│  [midnight 배경 + 그레인]                              │
│  [시안 글로우 블롭 — 우상단]                            │
│                                                     │
│                                                     │
│  · ABOUT US                          ← SectionLabel │
│                                                     │
│  회사소개                              ← Syne 64px   │
│                                                     │
│  정밀 가공의 기술력으로                                 │
│  산업의 미래를 만들어갑니다              ← Body L       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

- 풀블리드 다크 배경
- 텍스트 라인별 reveal 애니메이션
- 우상단 은은한 시안 글로우

### Section 2 — CEO 인사말 (풀너비 텍스트)

```
┌─────────────────────────────────────────────────────┐
│  [white 배경]                                        │
│                                                     │
│  · CEO MESSAGE                       ← SectionLabel │
│                                                     │
│  "변화 속에서도 지속 성장과                             │
│   경쟁력 확보를 약속합니다"       ← H2 display, 2xl~3xl │
│                                                     │
│  ─── primary-400 accent line (w-16, 2px) ───        │
│                                                     │
│  인사말 본문 텍스트 (max-w-3xl, 중앙 정렬)              │
│  여러 단락으로 구성 ...                                │
│  ...                                                │
│  ...                                                │
│                                                     │
│  ────────────────────────── (border-t gray-200)      │
│                                대표이사 이설도         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

- **사진 미사용** — 풀너비 텍스트 레이아웃
- 텍스트 컨테이너: `max-w-3xl mx-auto text-center`
- highlight: `font-display text-2xl md:text-3xl font-semibold` 중앙 정렬
- accent line: primary-400, `w-16 h-0.5 mx-auto`, highlight와 body 사이 시각 분리
- body: `text-base md:text-lg text-gray-600 leading-relaxed`, 단락 간 `mb-6`
- 이름/직함: 우측 정렬, `border-t border-gray-200` 위 `pt-6`
- **비주얼 보완 옵션**: 공간이 허전할 경우 좌우 subtle decorative quote mark (`"`) 또는 배경 패턴 추가 고려

### Section 3 — 경영이념 (smoke 배경)

```
┌─────────────────────────────────────────────────────┐
│  [smoke 배경]                                        │
│                                                     │
│  · PHILOSOPHY                        ← SectionLabel │
│                                                     │
│  경영이념                         ← SectionTitle 3xl │
│                                                     │
│  "슬로건 텍스트 — 사람과 기술,                          │
│   상생의 가치를 존중하는 ..."     ← Body L, gray-600   │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │  ○ 고객   │  │  ○ 품질   │  │  ○ 사람   │          │
│  │          │  │          │  │          │          │
│  │  "고객은  │  │  "품질은  │  │  "사람은  │          │
│  │  우리의   │  │  우리의   │  │  최고의   │          │
│  │  원동력"  │  │  명함"   │  │  자산"   │          │
│  │          │  │          │  │          │          │
│  │  · 항목1  │  │  · 항목1  │  │  · 항목1  │          │
│  │  · 항목2  │  │  · 항목2  │  │  · 항목2  │          │
│  │  · 항목3  │  │  · 항목3  │  │  · 항목3  │          │
│  └──────────┘  └──────────┘  └──────────┘          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

- 배경: `smoke` (white와 slate 사이 전환 완충)
- 슬로건: `max-w-3xl mx-auto text-center`, Body L 크기
- **3컬럼 카드 그리드** (`grid-cols-1 md:grid-cols-3 gap-8`)
- 각 카드:
  - 배경: `white`, `rounded-xl`, `p-8`
  - 상단 아이콘 영역: primary-400 원형 아이콘 (`w-12 h-12`)
    - 고객: Users / Handshake 아이콘
    - 품질: Shield-check / Award 아이콘
    - 사람: Heart / UserCircle 아이콘
  - 제목: `font-display text-xl font-semibold text-gray-950`
  - 부제: `text-sm text-primary-500 font-medium` (인용구 스타일)
  - 항목 리스트: `text-sm text-gray-600 leading-relaxed`, 좌측 정렬, 넘버링 제거 → 깔끔한 prose
  - hover: `shadow-lg` 전환, `border border-transparent hover:border-primary-400/20`

### Section 4 — 조직도 (다크 섹션, 2단계 계층)

```
┌─────────────────────────────────────────────────────┐
│  [slate 배경 + 그레인]                                │
│                                                     │
│  · ORGANIZATION                                     │
│                                                     │
│  조직도                                              │
│                                                     │
│                 ┌──────────┐                        │
│                 │ 대표이사   │  ← root 노드           │
│                 └────┬─────┘                        │
│       ┌──────┬──────┼──────┬──────┐                │
│  ┌────┴───┐┌─┴──┐┌──┴──┐┌─┴──┐┌──┴───┐           │
│  │ 관리부  ││영업 ││생산  ││자재 ││품질   │ ← 부서 노드 │
│  │        ││부   ││기술부││부   ││관리부 │           │
│  └────┬───┘└──┬─┘└──┬──┘└──┬─┘└──┬───┘           │
│   회계팀  신사업  MCT   설계팀  품질보증              │
│   연구개발 국내영업 CNC   구매팀  품질관리              │
│           제작팀        출하팀                       │
│                                     ← 팀 노드      │
└─────────────────────────────────────────────────────┘
```

- 다크 배경으로 시각적 전환
- **2단계 트리**: root → 부서(5) → 팀(12)
- root 노드: `steel/60` 배경, `min-w-[140px]`, base 텍스트
- 부서 노드: `slate/60` 배경, `min-w-[120px]`, sm 텍스트, 시안 보더
- 팀 노드: 부서 카드 하단에 `text-xs text-gray-500` 리스트로 표시 (별도 카드 X)
- 연결선: `primary-400/40` 1px 세로/가로 라인
- 노드: 상→하 순차 fade-in (stagger 0.1s)
- hover: `border-color` → `primary-400` 전환
- **인원수 미기재** — `members` 텍스트 비표시

### Section 5 — 주요 고객사 (white 배경)

```
┌─────────────────────────────────────────────────────┐
│  [white 배경]                                        │
│                                                     │
│  · CLIENTS                           ← SectionLabel │
│                                                     │
│  주요 고객사                      ← SectionTitle 3xl │
│                                                     │
│  "신뢰를 바탕으로 다양한 산업 분야의                     │
│   파트너와 함께합니다"           ← Body M, gray-600   │
│                                                     │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐      │
│  │ 로고/   │ │ 로고/   │ │ 로고/   │ │ 로고/   │      │
│  │ 사명    │ │ 사명    │ │ 사명    │ │ 사명    │      │
│  └────────┘ └────────┘ └────────┘ └────────┘      │
│  ┌────────┐ ┌────────┐ ┌────────┐                  │
│  │ 로고/   │ │ 로고/   │ │ 로고/   │                  │
│  │ 사명    │ │ 사명    │ │ 사명    │                  │
│  └────────┘ └────────┘ └────────┘                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

- **로고 미수령 시 (현재)**: 텍스트 그리드
  - `grid-cols-2 md:grid-cols-4 gap-6`
  - 각 셀: `bg-smoke rounded-lg p-6`, 고객사명 중앙 정렬
  - `text-sm font-medium text-gray-700`
  - hover: `shadow-md` + `border-primary-400/20`
- **로고 수령 시**: 로고 이미지 그리드로 전환
  - `grayscale` 기본 → hover 시 `grayscale-0` 컬러 전환
  - 또는 무한 롤링 배너 (marquee) 옵션
- 서브텍스트: 고객사 수 ("7개 기업과 함께합니다" 등)

---

## 모바일 레이아웃 (< 768px)

### CEO 인사말 모바일

```
┌──────────────────────┐
│                      │
│  · CEO MESSAGE       │
│                      │
│  "변화 속에서도       │
│   지속 성장과         │  ← text-xl, 중앙 정렬
│   경쟁력 확보를       │
│   약속합니다"         │
│                      │
│  ── accent line ──   │
│                      │
│  인사말 본문 텍스트    │  ← text-base, 좌측 정렬
│  ...                 │
│  ...                 │
│                      │
│      — 대표이사 이설도 │
│                      │
└──────────────────────┘
```

- 풀너비 1컬럼
- highlight: `text-xl` (PC보다 축소), 중앙 정렬
- body: `text-base`, 좌측 정렬 가독성 우선

### 경영이념 모바일

```
┌──────────────────────┐
│  · PHILOSOPHY        │
│                      │
│  경영이념             │
│                      │
│  "슬로건 텍스트..."   │
│                      │
│  ┌──────────────────┐│
│  │  ○ 고객           ││
│  │  "고객은 원동력"   ││
│  │  · 항목1          ││
│  │  · 항목2          ││
│  │  · 항목3          ││
│  └──────────────────┘│
│  ┌──────────────────┐│
│  │  ○ 품질           ││
│  │  ...              ││
│  └──────────────────┘│
│  ┌──────────────────┐│
│  │  ○ 사람           ││
│  │  ...              ││
│  └──────────────────┘│
└──────────────────────┘
```

- 3컬럼 → 1컬럼 세로 스택
- 카드 간 `gap-6`

### 조직도 모바일 (2단계)

```
┌──────────────────────┐
│  · ORGANIZATION      │
│                      │
│  ┌──────────────────┐│
│  │ 대표이사           ││
│  └──────┬───────────┘│
│  │                    │
│  ├─ 관리부            │  ← 부서명 (font-semibold)
│  │  ├ 회계팀          │  ← 팀명 (text-xs, gray-500)
│  │  └ 연구개발팀      │
│  │                    │
│  ├─ 영업부            │
│  │  ├ 신사업영업팀    │
│  │  ├ 국내영업팀      │
│  │  └ 제작팀          │
│  │                    │
│  ├─ 생산기술부        │
│  │  ...               │
│  ...                  │
└──────────────────────┘
```

- 세로 리스트 + 들여쓰기 계층
- 좌측 `border-l-2 border-primary-400/40` 시안 라인
- 부서 노드: `font-semibold text-white text-sm`
- 팀 노드: `text-xs text-gray-500`, 부서 아래 indent (`pl-4`)

### 고객사 모바일

```
┌──────────────────────┐
│  · CLIENTS           │
│                      │
│  ┌────────┐┌────────┐│
│  │ 고객1   ││ 고객2   ││  ← 2컬럼 유지
│  └────────┘└────────┘│
│  ┌────────┐┌────────┐│
│  │ 고객3   ││ 고객4   ││
│  └────────┘└────────┘│
│  ...                  │
└──────────────────────┘
```

- `grid-cols-2` 유지 (셀 크기 축소)
- 패딩 축소 `p-4`

---

## 모션

| 요소 | 기법 | 트리거 |
|------|------|--------|
| 페이지 헤더 텍스트 | line reveal | 페이지 로드 |
| CEO highlight | fade-in + y(20→0) | scroll enter |
| CEO accent line | width 0→100% | scroll enter (highlight 후 0.3s delay) |
| CEO body 텍스트 | fade-in + y(30→0) | scroll enter |
| 경영이념 슬로건 | fade-in + y(20→0) | scroll enter |
| 경영이념 카드 | stagger fade-in (좌→우, 0.15s) | scroll enter |
| 조직도 연결선 | SVG stroke-dashoffset draw | scroll enter |
| 조직도 노드 | stagger fade-in (상→하, 0.1s) | scroll enter |
| 고객사 그리드 | stagger fade-in (0.05s) | scroll enter |

---

## 데이터 구조 변경 사항

### `src/data/ceo.json`

```jsonc
{
  "name": { "ko": "이설도", "en": "Seol-do Lee" },
  "title": { "ko": "대표이사", "en": "CEO" },
  // photo 필드 제거
  "greeting": {
    "highlight": {
      "ko": "변화 속에서도 지속 성장과 경쟁력 확보를 약속합니다",
      "en": "We promise sustainable growth and competitiveness even amid change"
    },
    "body": {
      "ko": "여러분 안녕하세요. 서경엔지니어링 대표 이설도입니다.\n\n회사 발전에 끊임없이 성원을 보내주신 여러분께 깊이 감사드립니다.\n\n지난 2011년 서경산업으로 출발하여 품질경영, 기술경영, 고객만족이란 비전을 가지고 주요 사업 분야인 방산, 자동화 라인, 조선 부품 임가공의 선두주자로 자리잡기 위해 달려왔습니다.\n\n급변하는 시장환경에 대처하며 현재뿐만 아닌 미래를 바라보는 지속 가능한 기업으로 자리매김하였습니다.\n\n고품질을 위한 지속 설비 투자와 인적자원 투자, 글로벌 경쟁력 확보를 위해 사활을 걸고 모든 제품을 분석하고 이해하였습니다.\n\n당사는 이제 ㈜서경엔지니어링으로 출발하여 변화 속에서도 새로운 전략과 목표를 통한 지속 성장, 경쟁력 확보를 고객 및 협력업체에게 약속합니다.",
      "en": "..."
    }
  }
}
```

### `src/data/philosophy.json` (신규)

```jsonc
{
  "slogan": {
    "ko": "우리는 사람과 기술, 상생의 가치를 존중하는 품질중심의 글로벌 경영을 통해 인류의 더 나은 미래를 만들어 가기 위해 그 역량을 집중한다.",
    "en": "..."
  },
  "values": [
    {
      "key": "customer",
      "icon": "Users",
      "title": { "ko": "고객", "en": "Customer" },
      "subtitle": { "ko": "고객은 우리의 원동력이다", "en": "..." },
      "items": [
        { "ko": "우리의 현재와 미래는 고객의 지원과 신뢰를 쌓아 움직이는 원동력이다.", "en": "..." },
        { "ko": "우리의 생존도 고객만족에 의해 보장된다.", "en": "..." },
        { "ko": "모든 임직원은 부서, 직위에 관계없이 고객 중심으로 판단하고 고객의 만족을 최고로 판단한다.", "en": "..." }
      ]
    },
    {
      "key": "quality",
      "icon": "ShieldCheck",
      "title": { "ko": "품질", "en": "Quality" },
      "subtitle": { "ko": "품질은 우리의 명함이다", "en": "..." },
      "items": [
        { "ko": "각종 산업의 주요 메인 부품을 제조하는 회사로써 품질은 우리의 명함이다.", "en": "..." },
        { "ko": "우리는 고품질을 위해 과감한 기술 개발과 투자에 앞장서 완벽한 품질관리를 이룬다.", "en": "..." },
        { "ko": "우리는 최고가치 실현을 위해 품질경영 중심으로 우리의 제품에 완벽한 품질을 담보한다.", "en": "..." }
      ]
    },
    {
      "key": "people",
      "icon": "Heart",
      "title": { "ko": "사람", "en": "People" },
      "subtitle": { "ko": "사람은 최고의 자산이다", "en": "..." },
      "items": [
        { "ko": "우리의 모든 경영이념은 사람을 통해 이루어진다.", "en": "..." },
        { "ko": "조직의 미래는 각 구성원들의 마음가짐과 역량이며 경영진은 솔선수범하여 구성원들의 역량을 배가한다.", "en": "..." },
        { "ko": "구성원들의 꿈과 희망을 존중하며 기업은 발전한다.", "en": "..." }
      ]
    }
  ]
}
```

### `src/data/organization.json` (전면 교체)

```jsonc
{
  "departments": [
    { "id": "ceo", "name": { "ko": "대표이사", "en": "CEO" }, "parent": null },
    { "id": "admin", "name": { "ko": "관리부", "en": "Administration" }, "parent": "ceo" },
    { "id": "admin-accounting", "name": { "ko": "회계팀", "en": "Accounting" }, "parent": "admin" },
    { "id": "admin-rnd", "name": { "ko": "연구개발팀", "en": "R&D" }, "parent": "admin" },
    { "id": "sales", "name": { "ko": "영업부", "en": "Sales" }, "parent": "ceo" },
    { "id": "sales-new", "name": { "ko": "신사업영업팀", "en": "New Business Sales" }, "parent": "sales" },
    { "id": "sales-domestic", "name": { "ko": "국내영업팀", "en": "Domestic Sales" }, "parent": "sales" },
    { "id": "sales-production", "name": { "ko": "제작팀", "en": "Manufacturing" }, "parent": "sales" },
    { "id": "tech", "name": { "ko": "생산기술부", "en": "Production Technology" }, "parent": "ceo" },
    { "id": "tech-mct", "name": { "ko": "MCT가공팀", "en": "MCT Machining" }, "parent": "tech" },
    { "id": "tech-cnc", "name": { "ko": "CNC가공팀", "en": "CNC Machining" }, "parent": "tech" },
    { "id": "materials", "name": { "ko": "자재부", "en": "Materials" }, "parent": "ceo" },
    { "id": "materials-design", "name": { "ko": "설계팀", "en": "Design" }, "parent": "materials" },
    { "id": "materials-purchasing", "name": { "ko": "구매팀", "en": "Purchasing" }, "parent": "materials" },
    { "id": "materials-shipping", "name": { "ko": "출하팀", "en": "Shipping" }, "parent": "materials" },
    { "id": "qc", "name": { "ko": "품질관리부", "en": "Quality Control" }, "parent": "ceo" },
    { "id": "qc-assurance", "name": { "ko": "품질보증팀", "en": "Quality Assurance" }, "parent": "qc" },
    { "id": "qc-control", "name": { "ko": "품질관리팀", "en": "Quality Management" }, "parent": "qc" }
  ]
}
```

> `members` 필드 제거 (인원수 미기재)

### `src/data/clients.json` (신규)

```jsonc
{
  "clients": [
    { "id": "hanjin", "name": { "ko": "한진중공업", "en": "Hanjin Heavy Industries" }, "logo": null },
    { "id": "taeil", "name": { "ko": "태일송풍기", "en": "Taeil Blower" }, "logo": null },
    { "id": "samyeon", "name": { "ko": "삼연엔지니어링", "en": "Samyeon Engineering" }, "logo": null },
    { "id": "ypc", "name": { "ko": "(주)와이피씨", "en": "YPC Co., Ltd." }, "logo": null },
    { "id": "wooshin", "name": { "ko": "(주)우신엔지니어링", "en": "Wooshin Engineering Co., Ltd." }, "logo": null },
    { "id": "osvalve", "name": { "ko": "(주)오에스벨브", "en": "OS Valve Co., Ltd." }, "logo": null },
    { "id": "daehan", "name": { "ko": "(주)대한약품공업", "en": "Daehan Pharmaceutical Co., Ltd." }, "logo": null }
  ]
}
```

### `src/lib/types.ts` 변경

```typescript
// CEO: photo 필드 제거
export interface CEO {
  name: LocalizedText;
  title: LocalizedText;
  greeting: {
    highlight: LocalizedText;
    body: LocalizedText;
  };
}

// Department: members 필드 제거
export interface Department {
  id: string;
  name: LocalizedText;
  parent: string | null;
}

// 신규 타입
export interface PhilosophyValue {
  key: string;
  icon: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  items: LocalizedText[];
}

export interface Philosophy {
  slogan: LocalizedText;
  values: PhilosophyValue[];
}

export interface Client {
  id: string;
  name: LocalizedText;
  logo: string | null;
}
```

### `src/messages/{ko,en}.json` 추가 키

```jsonc
// pages.about 하위
{
  "philosophyLabel": "PHILOSOPHY",         // en: "PHILOSOPHY"
  "philosophyTitle": "경영이념",             // en: "Management Philosophy"
  "clientsLabel": "CLIENTS",               // en: "CLIENTS"
  "clientsTitle": "주요 고객사",             // en: "Our Clients"
  "clientsSubtitle": "신뢰를 바탕으로 다양한 산업 분야의 파트너와 함께합니다"
  // en: "Partnering with trusted companies across diverse industries"
}
```

---

## 미수령 항목

- [ ] 주요 고객사 로고 이미지 (7개사) → 수령 시 `clients.json`의 `logo` 필드 업데이트
- [ ] 조직도 인원수 → 수령 시 `Department` 타입에 `members?: number` 복원
