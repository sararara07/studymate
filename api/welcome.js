import { escapeHtml, sendStudyMateEmail } from "./_email.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    const name = escapeHtml(req.body?.name || "Student");
    const data = await sendStudyMateEmail({
      to: req.body?.email,
      subject: `Welcome to StudyMate, ${req.body?.name || "Student"}!`,
      content: `<h1 style="margin:0;font-size:28px">Welcome, ${name}!</h1><p style="margin:16px 0 0;line-height:1.6;color:#475569">Your StudyMate account is ready. Organize your notes, create revision material, and keep every exam in view.</p>`,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error("Welcome email error:", error);
    return res.status(502).json({ error: error.message || "Unable to send the welcome email." });
  }
}
