export interface LocalizedText {
  ko: string;
  en: string;
}

export interface Company {
  name: LocalizedText;
  address: LocalizedText;
  phone: string;
  fax: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface CEO {
  name: LocalizedText;
  title: LocalizedText;
  greeting: {
    highlight: LocalizedText;
    body: LocalizedText;
  };
}

export interface Department {
  id: string;
  name: LocalizedText;
  parent: string | null;
}

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

export interface EquipmentSpec {
  label: LocalizedText;
  value: string;
}

export interface EquipmentItem {
  id: string;
  type: "cnc" | "mct";
  model: string;
  manufacturer: LocalizedText;
  quantity: number;
  photo: string;
  specs: EquipmentSpec[];
}

export interface ProductItem {
  id: string;
  category: "defense" | "heat-exchanger" | "industrial";
  image: string;
  alt: LocalizedText;
}

export interface ESGPolicy {
  key: "E" | "S" | "G";
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  icon: string;
  image: string;
  items: LocalizedText[];
}

export interface Stat {
  label: LocalizedText;
  value: number;
  suffix: LocalizedText;
}
