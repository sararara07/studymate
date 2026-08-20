import { escapeHtml, sendStudyMateEmail } from "./_email.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    const name = escapeHtml(req.body?.name || "Student");
    const subject = escapeHtml(req.body?.subject || "Your subject");
    const examName = escapeHtml(req.body?.examName || "Exam");
    const examDate = escapeHtml(req.body?.examDate || "Not specified");
    const daysLeft = Number(req.body?.daysLeft);
    const countdown = Number.isFinite(daysLeft) ? (daysLeft === 0 ? "Today" : daysLeft === 1 ? "Tomorrow" : `${daysLeft} days remaining`) : "Review your schedule";
    const data = await sendStudyMateEmail({
      to: req.body?.email,
      subject: `Exam reminder: ${req.body?.examName || "your upcoming exam"}`,
      content: `<p style="margin:0;color:#6d28d9;font-weight:700">EXAM REMINDER</p><h1 style="margin:12px 0 0;font-size:28px">You've got this, ${name}.</h1><p style="line-height:1.6;color:#475569">${subject}: <strong>${examName}</strong> on ${examDate}.</p><p style="color:#4338ca;font-weight:700">${countdown}</p>`,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error("Exam reminder error:", error);
    return res.status(502).json({ error: error.message || "Unable to send the exam reminder." });
  }
}
