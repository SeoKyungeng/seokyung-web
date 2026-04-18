# Sanity 아키텍처 설명서

> **대상**: 개발자 또는 이 리포에 새로 투입되는 에이전트.
> **목적**: Sanity Studio가 Next.js 앱에 어떻게 통합되어 있고, 왜 그 방식으로 설계했는지 설명한다.
> **관련 문서**: 도입 계획은 [`docs/plan/CMS_PLAN.md`](./plan/CMS_PLAN.md), 담당자 사용법은 [`docs/cms-manual.md`](./cms-manual.md).

---

## 1. 전체 그림

```
┌─────────────────────────────────────────────────────────────┐
│  www.seokyungeng.com (Vercel에 배포된 Next.js 앱)           │
│                                                              │
│  ┌──────────────────────┐       ┌─────────────────────────┐│
│  │  /ko, /en 등          │       │  /studio                ││
│  │  일반 페이지          │       │  (Sanity Studio SPA)    ││
│  │  Server Component     │       │  Client Component       ││
│  │  + next-intl          │       │  격리된 root layout     ││
│  └──────────┬───────────┘       └────────────┬────────────┘│
│             │ fetchers.ts                     │ 편집/발행    │
└─────────────┼─────────────────────────────────┼─────────────┘
              │                                 │
              ▼                                 ▼
       ┌──────────────────────────────────────────────┐
       │  Sanity 클라우드 (api.sanity.io)              │
       │  projectId: j5mmf0h2 / dataset: production    │
       │  - 문서 저장소                                 │
       │  - 이미지 CDN (cdn.sanity.io)                  │
       │  - 인증 (GitHub OAuth)                         │
       │  - 웹훅 발신자                                  │
       └──────────────┬───────────────────────────────┘
                      │ Publish 시 웹훅
                      ▼
              ┌──────────────────────┐
              │ POST /api/revalidate │
              │  HMAC 검증 →         │
              │  revalidateTag       │
              └──────────────────────┘
```

핵심 명제: **우리 앱에는 데이터베이스가 없다.** Sanity 클라우드가 사실상의 DB이며, 우리 앱은 빌드·런타임에 GROQ로 조회하여 ISR 캐시에 담아두는 방식이다.

---

## 2. Studio는 "임베드된 SPA"

### 2.1 실제 구현

```
src/app/studio/
├── layout.tsx              ← 격리된 root layout
└── [[...tool]]/
    └── page.tsx            ← NextStudio 마운트
```

`page.tsx`는 실질적으로 단 두 줄:

```tsx
"use client";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

- `next-sanity/studio`의 `<NextStudio>`가 브라우저에서 Studio UI를 전부 구성한다.
- 우리 서버는 빈 HTML 껍데기만 응답하고, 실제 인터페이스는 클라이언트 번들이 렌더.

### 2.2 `[[...tool]]` — 선택적 catch-all 동적 세그먼트

Next.js 파일 라우팅 문법:

| 문법 | 의미 | 매칭 |
| --- | --- | --- |
| `[slug]` | 단일 세그먼트 | `/x/a` (O), `/x/a/b` (X) |
| `[...slug]` | catch-all | `/x/a`, `/x/a/b` (O), `/x` (X) |
| **`[[...slug]]`** | **선택적 catch-all** | `/x`, `/x/a`, `/x/a/b` 모두 (O) |

**왜 이걸 쓰나**: Sanity Studio는 내부에 자체 라우터를 갖고 있어서, 좌측 메뉴 탐색 시 URL이 이렇게 바뀐다.

```
/studio
/studio/structure
/studio/structure/companyInfo
/studio/structure/equipment;eq-01
/studio/vision
```

→ `/studio` 뒤에 무엇이 붙어도 **동일한 page.tsx가 받아서 Studio에 넘겨야 한다.** `[[...tool]]`만이 "0단계부터 N단계 전부"를 만족한다.

`page.tsx`는 `tool` 파라미터 자체를 사용하지 않는다. Studio가 `window.location.pathname`을 직접 읽어 처리하기 때문.

### 2.3 격리된 root layout이 필요한 이유

`src/app/studio/layout.tsx`는 **독립된 `<html><body>`** 를 갖는다:

```tsx
export const metadata = { title: "서경엔지니어링 CMS", robots: "noindex, nofollow" };

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ko"><body style={{ margin: 0 }}>{children}</body></html>;
}
```

이 구성이 필요한 이유:

1. **i18n 격리** — `/studio`는 `[locale]` 세그먼트 밖에 있다. `/ko/studio` 같은 locale 접두사가 붙지 않는다. `next-intl` Provider가 Studio를 감싸지 않으므로 번역 훅 충돌이 없다.
2. **Provider 격리** — 일반 페이지는 `LenisProvider`(부드러운 스크롤), `ToastProvider`가 감싸는데, Studio는 내부에 자체 스크롤·알림 시스템이 있어 간섭하면 UX가 깨진다.
3. **스타일 격리** — Studio는 styled-components를 쓰며, 우리 Tailwind 전역 스타일이 그대로 들어가면 폼 요소가 시각적으로 망가진다.
4. **SEO 배제** — `robots: "noindex, nofollow"`로 검색엔진이 Studio를 색인하지 못하게 막는다.

### 2.4 `proxy.ts`에서 `/studio` 제외

```ts
export const config = {
  matcher: "/((?!api|trpc|studio|_next|_vercel|.*\\..*).*)",
};
```

`next-intl` 미들웨어가 모든 경로에 locale 접두사를 붙이는데, Studio는 locale과 무관해야 한다. `studio`를 매처에서 제외하지 않으면 `/studio` 접속 시 `/ko/studio`로 강제 리다이렉트돼서 무한 루프나 404가 발생한다.

> **Next.js 16 주의**: `middleware.ts`는 deprecated이고 `proxy.ts`가 새 컨벤션.

---

## 3. 인증

- **우리 앱은 인증에 관여하지 않는다.**
- Studio SPA가 `sanity.io/login`으로 직접 리다이렉트 → **회사 GitHub OAuth** → Sanity가 프로젝트 멤버 여부 확인 → 토큰 발급.
- 로그인 세션·쿠키는 `sanity.io` 도메인에 저장되고, Studio SPA가 브라우저에서 직접 사용한다.
- 따라서 "누가 Studio에 접근할 수 있는가" = "누가 Sanity 프로젝트 멤버인가"의 문제이며, Sanity Manage 대시보드(https://www.sanity.io/manage/project/j5mmf0h2)에서 관리한다.
- 담당자 추가·제거는 Sanity 대시보드에서 회사 GitHub 아이디로 초대/해제.

---

## 4. 데이터 접근 흐름

### 4.1 서버 컴포넌트에서 조회

```ts
// src/lib/sanity/fetchers.ts
const fetchWithTag = <T>(query: string, tag: DocumentType) =>
  sanityClient.fetch<T>(query, {}, { next: { revalidate: 3600, tags: [tag] } });

