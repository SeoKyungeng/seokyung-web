# 개발 체크리스트 (DEV)

> 작업 완료 시 `[ ]` → `[x]`로 변경

---

## Phase 0 — 프로젝트 셋업 (~0.5주)

- [ ] Next.js + TypeScript 프로젝트 초기화
- [ ] Tailwind CSS v4 설치 및 설정
- [ ] 폴더 구조 확립
  ```
  src/
  ├── app/[locale]/          # i18n 라우팅
  │   ├── layout.tsx
  │   ├── page.tsx           # Home
  │   ├── about/
  │   ├── equipment/
  │   ├── products/
  │   ├── sustainability/
  │   └── contact/
  ├── components/
  │   ├── common/            # Header, Footer, SectionLabel 등
  │   ├── home/
  │   ├── about/
  │   ├── equipment/
  │   ├── products/
  │   ├── sustainability/
  │   └── contact/
  ├── lib/                   # 유틸리티, 타입 정의
  ├── data/                  # 콘텐츠 데이터 (JSON)
  │   ├── company.json       # 회사 기본 정보 (주소, 전화, 팩스, 이메일, 좌표)
  │   ├── ceo.json           # CEO 인사말 (사진, 이름, 직함, 인사말)
  │   ├── organization.json  # 조직도 (부서 트리)
  │   ├── equipment.json     # CNC/MCT 설비 목록 + 스펙
  │   ├── products.json      # 제품 갤러리 (카테고리별 이미지)
  │   ├── sustainability.json # ESG 텍스트 + 인증서
  │   └── stats.json         # 홈 핵심 수치
  ├── messages/              # i18n 번역 파일 (ko.json, en.json)
  └── styles/                # 글로벌 스타일
  ```
- [ ] ESLint + Prettier 설정
- [ ] Tailwind 테마 커스터마이징
  - [ ] 컬러: midnight, cyan-400, smoke, steel, slate
  - [ ] 폰트 패밀리: Syne, Geist, Geist Mono, Pretendard
  - [ ] 브레이크포인트: 640 / 768 / 1024 / 1280 / 1536px
- [ ] next-intl i18n 설정
  - [ ] `[locale]` 세그먼트 라우팅
  - [ ] middleware (locale 감지 + 리다이렉트)
  - [ ] 기본 메시지 파일 구조 (ko.json, en.json)
- [ ] 폰트 설정
  - [ ] Syne (Google Fonts / next/font)
  - [ ] Geist + Geist Mono (next/font)
  - [ ] Pretendard (next/font/local, 서브셋 400/600/700)
- [ ] 모션 라이브러리 설치
  - [ ] Framer Motion
  - [ ] GSAP + ScrollTrigger
  - [ ] Lenis (smooth scroll)
- [ ] 콘텐츠 데이터 구조 설계
  - [ ] TypeScript 타입 정의 (Company, CEO, Equipment, Product 등)
  - [ ] 더미 데이터 JSON 파일 생성 (`src/data/*.json`)
  - [ ] 다국어 콘텐츠 키 구조 설계 (`{ ko: "...", en: "..." }`)
- [ ] Vercel 프로젝트 생성 + 첫 preview 배포 확인

---

## Phase 1 — 디자인 시스템 + 공통 컴포넌트 (~1주)

### 레이아웃
- [ ] GrainOverlay — 미세 노이즈 텍스처 오버레이
- [ ] GlowBlob — 시안/블루 그라디언트 블롭 (애니메이션)
- [ ] PageHeader — 70vh 다크 히어로 (SectionLabel + 타이틀 + 서브타이틀)
- [ ] NotFoundPage — 404 페이지 (midnight 배경, Syne 120px, 홈 CTA)

### 네비게이션
- [ ] Skip link — "본문으로 건너뛰기" (포커스 시에만 표시)
- [ ] Header (PC)
  - [ ] 로고 + 메뉴 + 언어 토글 + 문의 CTA
  - [ ] 스크롤 60px 이후 배경 전환 (투명 → midnight/90 + backdrop-blur-lg)
  - [ ] 활성 메뉴 시안 밑줄
- [ ] Header (모바일)
  - [ ] 햄버거 버튼 → 풀스크린 오버레이
  - [ ] 메뉴 stagger 애니메이션
- [ ] Footer
  - [ ] 회사 정보 + 빠른 링크 + 저작권
  - [ ] PC 3컬럼 / 모바일 1컬럼

### UI 컴포넌트
- [ ] SectionLabel — `· UPPERCASE` 시안 점 + 라벨
- [ ] SectionTitle — Syne H2/H3
- [ ] CTAButton — 시안 배경, hover 그라디언트, 화살표 아이콘
- [ ] Card — steel 1px 보더, hover cyan 전환 + translateY
- [ ] LanguageToggle — KO | EN 토글, localStorage 저장

