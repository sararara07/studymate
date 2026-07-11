import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const resendApiKey = process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;
const resendFrom = process.env.RESEND_FROM_EMAIL || "StudyMate <onboarding@resend.dev>";
const resend = resendApiKey ? new Resend(resendApiKey) : null;

app.use(cors());
app.use(express.json({ limit: "100kb" }));

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

function ensureEmailIsConfigured(req, res, next) {
  if (!resend) {
    return res.status(500).json({ error: "Email service is not configured. Add RESEND_API_KEY to server/.env." });
  }

  if (!isEmail(req.body?.email)) {
    return res.status(400).json({ error: "A valid recipient email address is required." });
  }

  next();
}

function emailLayout(content) {
  return `<!doctype html>
  <html><body style="margin:0;background:#f5f3ff;font-family:Arial,sans-serif;color:#1e1b4b">
    <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 12px 32px rgba(76,29,149,.12)">
      <div style="padding:28px 36px;background:linear-gradient(135deg,#6d28d9,#4338ca);color:#ffffff">
        <div style="font-size:22px;font-weight:700">StudyMate</div>
        <div style="margin-top:6px;color:#ddd6fe;font-size:14px">Your focused study companion</div>
      </div>
      <div style="padding:36px">${content}</div>
      <div style="padding:20px 36px;background:#fafafa;color:#64748b;font-size:12px">This reminder was requested from your StudyMate exam planner.</div>
    </div>
  </body></html>`;
}

async function sendEmail({ to, subject, html }) {
  const { data, error } = await resend.emails.send({ from: resendFrom, to, subject, html });
  if (error) throw new Error(error.message || "Resend rejected the email.");
  return data;
}

app.get("/health", (_req, res) => {
  res.json({ emailConfigured: Boolean(resend), sender: resendFrom });
});

app.post("/welcome", ensureEmailIsConfigured, async (req, res) => {
  try {
    const name = escapeHtml(req.body.name || "Student");
    const data = await sendEmail({
      to: req.body.email.trim(),
      subject: `Welcome to StudyMate, ${req.body.name || "Student"}!`,
      html: emailLayout(`<h1 style="margin:0;font-size:28px">Welcome, ${name}!</h1><p style="margin:16px 0 0;line-height:1.6;color:#475569">Your StudyMate account is ready. Organize your notes, create revision material, and keep every exam in view.</p>`),
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Welcome email error:", error);
    res.status(502).json({ error: error.message || "Unable to send the welcome email." });
  }
});

app.post("/exam", ensureEmailIsConfigured, async (req, res) => {
  try {
    const name = escapeHtml(req.body.name || "Student");
    const subject = escapeHtml(req.body.subject || "Your subject");
    const examName = escapeHtml(req.body.examName || "Exam");
    const examDate = escapeHtml(req.body.examDate || "Not specified");
    const daysLeft = Number(req.body.daysLeft);
    const countdown = Number.isFinite(daysLeft) ? (daysLeft === 0 ? "Today" : daysLeft === 1 ? "Tomorrow" : `${daysLeft} days remaining`) : "Review your schedule";
    const data = await sendEmail({
      to: req.body.email.trim(),
      subject: `Exam reminder: ${req.body.examName || "your upcoming exam"}`,
      html: emailLayout(`<p style="margin:0;color:#6d28d9;font-weight:700;letter-spacing:.08em;text-transform:uppercase;font-size:12px">Exam reminder</p><h1 style="margin:12px 0 0;font-size:28px">You've got this, ${name}.</h1><p style="margin:14px 0 26px;line-height:1.6;color:#475569">Here is a quick reminder for your upcoming exam.</p><div style="border:1px solid #ede9fe;border-radius:16px;padding:20px;background:#fafaff"><p style="margin:0 0 14px;color:#64748b;font-size:13px">SUBJECT</p><p style="margin:0 0 20px;font-weight:700;font-size:18px">${subject}</p><p style="margin:0 0 14px;color:#64748b;font-size:13px">EXAM</p><p style="margin:0 0 20px;font-weight:700;font-size:18px">${examName}</p><p style="margin:0;color:#64748b;font-size:13px">DATE</p><p style="margin:0;font-weight:700;font-size:18px">${examDate}</p></div><p style="margin:24px 0 0;color:#4338ca;font-weight:700">${countdown}</p>`),
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Exam reminder error:", error);
    res.status(502).json({ error: error.message || "Unable to send the exam reminder." });
  }
});

app.listen(port, () => {
  console.log(`StudyMate email server listening on port ${port}`);
});