export const getCompanyInfo = cache(() =>
  fetchWithTag<SanityCompanyInfo | null>(companyInfoQuery, "companyInfo"));
```

핵심 포인트:

- **`next: { revalidate: 3600 }`** — ISR 캐시 수명 1시간. Vercel Edge가 1시간 동안 동일 응답을 재사용.
- **`tags: [tag]`** — 문서 타입별 태그 부여. 웹훅이 이 태그로 정확한 캐시만 무효화.
- **`cache(fn)` (React cache)** — 같은 렌더 사이클 내에서 중복 호출 dedupe. 예: Footer·CompanyInfo·MapPlaceholder가 모두 `getCompanyInfo()`를 불러도 실제 fetch는 1번.

### 4.2 쿼리는 GROQ

GROQ는 Sanity 전용 쿼리 언어(SQL과 유사하지만 JSON 친화적). 예:

```groq
*[_type == "equipment"] | order(order asc) {
  "id": equipmentId,
  "type": category,
  name,
  "photo": photo.asset->url,
  specs[]{ label, value }
}
```

우리 리포는 `src/lib/sanity/queries.ts`에 쿼리를 모아두고 `defineQuery()`로 타입 추론을 활용한다. 재사용 조각은 함수로 추출(예: `image()`, `esgFields()`).

### 4.3 ISR + 웹훅 흐름

```
담당자가 Studio에서 Publish
    ↓
Sanity 클라우드 문서 업데이트
    ↓
웹훅 발사 (HMAC 서명 + {"_type": "equipment"} 등 페이로드)
    ↓
POST https://www.seokyungeng.com/api/revalidate
    ↓
src/app/api/revalidate/route.ts
    ├─ @sanity/webhook의 isValidSignature로 HMAC 검증
    │   (SANITY_REVALIDATE_SECRET 사용)
    └─ revalidateTag(type, "max")
    ↓
