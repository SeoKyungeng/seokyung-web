import { defineQuery } from "next-sanity";

/** 공통: Sanity 이미지 → 직접 CDN URL 문자열로 변환 */
const image = (field: string) => `"${field}": ${field}.asset->url`;

export const equipmentListQuery = defineQuery(`
  *[_type == "equipment"] | order(order asc) {
    "id": equipmentId,
    "type": category,
    name,
    model,
    manufacturer,
    quantity,
    ${image("photo")},
    specs[]{ label, value }
  }
`);

export const productListQuery = defineQuery(`
  *[_type == "product"] | order(order asc) {
    "id": productId,
    "image": image.asset->url,
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height,
    alt
  }
`);

export const clientListQuery = defineQuery(`
  *[_type == "client"] | order(order asc) {
    "id": clientId,
    name,
    ${image("logo")}
  }
`);

export const companyInfoQuery = defineQuery(`
  *[_type == "companyInfo"][0]{
    name, address, phone, fax, email, coordinates
  }
`);

export const ceoQuery = defineQuery(`
  *[_type == "ceo"][0]{
    name, title, greeting
  }
`);

export const philosophyQuery = defineQuery(`
  *[_type == "philosophy"][0]{
    slogan,
    values[]{ key, icon, title, subtitle, items }
  }
`);

export const organizationQuery = defineQuery(`
  *[_type == "organization"][0]{
    "departments": departments[]{
      "id": deptId,
      name,
      parent
    }
  }
`);

export const sustainabilityQuery = defineQuery(`
  *[_type == "sustainability"][0]{
    intro{ vision, description },
    "esg": {
      "e": e{ key, title, subtitle, description, icon, ${image("image")}, items },
      "s": s{ key, title, subtitle, description, icon, ${image("image")}, items },
      "g": g{ key, title, subtitle, description, icon, ${image("image")}, items }
    }
  }
`);

export const statsQuery = defineQuery(`
  *[_type == "stats"][0]{
    items[]{ label, value, text, prefix, suffix }
  }
`);
