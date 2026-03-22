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
  photo: string;
  greeting: {
    highlight: LocalizedText;
    body: LocalizedText;
  };
}

export interface Department {
  id: string;
  name: LocalizedText;
  parent: string | null;
  members: number;
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
  key: "e" | "s" | "g";
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
}

export interface Certification {
  id: string;
  name: LocalizedText;
  image: string;
}

export interface Stat {
  label: LocalizedText;
  value: number;
  suffix: LocalizedText;
}
