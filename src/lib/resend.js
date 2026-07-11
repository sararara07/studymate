const API = import.meta.env.VITE_EMAIL_API_URL || "http://localhost:5000";

async function postEmail(path, body, fallbackMessage) {
  let response;

  try {
    response = await fetch(`${API}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Couldn't reach the email server. Run npm run dev and try again.");
    }
    throw error;
  }

  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || fallbackMessage);
  return result;
}

export async function sendWelcomeEmail(name, email) {
  return postEmail("/welcome", { name, email }, "Failed to send welcome email.");
}

export async function sendExamReminder({
  name,
  email,
  subject,
  examName,
  examDate,
}) {
  const today = new Date();
  const exam = new Date(examDate);

  const daysLeft = Math.ceil(
    (exam - today) / (1000 * 60 * 60 * 24)
  );

  return postEmail(
    "/exam",
    { name, email, subject, examName, examDate, daysLeft },
    "Failed to send exam reminder."
  );
}
