import { defineField, defineType } from "sanity";

const esgField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({
        name: "key",
        title: "키",
        type: "string",
        initialValue: name.toUpperCase(),
      }),
      defineField({ name: "title", title: "제목", type: "localizedString" }),
      defineField({
        name: "subtitle",
        title: "서브 타이틀",
        type: "localizedString",
      }),
      defineField({
        name: "description",
        title: "설명",
        type: "localizedText",
      }),
      defineField({
        name: "icon",
        title: "아이콘 이름",
        type: "string",
        description: "lucide-react 아이콘명 (예: Leaf, Users, Shield)",
      }),
      defineField({
        name: "image",
        title: "대표 이미지",
        type: "image",
        options: { hotspot: true },
      }),
      defineField({
        name: "items",
        title: "세부 항목",
        type: "array",
        of: [{ type: "localizedString" }],
      }),
    ],
  });

export const sustainability = defineType({
  name: "sustainability",
  title: "지속가능경영 (ESG)",
  type: "document",
  fields: [
    defineField({
      name: "intro",
      title: "인트로",
      type: "object",
      fields: [
        defineField({ name: "vision", title: "비전", type: "localizedText" }),
        defineField({
          name: "description",
          title: "설명",
          type: "localizedText",
        }),
      ],
    }),
    esgField("e", "Environment (환경)"),
    esgField("s", "Social (사회)"),
    esgField("g", "Governance (지배구조)"),
  ],
  preview: { prepare: () => ({ title: "지속가능경영 (ESG)" }) },
});
