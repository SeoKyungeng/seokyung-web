import type { Locale } from "@/i18n/routing";

/** 검색 노출 타깃 키워드 — metadata.keywords 및 JSON-LD knowsAbout에 사용 */
export const SEO_KEYWORDS: Record<Locale, string[]> = {
  ko: [
    "중대형 임가공",
    "플랜트 설비 제작",
    "자동화 라인 제작",
    "금속탱크 가공",
    "CNC 가공",
    "MCT 가공",
    "정밀 가공",
    "방산 부품 가공",
    "열교환기 부품",
    "산업기계 부품",
  ],
  en: [
    "large-scale contract machining",
    "plant equipment fabrication",
    "automation line manufacturing",
    "metal tank fabrication",
    "CNC machining",
    "MCT machining",
    "precision machining",
    "defense parts machining",
    "heat exchanger parts",
    "industrial machinery parts",
  ],
};

/** 핵심 서비스 — JSON-LD makesOffer(Service)에 사용 */
export const SEO_SERVICES: Record<Locale, string[]> = {
  ko: ["중대형 임가공", "플랜트 설비 제작", "자동화 라인 제작", "금속탱크 가공"],
  en: [
    "Large-scale contract machining",
    "Plant equipment fabrication",
    "Automation line manufacturing",
    "Metal tank fabrication",
  ],
};
