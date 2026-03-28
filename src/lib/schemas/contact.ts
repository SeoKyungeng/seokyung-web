import { z } from "zod";

/** 클라이언트/서버 스키마 간 검증 수치 동기화를 위한 상수 */
const baseRules = {
  company: { min: 2, max: 50 },
  person: { min: 2, max: 20 },
  message: { min: 10, max: 2000 },
  phonePattern: /^0\d{1,2}-?\d{3,4}-?\d{4}$/,
} as const;

/** 서버용 순수 스키마 (i18n 무의존) */
export const contactSchema = z.object({
  company: z.string().trim().min(baseRules.company.min).max(baseRules.company.max),
  person: z.string().trim().min(baseRules.person.min).max(baseRules.person.max),
  phone: z.string().trim().regex(baseRules.phonePattern),
  email: z.string().trim().email(),
  message: z
    .string()
    .trim()
    .min(baseRules.message.min)
    .max(baseRules.message.max),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/** 클라이언트용 팩토리 (i18n 에러 메시지 포함) */
export function createContactSchema(t: (key: string) => string) {
  return z.object({
    company: z
      .string()
      .trim()
      .min(1, t("companyRequired"))
      .min(baseRules.company.min, t("companyLength"))
      .max(baseRules.company.max, t("companyLength")),
    person: z
      .string()
      .trim()
      .min(1, t("personRequired"))
      .min(baseRules.person.min, t("personLength"))
      .max(baseRules.person.max, t("personLength")),
    phone: z
      .string()
      .trim()
      .min(1, t("phoneRequired"))
      .regex(baseRules.phonePattern, t("phoneFormat")),
    email: z
      .string()
      .trim()
      .min(1, t("emailRequired"))
      .email(t("emailFormat")),
    message: z
      .string()
      .trim()
      .min(1, t("messageRequired"))
      .min(baseRules.message.min, t("messageLength"))
      .max(baseRules.message.max, t("messageMaxLength")),
  });
}
