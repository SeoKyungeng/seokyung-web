import { defineField, defineType } from "sanity";

export const ceo = defineType({
  name: "ceo",
  title: "대표이사 인사말 (CEO)",
  type: "document",
  fields: [
    defineField({ name: "name", title: "대표 이름", type: "localizedString" }),
    defineField({ name: "title", title: "직함", type: "localizedString" }),
    defineField({
      name: "greeting",
      title: "인사말",
      type: "object",
      fields: [
        defineField({
          name: "highlight",
          title: "강조 문구",
          type: "localizedString",
        }),
        defineField({
          name: "body",
          title: "본문 (줄바꿈 유지)",
          type: "localizedText",
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "대표이사 인사말" }) },
});
