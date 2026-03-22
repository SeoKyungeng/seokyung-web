# 프로젝트 관리 문서 (PM)

## (주)서경엔지니어링 홈페이지 구축

---

## 1. 문서 체계

> 프로젝트 개요 및 상세 요구사항은 기획서 참조.

| 문서 | 경로 | 역할 |
|------|------|------|
| 기획서 (SRS v1.2) | `docs/기획서_서경엔지니어링_홈페이지.md` | 요구사항 정의 (정본) |
| 디자인 시스템 | `docs/design/design.md` | 시각 스펙 정의 (**스펙 충돌 시 정본**) |
| 페이지별 디자인 | `docs/design/pages/*.md` | 페이지 와이어프레임 + 모션 + 상태 |
| 개발 체크리스트 | `docs/plan/CHECKLIST.md` | 구현 작업 추적 |
| 본 문서 (PM) | `docs/plan/PLAN.md` | 일정, 리스크, 의사소통 관리 |

> **정본 원칙**: 수치/스펙이 문서 간 충돌할 경우 `design.md` → `pages/*.md` → `CHECKLIST.md` 순서로 우선.

---

## 2. 진행 현황

| Phase | 항목 | 상태 | 비고 |
|-------|------|------|------|
| - | 기획서 작성 | ✅ 완료 | v1.2 |
| - | 디자인 문서 작성 | ✅ 완료 | 6페이지 + 시스템 |
| 0 | 프로젝트 셋업 | ✅ 완료 | Next.js 16 + Tailwind v4 + pnpm |
| 1 | 디자인 시스템 + 공통 컴포넌트 | ✅ 완료 | Header, Footer, Toast, ImageLightbox 등 18개 컴포넌트 |
| 2 | 페이지 퍼블리싱 | 🔄 진행중 | About 완료, Sustainability ESG 콘텐츠 반영 작업 중 |
| 3 | 기능 구현 | ⬜ 대기 | |
| 4 | 테스트 + QA | ⬜ 대기 | |
| 5 | 최적화 + 배포 | ⬜ 대기 | |

> 상태: ✅ 완료 / 🔄 진행중 / ⬜ 대기 / ⚠️ 블로킹

---

## 3. Phase 타임라인

```
Phase 0 ██░░░░░░░░░░░░░░░░░░  0.5주  프로젝트 셋업
Phase 1 ░░██████░░░░░░░░░░░░  1주    공통 컴포넌트
Phase 2 ░░░░░░░░████████████  2주    페이지 퍼블리싱
Phase 3 ░░░░░░░░░░░░░░░░██░░  0.5주  기능 구현
Phase 4 ░░░░░░░░░░░░░░░░░░██  0.5주  테스트 + QA
Phase 5 ░░░░░░░░░░░░░░░░░░░█  0.5주  최적화 + 배포
        ─────────────────────
        총 약 5주 (기획서 5.5주 중 문서 작성 0.5주 완료)
```

### 주요 마일스톤

| 마일스톤 | 시점 | 설명 |
|----------|------|------|
| M1: 프로젝트 부트스트랩 | Phase 0 완료 | Vercel preview 배포 확인 |
| M2: 디자인 시스템 완성 | Phase 1 완료 | 공통 컴포넌트 스토리 확인 |
| M3: 전체 페이지 완성 | Phase 2 완료 | 6페이지 퍼블리싱 완료, 클라이언트 중간 시연 |
| M4: 기능 통합 완료 | Phase 3 완료 | 이메일, i18n, SEO 동작 확인 |
| M5: QA 통과 | Phase 4 완료 | Lighthouse 90+, 크로스 브라우저 통과 |
| M6: 최종 배포 | Phase 5 완료 | 프로덕션 배포 + 도메인 연결 |

### 의존 관계

```
Phase 0 → Phase 1 → Phase 2 → Phase 3
                                  ↓
                              Phase 4 → Phase 5
```

- Phase 2는 Phase 1 공통 컴포넌트에 의존
- Phase 3의 i18n 번역은 Phase 2 텍스트 확정 후 가능
- Phase 4 테스트는 Phase 3 기능 통합 후 시작
- 클라이언트 콘텐츠(사진, 텍스트)는 더미 데이터로 우선 개발, Phase 5 전까지 실제 콘텐츠로 교체

