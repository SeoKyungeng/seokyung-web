import { defineField, defineType } from "sanity";

export const companyInfo = defineType({
  name: "companyInfo",
  title: "회사 정보 (Company Info)",
  type: "document",
  fields: [
    defineField({ name: "name", title: "회사명", type: "localizedString" }),
    defineField({ name: "address", title: "주소", type: "localizedString" }),
    defineField({ name: "phone", title: "전화", type: "string" }),
    defineField({ name: "fax", title: "팩스", type: "string" }),
    defineField({
      name: "email",
      title: "이메일",
      type: "string",
      validation: (r) => r.email(),
    }),
    defineField({
      name: "coordinates",
      title: "지도 좌표",
      type: "object",
      fields: [
        defineField({
          name: "lat",
          title: "위도",
          type: "number",
          validation: (r) => r.required().min(-90).max(90),
        }),
        defineField({
          name: "lng",
          title: "경도",
          type: "number",
          validation: (r) => r.required().min(-180).max(180),
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "회사 정보" }) },
});
