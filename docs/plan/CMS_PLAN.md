# CMS 도입 계획서 — Sanity CMS

> **목표**: 비개발 담당자가 설비·제품·회사 정보를 직접 관리할 수 있도록 Sanity CMS를 Next.js 16 프로젝트에 통합한다.
> **작성일**: 2026-04-17

---

## 1. 배경

### 1.1 현재 상황
- 콘텐츠는 `src/data/*.json` 9개 파일에 하드코딩
- 장비 19대 스펙, 제품 14장 사진, 회사 정보 등
- 수정 시마다 개발자가 JSON 편집 → 커밋 → 배포 필요
- 이미지 파일은 `public/images/` 수동 업로드
- i18n: `{ ko: "...", en: "..." }` LocalizedText 패턴

### 1.2 선정 근거 (CMS 비교 후 결정)
| 후보 | 결론 |
|---|---|
| **Sanity** ✅ | 비개발자 UX 최상, 무료 티어 충분, 이미지 CDN 내장, SaaS 운영 부담 없음 |
| Payload v3 | Next 통합 우수하나 Postgres·S3 셋업·장애 대응 필요 (관리자 기술 친화도 낮음) |
| Keystatic | Git 기반 — 담당자가 GitHub 사용해야 함 |
| Strapi/Directus | 별도 서버 운영 과도 |

---

## 2. Sanity 무료 티어 분석

### 2.1 무료 티어 한도 (2026-04 기준)

| 항목 | 무료 한도 | 서경엔지 예상 사용량 | 여유 |
|---|---|---|---|
| 사용자 seat | **20명** | 2~3명 (대표/담당자/개발자) | ✅ 충분 |
| 권한 역할 | 2개 (Admin, Viewer) | Admin 1 + Viewer 1 | ✅ 충분 |
| Dataset | 2개 (public only) | production + staging | ✅ 충분 |
| 문서 수 | **10,000개** | 설비 20 + 제품 30 + 기타 20 = ~70개 | ✅ 142배 여유 |
| Dataset당 속성 | 2,000개 | ~150개 예상 | ✅ 충분 |
| 에셋 스토리지 | **100GB** | 이미지 1~2GB 예상 | ✅ 50배 여유 |
| CDN 요청 | 1,000,000/월 | Vercel ISR 캐싱 시 <10k/월 | ✅ 충분 |
| API 요청 | 250,000/월 | 빌드·프리뷰 합산 <5k/월 | ✅ 충분 |
| 대역폭 | 100GB/월 | 예상 <10GB/월 | ✅ 충분 |
| GROQ 웹훅 | 2개 | Vercel 재배포 1개 | ✅ 충분 |
| 초안 히스토리 | 3일 | - | ⚠️ 수용 가능 |
| 언어/콘텐츠 타입 | 무제한 | ko/en 2개 | ✅ |

### 2.2 무료 티어에서 불가능한 것
- ❌ **비공개 Dataset** — production도 public. 단, 콘텐츠는 이미 웹사이트에 공개되므로 문제 없음
- ❌ 댓글·태스크 관리 (불필요)
- ❌ 예약 발행 (수동 발행으로 대체)
- ❌ AI Assist (불필요)
- ❌ 전담 지원 — 커뮤니티 지원으로 충분

### 2.3 결론
**이 프로젝트 규모에서는 무료 티어로 무기한 운영 가능.** 유료 전환이 필요해지는 시점은:
- 사용자 20명 초과 (가능성 매우 낮음)
- 문서 10,000개 초과 (현재 70개 기준 142배)
- 비공개 Dataset 필요 시 → Growth $15/월

---

## 3. 아키텍처 설계

