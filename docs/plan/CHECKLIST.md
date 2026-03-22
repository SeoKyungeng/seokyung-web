# 개발 체크리스트 (DEV)

> 작업 완료 시 `[ ]` → `[x]`로 변경

---

## Phase 0 — 프로젝트 셋업 (~0.5주)

- [x] Next.js 16 + TypeScript 프로젝트 초기화 (pnpm)
- [x] Tailwind CSS v4 설치 및 설정 (CSS-first `@theme`)
- [x] 폴더 구조 확립 (app/[locale]/, components/, data/, lib/, i18n/, messages/, styles/)
- [x] ESLint 설정
- [x] Tailwind 테마 커스터마이징
  - [x] 컬러: midnight, primary-400, smoke, steel, slate
  - [x] 폰트 패밀리: Syne, Geist, Geist Mono, Pretendard
  - [x] 브레이크포인트: Tailwind v4 기본 (640 / 768 / 1024 / 1280 / 1536px)
- [x] next-intl i18n 설정
  - [x] `[locale]` 세그먼트 라우팅
  - [x] proxy.ts (Next.js 16 convention)
  - [x] 기본 메시지 파일 구조 (ko.json, en.json)
- [x] 폰트 설정
  - [x] Syne (`next/font/google`)
  - [x] Geist + Geist Mono (`geist` 패키지)
  - [x] Pretendard (`next/font/local`, Variable woff2)
- [x] 모션 라이브러리 설치
  - [x] Framer Motion
  - [x] GSAP + @gsap/react
  - [x] Lenis (smooth scroll)
- [x] 콘텐츠 데이터 구조 설계
  - [x] TypeScript 타입 정의 (`src/lib/types.ts`)
  - [x] 더미 데이터 JSON 파일 7개 (`src/data/*.json`)
  - [x] 다국어 콘텐츠 키 구조 (`{ ko: "...", en: "..." }`)
- [ ] Vercel 프로젝트 생성 + 첫 preview 배포 확인

---

## Phase 1 — 디자인 시스템 + 공통 컴포넌트 (~1주)

### 레이아웃
- [x] GrainOverlay — 미세 노이즈 텍스처 오버레이
- [x] GlowBlob — 시안/블루 그라디언트 블롭 (애니메이션)
- [x] PageHeader — 70vh 다크 히어로 (SectionLabel + 타이틀 + 서브타이틀)
- [x] NotFoundPage — 404 페이지 (midnight 배경, Syne 120px, 홈 CTA)

### 네비게이션
- [x] Skip link — "본문으로 건너뛰기" (포커스 시에만 표시)
- [x] Header (PC)
  - [x] 로고 + 메뉴 + 언어 토글 + 문의 CTA
  - [x] 스크롤 60px 이후 배경 전환 (투명 → midnight/90 + backdrop-blur-lg)
  - [x] 활성 메뉴 시안 밑줄
- [x] Header (모바일)
  - [x] 햄버거 버튼 → 풀스크린 오버레이
  - [x] 메뉴 stagger 애니메이션
- [x] Footer
  - [x] 회사 정보 + 빠른 링크 + 저작권
  - [x] PC 3컬럼 / 모바일 1컬럼

### UI 컴포넌트
- [x] SectionLabel — `· UPPERCASE` 시안 점 + 라벨
- [x] SectionTitle — Syne H2/H3
- [x] CTAButton — 시안 배경, hover 그라디언트, 화살표 아이콘
- [x] Card — steel 1px 보더, hover primary 전환 + translateY
- [x] LanguageToggle — KO | EN 토글, next-intl 라우팅 기반

### 미디어
- [x] ImageLightbox
  - [x] scale(0.9→1) 애니메이션
  - [x] midnight/90 backdrop + blur
  - [x] 좌우 네비 (키보드 + 스와이프 + 클릭)
  - [x] ESC / 배경 클릭 닫기
  - [x] Focus trap + aria-modal
- [x] Skeleton — 로딩 상태 (펄스 애니메이션)
- [x] BlurUpImage — 저해상도 blur → 원본 fade-in

### 모션
- [x] prefers-reduced-motion 대응 (스크롤 애니메이션 비활성화, 카운터 즉시 표시, Lenis 비활성화)

### 피드백
- [x] Toast — 성공/에러/정보 알림

---

## Phase 2 — 페이지 퍼블리싱 (~2주)

### 2-1. Home

- [x] Hero 섹션
  - [x] 풀스크린 배경 (midnight + GlowBlob, 영상/poster 추후 교체)
  - [x] 다크 오버레이 (midnight 그라디언트)
  - [x] 텍스트 clip-path reveal 애니메이션
  - [x] 스크롤 유도 인디케이터
- [x] 핵심 수치 섹션
  - [x] Bento grid 레이아웃
  - [x] Counter rolling 애니메이션 (Geist Mono)
  - [x] IntersectionObserver 스크롤 트리거
- [x] 설비 쇼케이스
  - [x] GSAP 수평 스크롤 (pin) — PC
  - [x] 장비 카드 (placeholder + 모델명 + 스펙)
- [x] 가공제품 하이라이트
  - [x] 비대칭 그리드 (대형 1 + 소형 2)
  - [x] 호버 오버레이 + 카테고리 라벨
- [x] CTA 밴드
  - [x] 시안 글로우 배경
  - [x] "문의하기" 버튼