다음 방문자 요청 시 해당 태그 붙은 fetch만 재실행 → 새 HTML 생성
```

- **`revalidateTag(tag, profile)`** — Next.js 16부터 두 번째 인자 필수. `"max"`는 모든 캐시 계층을 즉시 무효화.
- **무효화 단위가 태그** — 설비 하나 수정하면 `equipment` 태그만 무효화, 다른 페이지(예: `/contact`)는 영향 없음.
- **평소**: Vercel Edge 캐시가 응답 → 밀리초 단위 latency.
- **Publish 직후**: 캐시 무효화 → 다음 요청에서 한 번 재생성 → 이후 다시 캐싱.

---

## 5. 싱글턴 보호

```ts
// sanity.config.ts
document: {
  actions: (input, context) =>
    SINGLETON_TYPES.has(context.schemaType)
      ? input.filter(({ action }) =>
          action && ["publish", "discardChanges", "restore"].includes(action))
      : input,
},
schema: {
  templates: (templates) =>
    templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
},
```

`companyInfo`, `ceo`, `philosophy`, `organization`, `sustainability`, `stats`는 "하나만 존재해야 하는 문서"다.

- **templates 필터링** — 해당 타입에 대해 "+ New" 버튼이 안 보이게 한다. 실수로 두 번째 문서 생성 방지.
- **actions 필터링** — Delete, Duplicate 등 위험 액션 제거. publish/discardChanges/restore만 허용.

관련 구조 트리는 `sanity/structure.ts`에서 고정 `documentId`로 지정한다(예: `S.document().schemaType("companyInfo").documentId("companyInfo")`).

---

## 6. 환경변수

| 변수 | 용도 | 클라이언트 노출 |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Studio·Client 모두 | ✅ (공개 가능) |
| `NEXT_PUBLIC_SANITY_DATASET` | 동일 | ✅ |
| `NEXT_PUBLIC_SANITY_API_VERSION` | 쿼리 API 버전 고정 (예: `2025-01-01`) | ✅ |
| `SANITY_API_TOKEN` | 서버 사이드 fetch (Viewer 권한) | ❌ 서버 전용 |
| `SANITY_REVALIDATE_SECRET` | 웹훅 HMAC 검증 | ❌ 서버 전용 |

`SANITY_WRITE_TOKEN`은 **초기 마이그레이션 시에만 사용**했고 현재는 제거됨. 필요 시 Sanity Manage에서 Editor 토큰을 임시 발급.

---

## 7. 왜 임베드를 선택했나

대안 비교:

| 방식 | 장점 | 단점 |
| --- | --- | --- |
| **임베드** (현재) | 도메인 하나, 별도 배포 불필요, 원자적 버전 관리 | Studio 번들이 우리 앱 빌드에 포함됨 |
| 별도 호스팅(sanity.studio) | 번들 완전 분리 | 도메인 2개, CORS 관리 번거로움 |
| 헤드리스 SaaS(Contentful 등) | 운영 부담 없음 | 커스터마이징 제약, 비용 |

우리는 **소규모 단일 팀·무료 티어 목표**라 임베드 + GitHub OAuth가 최적.

Studio 번들은 `/studio` 경로로 접근해야만 로드되므로, 일반 방문자가 사이트를 볼 때 다운로드되지 않는다(Next.js 코드 분할).

---

## 8. 자주 하는 질문 (개발자용)

### Q. 로컬에서 Studio 접속은?

```bash
pnpm dev
# → http://localhost:3000/studio
```

Sanity 프로젝트의 CORS 설정에 `http://localhost:3000`이 등록되어 있어야 인증 가능. Sanity Manage → API → CORS Origins에서 확인.

### Q. GROQ 쿼리 디버깅은?

`/studio/vision` 탭에서 실시간 쿼리 실행 가능. 프로덕션에서도 접근 가능하지만 담당자에게는 "건드리지 말라"고 매뉴얼에 안내.

### Q. 재검증이 안 되면?

1. 웹훅 페이로드 확인 (Sanity Manage → API → Webhooks → Attempts)
2. 응답 본문에 `{"revalidated": true, "tag": "..."}`가 있어야 정상
3. 서명 오류 시 `SANITY_REVALIDATE_SECRET`이 Sanity 웹훅 설정과 Vercel 환경변수에서 동일한지 확인

### Q. 스키마 변경 배포는?

1. `sanity/schemas/` 수정 → 커밋 → Vercel 배포
2. Studio는 Next.js 앱의 일부라 **앱 배포 = Studio 배포**다. 별도 `sanity deploy` 불필요.
3. 단, 이미 존재하는 문서의 기존 필드를 "삭제"하면 Studio에서 경고 표시. 데이터는 남아있으니 마이그레이션 필요하면 script 작성.

### Q. 이미지는 어떻게 최적화되나?

- Sanity가 원본 업로드를 `cdn.sanity.io`에 저장.
- GROQ에서 `image.asset->url`로 URL만 꺼내서 `<Image src={url}>`에 전달.
- `next.config.ts`의 `remotePatterns`에 `cdn.sanity.io`가 등록되어 있어 `next/image`가 중간 최적화(WebP 변환, 크기 조정) 적용.
- `@sanity/image-url`의 `urlFor()`는 현재 사용 안 함(PR #3에서 제거).

---

## 9. 관련 파일 빠른 참조

| 경로 | 역할 |
| --- | --- |
| `sanity.config.ts` | Studio 설정, 싱글턴 보호 |
| `sanity/structure.ts` | 좌측 메뉴 구조 |
| `sanity/schemas/**` | 9개 문서 스키마 |
| `src/app/studio/[[...tool]]/page.tsx` | Studio SPA 마운트 |
| `src/app/studio/layout.tsx` | 격리된 root layout |
| `src/lib/sanity/client.ts` | GROQ 쿼리 클라이언트 |
| `src/lib/sanity/queries.ts` | GROQ 쿼리 정의 |
| `src/lib/sanity/fetchers.ts` | ISR + 태그 + React.cache fetch 함수 |
| `src/lib/sanity/types.ts` | 응답 타입 + `DOCUMENT_TYPES` |
| `src/app/api/revalidate/route.ts` | 웹훅 수신·HMAC 검증·태그 무효화 |
| `src/proxy.ts` | `/studio` i18n 제외 매처 |
| `next.config.ts` | `cdn.sanity.io` remotePatterns |