---

## 4. 클라이언트 제공물 추적

> 전체 항목 목록은 기획서 Section 6 참조. 아래는 추적 상태만 관리.

| 상태 | 항목 | 비고 |
|------|------|------|
| ⬜ | 로고 (PNG) | |
| ✅ | CEO 인사말 텍스트 | 사진 미사용 확정 (2026-03-22) |
| ✅ | 조직도 데이터 | 부서 구조만 수령, 인원수 미기재 (2026-03-22) |
| ✅ | 경영이념 콘텐츠 | 슬로건 + 핵심가치 3가지 수신 (2026-03-22) |
| ✅ | 주요 고객사 목록 | 7개사 명단 수신, 로고 미수령 (2026-03-22) |
| 🔄 | 설비 데이터 (14개 장비) | 스펙 8개 완성, 3개 부분, 3개 불충분. 사진 미수령. 클라이언트 확인 5건 대기 (2026-03-22) |
| ⬜ | 제품 사진 (방산/열교환기/기타) | |
| ✅ | ESG 콘텐츠 | ESG 텍스트 수신, 이미지 추후 제공, 인증 현황 제거 확정 (2026-03-22) |
| ⬜ | 회사 연락처 (주소/전화/팩스/이메일) | |
| ⬜ | 도메인 + Vercel 계정 + SMTP 설정 | |

> 상태: ⬜ 미요청 / 📨 요청완료 / ✅ 수신완료

---

## 5. 미결 사항 (TBD)

| No. | 항목 | 선택지 | 담당 | 상태 |
|-----|------|--------|------|------|
| 1 | 히어로 오버레이 텍스트 | A: "PRECISION MACHINING EXCELLENCE" / B: "We are one of best CNC,MCT machining field" (기획서 원문) | 클라이언트 | ⬜ 미결 |
| 2 | 회사 연혁 섹션 포함 여부 | 포함 / 미포함 | 클라이언트 | ⬜ 미결 |
| 3 | 문의 폼 파일 첨부 기능 | 포함 / 미포함 | 클라이언트 | ⬜ 미결 |
| 4 | 디자인 컨셉 최종 확정 | 기획서 Section 8 "미정" 상태 | 클라이언트 | ⬜ 미결 |
| 5 | 지도 서비스 선택 | Naver 지도 / Kakao 지도 | 개발자 | ⬜ 미결 |
| 6 | 이메일 발송 서비스 | Resend / Nodemailer + SMTP | 개발자 | ⬜ 미결 |
| 7 | eq-10: 명칭 불일치 | High Precision Lathe vs Engine Lathe | 클라이언트 | ⬜ 미결 |
| 8 | eq-11: 래디얼 드릴 교체 사진 | 슬라이드에 '사진수정 必' 표기 | 클라이언트 | ⬜ 미결 |
| 9 | eq-12: 5축 머시닝센터 배치 | 설비현황 vs 가공제품 + 장비 스펙 필요 | 클라이언트 | ⬜ 미결 |
| 10 | eq-13: SL 2500/3000 | 테이블 미등록, 수량·스펙 필요 | 클라이언트 | ⬜ 미결 |
| 11 | eq-14: VM960 | 테이블 미등록, 수량·스펙 필요 | 클라이언트 | ⬜ 미결 |
| 12 | 설비 카테고리 확장 | CNC/MCT → CNC/MCT/범용선반/기타 (4개 카테고리) | 개발자 | ✅ 완료 |

---

## 6. 리스크 관리

| 리스크 | 영향도 | 발생 가능성 | 대응 방안 |
|--------|--------|------------|-----------|
| 클라이언트 콘텐츠 지연 | 높음 | 높음 | 플레이스홀더 콘텐츠로 우선 개발, 실제 콘텐츠 수신 후 교체 |
| 배너 영상 품질 미달 | 중간 | 중간 | 포스터 이미지 대체안 준비, 전문가 외주 옵션 |
| 도메인 미보유 | 낮음 | 중간 | Vercel 기본 도메인으로 우선 배포, 도메인 구매 후 연결 |
| LCP 성능 목표 미달 | 중간 | 낮음 | 영상 포스터 전략, 이미지 최적화, 폰트 서브셋 |
| i18n 영문 번역 품질 | 낮음 | 중간 | 전문 번역 또는 AI 번역 + 네이티브 검수 |

