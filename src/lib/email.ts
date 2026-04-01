import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import type { ContactFormData } from "@/lib/schemas/contact";

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (transporter) return transporter;

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error(
      `SMTP 환경 변수 누락: ${[!user && "SMTP_USER", !pass && "SMTP_PASS"].filter(Boolean).join(", ")}`,
    );
  }

  transporter = nodemailer.createTransport({
    host: "smtp.naver.com",
    port: 465,
    secure: true,
    auth: { user, pass },
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 5000,
  });

  return transporter;
}

function buildHtml(data: ContactFormData): string {
  const rows = [
    { label: "회사명", value: data.company },
    { label: "담당자명", value: data.person },
    { label: "연락처", value: data.phone },
    { label: "이메일", value: data.email },
    { label: "문의내용", value: data.message.replace(/\n/g, "<br />") },
  ];

  return `<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:24px;font-family:-apple-system,sans-serif;background:#f5f5f5">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden">
    <tr>
      <td style="background:#0f172a;padding:24px 32px">
        <h1 style="margin:0;color:#22d3ee;font-size:18px">새로운 문의가 접수되었습니다</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 32px">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${rows
            .map(
              ({ label, value }) => `
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;width:100px;vertical-align:top">${label}</td>
            <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;font-size:14px;color:#111827">${value}</td>
          </tr>`,
            )
            .join("")}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 32px;background:#f9fafb;color:#9ca3af;font-size:12px">
        (주)서경엔지니어링 홈페이지 문의 폼에서 발송된 메일입니다.
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const t = getTransporter();
  const user = process.env.SMTP_USER!;

  await t.sendMail({
    from: user,
    to: user,
    replyTo: data.email,
    subject: `[서경엔지니어링] ${data.company} 문의`,
    html: buildHtml(data),
  });
}
