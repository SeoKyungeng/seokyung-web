<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-03-22 | Updated: 2026-03-22 -->

# data

## Purpose
콘텐츠 데이터 JSON 파일. 현재 더미 데이터, 실제 콘텐츠 수령 시 교체 예정.

## Key Files

| File | Description |
|------|-------------|
| `company.json` | 회사 정보 (이름, 주소, 연락처, 좌표) |
| `ceo.json` | CEO 인사말 (사진, 인사말 텍스트) |
| `organization.json` | 조직도 (부서 트리) |
| `equipment.json` | CNC/MCT 설비 목록 (모델, 제조사, 스펙) |
| `products.json` | 가공제품 목록 (카테고리, 이미지) |
| `sustainability.json` | ESG 정책 및 인증 현황 |
| `stats.json` | 핵심 수치 (설비 수, 납품 건수 등) |

## For AI Agents

### Working In This Directory
- 모든 텍스트 필드는 `{ ko: "...", en: "..." }` LocalizedText 패턴
- 타입 정의: `src/lib/types.ts`
- JSON 교체만으로 사이트 콘텐츠 변경 가능하도록 설계

<!-- MANUAL: -->
