"use server";

import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";
import { sendContactEmail } from "@/lib/email";

export type ContactActionResult =
  | { success: true }
  | {
      success: false;
      error: "VALIDATION_ERROR" | "SEND_FAILED" | "UNKNOWN_ERROR";
      fieldErrors?: Record<string, string[]>;
    };

export async function submitContactForm(
  data: ContactFormData,
): Promise<ContactActionResult> {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as string;
      if (!fieldErrors[key]) fieldErrors[key] = [];
      fieldErrors[key].push(issue.message);
    }
    return { success: false, error: "VALIDATION_ERROR", fieldErrors };
  }

  // TODO: Rate limiting (봇 스팸 방지)

  try {
    await sendContactEmail(parsed.data);
  } catch (error) {
    console.error("[Contact] 이메일 발송 실패:", error);
    return { success: false, error: "SEND_FAILED" };
  }

  return { success: true };
}