### 미디어
- [ ] ImageLightbox
  - [ ] shared layout animation (클릭 위치 → 확대)
  - [ ] midnight/90 backdrop + blur
  - [ ] 좌우 네비 (키보드 + 스와이프 + 클릭)
  - [ ] ESC / 배경 클릭 닫기
  - [ ] Focus trap + aria-modal
- [ ] Skeleton — 로딩 상태 (펄스 애니메이션)
- [ ] BlurUpImage — 저해상도 blur → 원본 fade-in

### 모션
- [ ] prefers-reduced-motion 대응 (스크롤 애니메이션 비활성화, 카운터 즉시 표시, Lenis 비활성화)

### 피드백
- [ ] Toast — 성공/에러/정보 알림

---

## Phase 2 — 페이지 퍼블리싱 (~2주)

### 2-1. Home

- [ ] Hero 섹션
  - [ ] 풀스크린 영상 배경 (poster 대체)
  - [ ] 다크 오버레이 (midnight/80~95 그라디언트)
  - [ ] 텍스트 clip-path reveal 애니메이션
  - [ ] 스크롤 유도 인디케이터
- [ ] 핵심 수치 섹션
  - [ ] Bento grid 레이아웃
  - [ ] Counter rolling 애니메이션 (Geist Mono)
  - [ ] 스크롤 트리거
- [ ] 설비 쇼케이스
  - [ ] GSAP 수평 스크롤 (pin)
  - [ ] 장비 카드 (이미지 + 모델명 + 한줄 스펙)
- [ ] 가공제품 하이라이트
  - [ ] 비대칭 그리드 (대형 1 + 소형 2)
  - [ ] 호버 오버레이 + 카테고리 라벨
- [ ] CTA 밴드
  - [ ] 시안 그라디언트 배경
  - [ ] "문의하기" 버튼
- [ ] 모바일 대응
  - [ ] 영상 → poster 이미지 대체
  - [ ] Bento 2×2 → 세로 배치
  - [ ] 수평 스크롤 → 스와이프 카드
  - [ ] 제품 그리드 → 1컬럼

### 2-2. About (회사소개)

- [ ] 페이지 헤더 (70vh, 시안 글로우)
- [ ] CEO 인사말
  - [ ] 비대칭 2컬럼 (5:7)
  - [ ] CEO 사진 (좌측, 미세 패럴랙스)
  - [ ] 인사말 첫 문장 H3 강조
  - [ ] 이름/직함 우측 정렬
- [ ] 조직도
  - [ ] 다크 섹션 (slate 배경)
  - [ ] SVG 트리 구조 + 시안 연결선
  - [ ] 연결선 stroke draw 애니메이션
  - [ ] 노드 stagger fade-in
- [ ] 모바일 대응
  - [ ] CEO 사진 풀너비 (300px 높이)
  - [ ] 조직도 → 세로 리스트 (좌측 시안 보더)

### 2-3. Equipment (설비현황)

- [ ] 페이지 헤더 + 카운터
  - [ ] 설비 총괄 카운터 (총 설비, CNC, MCT)
  - [ ] 0→N 롤링 애니메이션
- [ ] CNC 설비 쇼케이스
  - [ ] Zigzag 좌우 교차 배치 (5:7)
  - [ ] 장비 사진 (hover 줌)
  - [ ] 스펙 key-value 테이블 (Geist Mono)
  - [ ] 스크롤 slide-in (홀수 좌→우, 짝수 우→좌)
- [ ] MCT 설비 쇼케이스
  - [ ] CNC와 동일 구조
  - [ ] smoke 배경으로 섹션 구분
- [ ] 모바일 대응
  - [ ] Zigzag → 세로 배치 (사진 상단, 스펙 하단)
  - [ ] 카운터 3열 유지

### 2-4. Products (가공제품)

- [ ] 페이지 헤더 (블러 배경 이미지)
- [ ] 카테고리 필터
  - [ ] Sticky 상단 고정
  - [ ] 전체 / 방산 / 열교환기 / 기타 산업군
  - [ ] 활성 탭 시안 dot + 슬라이드 애니메이션
- [ ] 마소닉 갤러리
  - [ ] 3열 (PC) / 2열 (태블릿) / 1열 (모바일)
  - [ ] 이미지 원본 비율 유지, gap 8px
  - [ ] 호버: scale + 다크 오버레이 + 카테고리 라벨
  - [ ] Framer Motion layout + AnimatePresence
- [ ] 라이트박스 (ImageLightbox 컴포넌트 활용)
- [ ] 모바일 대응
  - [ ] 필터 탭 좌우 스크롤 (overflow-x)
  - [ ] 1열 갤러리, 최대 높이 300px

