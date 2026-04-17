/**
 * Sanity GROQ 쿼리 응답 타입.
 * queries.ts의 projection과 1:1 매핑. 스키마 변경 시 함께 업데이트.
 */

export type LocalizedText = { ko: string; en: string };

export type SanityEquipment = {
  id: string;
  type: "cnc" | "mct" | "lathe" | "other";
  name: LocalizedText;
  model: string | null;
  manufacturer: LocalizedText;
  quantity: number;
  photo: string | null;
  specs: Array<{ label: LocalizedText; value: string }> | null;
};

export type SanityProduct = {
  id: string;
  image: string | null;
  width: number | null;
  height: number | null;
  alt: LocalizedText;
};

export type SanityClient = {
  id: string;
  name: LocalizedText;
  logo: string | null;
};

export type SanityCompanyInfo = {
  name: LocalizedText;
  address: LocalizedText;
  phone: string;
  fax: string;
  email: string;
  coordinates: { lat: number; lng: number };
};

export type SanityCeo = {
  name: LocalizedText;
  title: LocalizedText;
  greeting: {
    highlight: LocalizedText;
    body: LocalizedText;
  };
};

export type SanityPhilosophyValue = {
  key: string;
  icon: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  items: LocalizedText[];
};

export type SanityPhilosophy = {
  slogan: LocalizedText;
  values: SanityPhilosophyValue[];
};

export type SanityDepartment = {
  id: string;
  name: LocalizedText;
  parent: string | null;
};

export type SanityOrganization = {
  departments: SanityDepartment[];
};

export type SanityEsgEntry = {
  key: "E" | "S" | "G";
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  icon: string;
  image: string | null;
  items: LocalizedText[];
};

export type SanitySustainability = {
  intro: {
    vision: LocalizedText;
    description: LocalizedText;
  };
  esg: {
    e: SanityEsgEntry;
    s: SanityEsgEntry;
    g: SanityEsgEntry;
  };
};

export type SanityStat = {
  label: LocalizedText;
  value: number | null;
  text: LocalizedText | null;
  prefix: LocalizedText | null;
  suffix: LocalizedText | null;
};

export type SanityStats = {
  items: SanityStat[];
};
