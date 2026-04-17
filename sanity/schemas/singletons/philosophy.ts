import { defineField, defineType } from "sanity";

export const philosophy = defineType({
  name: "philosophy",
  title: "경영 철학 (Philosophy)",
  type: "document",
  fields: [
    defineField({ name: "slogan", title: "슬로건", type: "localizedText" }),
    defineField({
      name: "values",
      title: "핵심 가치",
      type: "array",
      of: [
        {
          type: "object",
          name: "value",
          fields: [
            defineField({
              name: "key",
              title: "키 (고유값)",
              type: "string",
              description: "customer / quality / people 등",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "icon",
              title: "아이콘 이름",
              description: "lucide-react 아이콘명 (예: Users, ShieldCheck, Heart)",
              type: "string",
            }),
            defineField({ name: "title", title: "제목", type: "localizedString" }),
            defineField({
              name: "subtitle",
              title: "서브 타이틀",
              type: "localizedString",
            }),
            defineField({
              name: "items",
              title: "하위 항목",
              type: "array",
              of: [{ type: "localizedText" }],
            }),
          ],
          preview: { select: { title: "title.ko", subtitle: "subtitle.ko" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "경영 철학" }) },
});
