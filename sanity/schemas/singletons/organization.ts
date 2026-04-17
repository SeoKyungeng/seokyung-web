import { defineField, defineType } from "sanity";

export const organization = defineType({
  name: "organization",
  title: "조직도 (Organization)",
  type: "document",
  fields: [
    defineField({
      name: "departments",
      title: "부서 목록",
      type: "array",
      of: [
        {
          type: "object",
          name: "department",
          fields: [
            defineField({
              name: "deptId",
              title: "부서 ID",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({ name: "name", title: "부서명", type: "localizedString" }),
            defineField({
              name: "parent",
              title: "상위 부서 ID",
              description: "최상위는 비워두세요. (예: ceo)",
              type: "string",
            }),
          ],
          preview: { select: { title: "name.ko", subtitle: "deptId" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "조직도" }) },
});
