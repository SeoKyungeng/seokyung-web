import { defineField, defineType } from "sanity";

export const equipment = defineType({
  name: "equipment",
  title: "설비 (Equipment)",
  type: "document",
  fields: [
    defineField({
      name: "equipmentId",
      title: "식별 ID",
      description: "기존 JSON의 id와 매칭 (예: eq-01). 영문/숫자/하이픈만 사용.",
      type: "string",
      validation: (r) => r.required().regex(/^[a-z0-9-]+$/),
    }),
    defineField({
      name: "category",
      title: "카테고리",
      type: "string",
      options: {
        list: [
          { title: "CNC", value: "cnc" },
          { title: "MCT (머시닝센터)", value: "mct" },
          { title: "선반 (Lathe)", value: "lathe" },
          { title: "기타", value: "other" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "name",
      title: "설비명",
      type: "localizedString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "model",
      title: "모델명",
      description: "번역 없이 그대로 표시 (예: L400-LC). 없으면 비워두세요.",
      type: "string",
    }),
    defineField({
      name: "manufacturer",
      title: "제조사",
      type: "localizedString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "quantity",
      title: "보유 수량",
      type: "number",
      validation: (r) => r.required().integer().min(1),
      initialValue: 1,
    }),
    defineField({
      name: "photo",
      title: "사진",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "specs",
      title: "스펙 목록",
      type: "array",
      of: [
        {
          type: "object",
          name: "spec",
          fields: [
            defineField({
              name: "label",
              title: "항목명",
              type: "localizedString",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "value",
              title: "값",
              description: "언어 무관 공통 값 (예: 1100mm, FANUC 0i-TD)",
              type: "string",
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: "label.ko", subtitle: "value" },
          },
        },
      ],
    }),
    defineField({
      name: "order",
      title: "정렬 순서",
      description: "작은 숫자가 먼저 표시됩니다.",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "정렬 순서 (오름차순)",
      name: "orderAsc",
      by: [
        { field: "category", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "name.ko",
      subtitle: "model",
      media: "photo",
      category: "category",
    },
    prepare({ title, subtitle, media, category }) {
      const cat = (category as string)?.toUpperCase();
      return {
        title: `[${cat}] ${title}`,
        subtitle,
        media,
      };
    },
  },
});