### 3.1 전체 구조
```
┌────────────────────┐     ┌───────────────────┐
│  Sanity Studio     │────▶│  Sanity Content   │
│  /studio 라우트    │     │  Lake (클라우드)  │
│  (담당자 접속)     │     └────────┬──────────┘
└────────────────────┘              │
                                    │ GROQ 쿼리
                                    ▼
                         ┌──────────────────────┐
                         │  Next.js 16 App      │
                         │  - ISR (revalidate)  │
                         │  - Draft Mode        │
                         └──────────┬───────────┘
                                    │
                                    ▼
                              Vercel 배포
                                    ▲
                                    │ 웹훅
                                    │
                         ┌──────────┴───────────┐
                         │  Sanity 웹훅         │
                         │  → on-demand ISR     │
                         └──────────────────────┘
```

### 3.2 스키마 설계 (핵심)

**i18n 전략**: 필드 단위 객체 방식 — 현재 `{ ko, en }` 패턴과 1:1 매핑

```ts
// sanity/schemas/localizedString.ts
defineType({
  name: 'localizedString',
  type: 'object',
  fields: [
    { name: 'ko', type: 'string', title: '한국어' },
    { name: 'en', type: 'string', title: 'English' },
  ],
})
```

**컬렉션 목록**:
| 스키마 | 현재 소스 | 비고 |
|---|---|---|
| `equipment` | `src/data/equipment.json` | CNC/MCT/검사/기타 카테고리 |
| `product` | `src/data/products.json` | 이미지 갤러리 |
| `client` | `src/data/clients.json` | 고객사 로고 |
| `companyInfo` | `src/data/company.json` | 싱글턴 문서 |
| `ceo` | `src/data/ceo.json` | 싱글턴 |
| `philosophy` | `src/data/philosophy.json` | 싱글턴 |
| `organization` | `src/data/organization.json` | 싱글턴 |
| `sustainability` | `src/data/sustainability.json` | 싱글턴 |
| `stats` | `src/data/stats.json` | 싱글턴 |

### 3.3 Next.js 통합 포인트
- `next-sanity` 패키지 사용
- Server Component에서 `client.fetch(groqQuery, params, { next: { revalidate: 3600 } })`
- `/studio/[[...tool]]` 라우트에 Studio 임베드
- Draft Mode로 발행 전 미리보기
- Sanity 웹훅 → `/api/revalidate` → `revalidateTag()` 호출

> **상세 아키텍처**: 도입 후 운영 중 구조(라우팅·격리 레이아웃·인증·ISR 흐름)는 [`docs/sanity-architecture.md`](../sanity-architecture.md) 참조.

---

## 4. 구현 계획 (Phase별)

### Phase A — Sanity 프로젝트 셋업 (0.5일)
- [ ] Sanity 계정 생성 (sanity.io)
- [ ] 프로젝트 생성 (production dataset)
- [ ] API 토큰 발급 (read-only, editor)
- [ ] Vercel 환경변수 등록
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `SANITY_API_TOKEN`
  - `SANITY_REVALIDATE_SECRET`

### Phase B — Studio 통합 (1일)
- [ ] `pnpm add sanity next-sanity @sanity/image-url @sanity/vision`
- [ ] `sanity.config.ts` 작성 (한국어 locale, Vision 플러그인 포함)
- [ ] `src/app/studio/[[...tool]]/page.tsx` 생성
- [ ] 인증 설정 (Google 로그인 권장)
- [ ] 로컬 `/studio` 접속 확인

### Phase C — 스키마 정의 (1~2일)
- [ ] `sanity/schemas/` 디렉터리 구조 수립
- [ ] `localizedString`, `localizedText` 공통 객체
- [ ] 9개 컬렉션/싱글턴 스키마 정의
- [ ] 이미지 필드에 hotspot/crop 활성화
- [ ] 스펙 반복 필드(`array of object`) 구현
- [ ] 필드 순서·그룹 UX 튜닝

### Phase D — 데이터 마이그레이션 (1일)
- [ ] `scripts/migrate-to-sanity.ts` 작성
  - 기존 JSON 파싱 → Sanity 문서 생성
  - 로컬 이미지 → Sanity 에셋 업로드
- [ ] `sanity dataset export`로 백업 후 실행
- [ ] Studio에서 데이터 검증