### 2-5. Sustainability (지속가능경영)

- [ ] 페이지 헤더
- [ ] ESG 경영 방침
  - [ ] 3컬럼 카드 (E / S / G)
  - [ ] 카드: steel 보더, Lucide 아이콘 (Leaf, Users, Shield)
  - [ ] 호버: 시안 보더 + translateY(-4px)
  - [ ] stagger fade-in
- [ ] 인증 현황
  - [ ] 4열 (PC) / 2열 (모바일) 그리드
  - [ ] 인증서 이미지 1:1.4 비율
  - [ ] 클릭 시 라이트박스
  - [ ] 호버: 줌 + 그림자
- [ ] 모바일 대응
  - [ ] ESG 카드 → 1컬럼
  - [ ] 인증서 → 2열 유지

### 2-6. Contact (문의하기)

- [ ] 페이지 헤더 (시안 글로우 좌하단)
- [ ] 문의 폼
  - [ ] 스플릿 레이아웃 6:4
  - [ ] Float label 패턴 (입력 시 라벨 상승)
  - [ ] 필드: 회사명, 담당자명, 연락처, 이메일, 문의내용
  - [ ] Validation (blur 시 + 전송 시)
  - [ ] 에러 표시: red-400 보더 + 하단 메시지
  - [ ] 전송 버튼 풀너비 (시안)
- [ ] 회사 정보 패널
  - [ ] 주소, 전화, 팩스, 이메일
  - [ ] 전화/팩스/이메일: Geist Mono
- [ ] 지도
  - [ ] Naver 또는 Kakao 지도
  - [ ] 풀너비, 400px (PC) / 300px (모바일)
  - [ ] 커스텀 마커 (시안)
  - [ ] 상단 그라디언트 오버레이
- [ ] 모바일 대응
  - [ ] 6:4 → 1컬럼 (폼 먼저, 정보 아래)

---

## Phase 3 — 기능 구현 (~0.5주)

### 이메일 발송
- [ ] API Route: `/api/contact`
- [ ] 이메일 서비스 연동 (Resend 또는 Nodemailer)
- [ ] 입력 데이터 서버 사이드 검증
- [ ] 에러 핸들링 + 응답 처리

### 스팸 방지
- [ ] reCAPTCHA v3 연동
- [ ] 토큰 검증 (서버 사이드)
- [ ] 실패 시 에러 토스트

### i18n 번역
- [ ] ko.json — 전체 한국어 텍스트
- [ ] en.json — 전체 영어 텍스트
- [ ] 메타 태그 번역 (title, description)

### SEO
- [ ] 페이지별 meta 태그 (title, description)
- [ ] OG 태그 (og:title, og:description, og:image)
- [ ] sitemap.xml 생성
- [ ] robots.txt
- [ ] hreflang 태그 (ko, en)
- [ ] JSON-LD 구조화 데이터 (Organization)

### 애널리틱스
- [ ] Google Analytics (GA4) 연동
- [ ] 페이지뷰 자동 추적

---

## Phase 4 — 테스트 + QA (~0.5주)

### 반응형
- [ ] PC (1440px+) 레이아웃 확인
- [ ] 태블릿 (768px~1024px) 레이아웃 확인
- [ ] 모바일 (< 768px) 레이아웃 확인

### 크로스 브라우저
- [ ] Chrome (최신) 정상 동작
- [ ] Safari (최신) 정상 동작
- [ ] Edge (최신) 정상 동작

### 성능
- [ ] Lighthouse Performance 90+ 달성
- [ ] LCP 2.5s 이하 달성
- [ ] CLS 0.1 이하

### 접근성
- [ ] 키보드 네비게이션 전체 페이지 확인
- [ ] 스크린리더 테스트
- [ ] 색상 대비 WCAG AA 확인
- [ ] prefers-reduced-motion 동작 확인

### 기능
- [ ] 문의 폼 전송 → 이메일 수신 확인
- [ ] 폼 validation 정상 동작
- [ ] i18n KO ↔ EN 전환 정상
- [ ] 라이트박스 열기/닫기/네비게이션
- [ ] 지도 로딩 + 마커 표시

---

## Phase 5 — 최적화 + 배포 (~0.5주)

### 최적화
- [ ] 이미지 WebP 변환 + srcset
- [ ] 번들 사이즈 분석 (`next build` + `@next/bundle-analyzer`)
- [ ] 불필요한 JS 제거 (tree-shaking 확인)
- [ ] 폰트 서브셋 최적화

### 배포
- [ ] 도메인 연결 (Vercel)
- [ ] SSL 인증서 확인 (HTTPS)
- [ ] 환경변수 설정 (API 키, SMTP 등)
- [ ] 프로덕션 빌드 + 최종 배포
- [ ] 프로덕션 환경 스모크 테스트
