import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "가공 제품 (Products)",
  type: "document",
  fields: [
    defineField({
      name: "productId",
      title: "식별 ID",
      type: "string",
      validation: (r) => r.required().regex(/^[a-z0-9-]+$/),
    }),
    defineField({
      name: "category",
      title: "카테고리",
      type: "string",
      options: {
        list: [
          { title: "방산 (Defense)", value: "defense" },
          { title: "열교환기 (Heat Exchanger)", value: "heat-exchanger" },
          { title: "산업용 (Industrial)", value: "industrial" },
        ],
      },
    }),
    defineField({
      name: "image",
      title: "이미지",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "alt",
      title: "대체 텍스트 (접근성)",
      type: "localizedString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "정렬 순서",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "정렬 순서",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "alt.ko", media: "image", subtitle: "category" },
  },
});