- [x] 모바일 대응
  - [x] Bento → 세로 배치
  - [x] 수평 스크롤 → overflow-x 스와이프 카드
  - [x] 제품 그리드 → 1컬럼

### 2-2. About (회사소개)

- [x] 페이지 헤더 (70vh, 시안 글로우)
- [ ] CEO 인사말
  - [ ] 풀너비 텍스트 레이아웃 (사진 미사용 확정)
  - [ ] highlight 문장 H2 중앙 정렬
  - [ ] accent line (primary-400, w-16, 2px)
  - [ ] body 다단락 텍스트 (max-w-3xl)
  - [ ] 이름/직함 우측 정렬 + border-top
- [ ] 경영이념
  - [ ] smoke 배경 섹션
  - [ ] 슬로건 텍스트 (중앙 정렬)
  - [ ] 3컬럼 카드 그리드 (고객/품질/사람)
  - [ ] 카드: 아이콘 + 제목 + 부제 + 항목 리스트
  - [ ] hover shadow + border-primary 전환
- [ ] 조직도
  - [ ] 다크 섹션 (slate 배경)
  - [ ] 2단계 트리 (CEO → 부서 5 → 팀 12)
  - [ ] 시안 연결선 + 노드 stagger fade-in
  - [ ] 인원수 비표시 (미기재)
- [ ] 주요 고객사
  - [ ] 텍스트 그리드 (로고 미수령)
  - [ ] 4열 (PC) / 2열 (모바일)
  - [ ] hover shadow + border-primary
- [ ] 모바일 대응
  - [ ] CEO 인사말 1컬럼 (highlight 축소)
  - [ ] 경영이념 카드 1컬럼 스택
  - [ ] 조직도 세로 리스트 + 들여쓰기 계층
  - [ ] 고객사 2열 유지

### 2-3. Equipment (설비현황)

- [x] 페이지 헤더 + 카운터
  - [x] 설비 총괄 카운터 (총 설비, CNC, MCT)
  - [x] 0→N 롤링 애니메이션
- [x] CNC 설비 쇼케이스
  - [x] Zigzag 좌우 교차 배치 (5:7)
  - [x] 장비 placeholder (hover 줌)
  - [x] 스펙 key-value 테이블 (Geist Mono, i18n 대응)
  - [x] 스크롤 slide-in (홀수 좌→우, 짝수 우→좌)
- [x] MCT 설비 쇼케이스
  - [x] CNC와 동일 구조
  - [x] smoke 배경으로 섹션 구분
- [x] 모바일 대응
  - [x] Zigzag → 세로 배치 (사진 상단, 스펙 하단)
  - [x] 카운터 3열 유지

### 2-4. Products (가공제품)

- [x] 페이지 헤더
- [x] 카테고리 필터
  - [x] Sticky 상단 고정
  - [x] 전체 / 방산 / 열교환기 / 기타 산업군
  - [x] 활성 탭 시안 dot + 슬라이드 애니메이션
- [x] 마소닉 갤러리
  - [x] 3열 (PC) / 2열 (태블릿) / 1열 (모바일) CSS columns
  - [x] 호버: scale + 다크 오버레이 + 카테고리 라벨
  - [x] Framer Motion layout + AnimatePresence
- [x] 라이트박스 (ImageLightbox 컴포넌트 활용)
- [x] 모바일 대응
  - [x] 필터 탭 좌우 스크롤 (overflow-x)
  - [x] 1열 갤러리, 최대 높이 300px

### 2-5. Sustainability (지속가능경영)

- [x] 페이지 헤더
- [x] ESG 소개
  - [x] 풀너비 중앙 텍스트 (비전문 + 소개문)
  - [x] accent line (primary-400, scaleX 애니메이션)
  - [x] fade-in 모션
- [x] ESG 경영 방침
  - [x] zigzag 이미지+텍스트 3블록 (E/S/G)
  - [x] 5:7 비대칭 2컬럼, 홀짝 교차
  - [x] 이미지 placeholder (추후 교체)
  - [x] 텍스트: 큰 키 문자 + title + subtitle + description + items
  - [x] 이미지 slide-in + 텍스트 stagger fade-in
- [x] 모바일 대응
  - [x] ESG 방침 zigzag → 1컬럼 (이미지 상단, 텍스트 하단)

### 2-6. Contact (문의하기)

- [x] 페이지 헤더 (시안 글로우 좌하단)
- [x] 문의 폼
  - [x] 스플릿 레이아웃 6:4
  - [x] Float label 패턴 (입력 시 라벨 상승)
  - [x] 필드: 회사명, 담당자명, 연락처, 이메일, 문의내용
  - [x] Validation (blur 시 + 전송 시)
  - [x] 에러 표시: red-400 보더 + 하단 메시지
  - [x] 전송 버튼 풀너비 (시안)
- [x] 회사 정보 패널
  - [x] 주소, 전화, 팩스, 이메일
  - [x] 전화/팩스/이메일: Geist Mono
- [x] 지도
  - [x] 플레이스홀더 (추후 Naver/Kakao 연동)
  - [x] 풀너비, 400px (PC) / 300px (모바일)
  - [x] 상단 그라디언트 오버레이
- [x] 모바일 대응
  - [x] 6:4 → 1컬럼 (폼 먼저, 정보 아래)

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
