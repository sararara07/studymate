import { Resend } from "resend";

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#039;",
    '"': "&quot;",
  }[character]));
}

function isEmail(value) {
  return /^\S+@\S+\.\S+$/.test(String(value || ""));
}

function emailLayout(content) {
  return `<!doctype html><html><body style="margin:0;background:#f5f3ff;font-family:Arial,sans-serif;color:#1e1b4b"><div style="max-width:600px;margin:32px auto;background:#fff;border-radius:24px;overflow:hidden"><div style="padding:28px 36px;background:#6d28d9;color:#fff"><strong style="font-size:22px">StudyMate</strong><div style="margin-top:6px;color:#ddd6fe;font-size:14px">Your focused study companion</div></div><div style="padding:36px">${content}</div></div></body></html>`;
}

export async function sendStudyMateEmail({ to, subject, content }) {
  if (!isEmail(to)) throw new Error("A valid recipient email address is required.");

  const apiKey = process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;
  if (!apiKey) throw new Error("Email service is not configured. Add RESEND_API_KEY in Vercel project settings.");

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "StudyMate <onboarding@resend.dev>",
    to: to.trim(),
    subject,
    html: emailLayout(content),
  });
  if (error) throw new Error(error.message || "Resend rejected the email.");
  return data;
}

export { escapeHtml };
