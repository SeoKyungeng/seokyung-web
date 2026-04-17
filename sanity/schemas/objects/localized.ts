import { defineField, defineType } from "sanity";

export const localizedString = defineType({
  name: "localizedString",
  title: "다국어 문자열",
  type: "object",
  fields: [
    defineField({
      name: "ko",
      title: "한국어",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "en",
      title: "English",
      type: "string",
      validation: (r) => r.required(),
    }),
  ],
  options: { columns: 2 },
});

export const localizedText = defineType({
  name: "localizedText",
  title: "다국어 본문",
  type: "object",
  fields: [
    defineField({
      name: "ko",
      title: "한국어",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "en",
      title: "English",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
  ],
});
