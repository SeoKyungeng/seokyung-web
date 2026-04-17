import { defineField, defineType } from "sanity";

export const stats = defineType({
  name: "stats",
  title: "통계 지표 (Stats)",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "지표 목록",
      type: "array",
      of: [
        {
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "label", title: "라벨", type: "localizedString" }),
            defineField({
              name: "value",
              title: "수치 (숫자)",
              description: "숫자 카운트업이 없는 텍스트형이면 비워두세요.",
              type: "number",
            }),
            defineField({
              name: "text",
              title: "텍스트 (대체)",
              description: "value 대신 문자로 표시할 때 (예: '턴키 가공 전문')",
              type: "localizedString",
            }),
            defineField({ name: "prefix", title: "접두사", type: "localizedString" }),
            defineField({ name: "suffix", title: "접미사", type: "localizedString" }),
          ],
          preview: { select: { title: "label.ko", subtitle: "value" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "통계 지표" }) },
});