### Phase E — 앱 연동 (2일)
- [ ] `src/lib/sanity/client.ts` — 클라이언트 생성
- [ ] `src/lib/sanity/queries.ts` — GROQ 쿼리 모음
- [ ] 각 페이지/섹션에서 `src/data/*.json` → Sanity fetch 교체
  - [ ] `/company/equipment` — 설비
  - [ ] `/company/products` — 제품
  - [ ] `/company/about` — 회사/CEO/철학
  - [ ] `/` — stats, clients
- [ ] `urlFor()` 헬퍼로 이미지 최적화 (Next/Image 연동)

### Phase F — 재검증·프리뷰 (1일)
- [ ] `src/app/api/revalidate/route.ts` 구현
- [ ] Sanity 웹훅 설정 (publish 이벤트)
- [ ] Draft Mode 토글 (Studio에서 프리뷰 링크)
- [ ] ISR 동작 확인 (수정 → 30초 내 반영)

### Phase G — 담당자 온보딩 (0.5일)
- [ ] Studio 접속 권한 부여
- [ ] 사용 매뉴얼 작성 (스크린샷 포함)
- [ ] 30분 교육 세션 (설비 추가·수정·삭제 실습)

**총 예상 기간: 7~8일 (1.5주)**

---

## 5. 마이그레이션 안전 장치

### 5.1 롤백 계획
- Sanity 연동 코드는 feature branch (`feature/sanity-cms`)에서 진행
- `src/data/*.json` 파일은 마이그레이션 완료 후 **2주간 유지** → 문제 시 즉시 복구
- 환경변수로 CMS 소스 토글: `CONTENT_SOURCE=json|sanity`

### 5.2 리스크
| 리스크 | 대응 |
|---|---|
| Sanity 서비스 장애 | ISR 캐시로 최소 1시간 버퍼, 빌드 시 스냅샷 포함 |
| 담당자 실수로 데이터 삭제 | Sanity 30일 휴지통, 일주일 1회 `sanity dataset export` 자동 백업 (GitHub Actions) |
| 비용 폭증 | 무료 한도 접근 시 이메일 알림, CDN 레이어로 API 요청 최소화 |
| 이미지 최적화 품질 | `@sanity/image-url`로 WebP 변환 + Next/Image 조합 |

---

## 6. 담당자 사용 시나리오 (UX)

### 시나리오 A — 신규 설비 1대 추가
1. `seokyung.co.kr/studio` 접속 → Google 로그인
2. 좌측 메뉴 "설비 (Equipment)" 클릭
3. 우상단 "+" 버튼
4. 입력:
   - 카테고리: 드롭다운에서 "CNC"
   - 이름 KO: `CNC 선반` / 이름 EN: `CNC Lathe`
   - 모델명: `L400-LC` (단일 필드, 번역 없음)
   - 제조사 KO/EN
   - 수량: `1`
   - 사진: 드래그&드롭
   - 스펙: "+ 항목 추가" 반복 (라벨 KO/EN + 값)
5. "Publish" 버튼 → 30초 후 사이트 반영

### 시나리오 B — 회사 소개 문구 수정
1. Studio → "회사 정보" (싱글턴, 하나뿐)
2. 해당 필드 인라인 편집
3. Publish

### 시나리오 C — 가공제품 사진 추가
1. Studio → "제품" → "+"
2. 이미지 업로드 → alt 텍스트 KO/EN 입력
3. Publish

---

## 7. 체크리스트 연계

본 계획 완료 후 `CHECKLIST.md` Phase 6 섹션 신설:
- [ ] Phase 6 — CMS 도입 (Sanity)

세부 항목은 본 문서 Section 4 참조.

---

## 8. 참고 자료
- Sanity Pricing: https://www.sanity.io/pricing
- Sanity Localization: https://www.sanity.io/docs/localization
- next-sanity: https://github.com/sanity-io/next-sanity
- Sanity + Next.js App Router 공식 가이드