---

## 7. 의사소통 계획

### 클라이언트 리뷰 포인트

| 시점 | 리뷰 내용 | 산출물 |
|------|-----------|--------|
| Phase 0 완료 후 | 디자인 컨셉 확정 | 디자인 문서 + 컬러/폰트 샘플 |
| Phase 2 중간 | 홈 + 회사소개 페이지 시연 | Vercel Preview URL |
| Phase 2 완료 후 | 전체 6페이지 시연 | Vercel Preview URL |
| Phase 4 완료 후 | 최종 QA 확인 | 테스트 결과 리포트 |
| Phase 5 | 최종 배포 승인 | 프로덕션 URL |

### 피드백 수집

- Vercel Preview 배포를 통한 실시간 확인
- 피드백은 문서(카카오톡/이메일)로 수집 후 정리
- 수정 범위가 큰 피드백은 일정 재협의

---

## 8. 콘텐츠 데이터 전략

### 원칙

- 모든 페이지 콘텐츠는 **JSON 파일**로 관리 (`src/data/`)
- 컴포넌트는 JSON 데이터를 import하여 렌더링 → **JSON만 교체하면 콘텐츠 즉시 반영**
- 개발 중에는 **더미 데이터**로 퍼블리싱, 클라이언트 콘텐츠 수신 후 JSON 교체

### 데이터 파일 구조

```
src/data/
├── company.json        # 회사 기본 정보
├── ceo.json            # CEO 인사말 (사진 미사용)
├── organization.json   # 조직도 (2단계: 부서→팀)
├── philosophy.json     # 경영이념 (슬로건 + 핵심가치 3가지)
├── clients.json        # 주요 고객사 (7개사)
├── equipment.json      # CNC/MCT 설비 목록 + 스펙
├── products.json       # 제품 갤러리 (카테고리별)
├── sustainability.json # ESG 소개 + E/S/G 방침
└── stats.json          # 홈 핵심 수치
```

### 파일별 스키마 요약

| 파일 | 주요 필드 | 사용 페이지 |
|------|-----------|------------|
| `company.json` | address, phone, fax, email, coordinates | Contact, Footer |
| `ceo.json` | name, title, greeting (highlight + body) | About |
| `organization.json` | departments[] (id, name, parent) — 2단계 계층 | About |
| `philosophy.json` | slogan, values[] (key, icon, title, subtitle, items[]) | About |
| `clients.json` | clients[] (id, name, logo) | About |
| `equipment.json` | cnc[], mct[], lathe[], other[] — 4개 카테고리, 총 14개 장비 | Equipment, Home |
| `products.json` | categories[] → items[] (image, category, alt) | Products, Home |
| `sustainability.json` | intro (vision, description), esg{e,s,g} (title, subtitle, description, icon, image, items[]) | Sustainability |
| `stats.json` | items[] (label, value, suffix) | Home |

### 콘텐츠 교체 프로세스

```
1. 클라이언트가 콘텐츠 제공 (사진 + 텍스트)
2. src/data/*.json 파일에 실제 데이터 입력
3. 이미지는 public/images/ 에 배치
4. 빌드 + 배포 → 즉시 반영
```

### i18n 연동

- JSON 데이터 중 UI 라벨/텍스트는 `messages/ko.json`, `messages/en.json`으로 관리
- 콘텐츠 데이터(CEO 인사말, ESG 텍스트 등)는 JSON 내에 `ko`/`en` 키로 다국어 값 포함

```jsonc
// 예: ceo.json
{
  "name": { "ko": "이설도", "en": "Seol-do Lee" },
  "greeting": {
    "highlight": { "ko": "...", "en": "..." },
    "body": { "ko": "...", "en": "..." }
  }
}
```
