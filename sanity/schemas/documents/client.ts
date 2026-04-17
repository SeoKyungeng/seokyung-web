import { defineField, defineType } from "sanity";

export const client = defineType({
  name: "client",
  title: "고객사 (Clients)",
  type: "document",
  fields: [
    defineField({
      name: "clientId",
      title: "식별 ID",
      type: "string",
      validation: (r) => r.required().regex(/^[a-z0-9-]+$/),
    }),
    defineField({
      name: "name",
      title: "고객사명",
      type: "localizedString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logo",
      title: "로고",
      type: "image",
      options: { hotspot: false },
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
    select: { title: "name.ko", media: "logo" },
  },
});
