const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "openai/gpt-oss-20b";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const prompt = String(req.body?.prompt || "").trim();
  if (!prompt) return res.status(400).json({ error: "A prompt is required." });
  if (prompt.length > 50_000) {
    return res.status(400).json({ error: "The study notes are too long. Please use 50,000 characters or fewer." });
  }

  const apiKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "AI service is not configured. Add GROQ_API_KEY in Vercel project settings." });
  }

  try {
    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || DEFAULT_MODEL,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5,
      }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      return res.status(response.status).json({ error: payload?.error?.message || "Groq could not process this request." });
    }

    const content = payload?.choices?.[0]?.message?.content;
    if (!content) return res.status(502).json({ error: "Groq returned an empty response." });
    return res.status(200).json({ content });
  } catch (error) {
    console.error("Groq serverless function error:", error);
    return res.status(502).json({ error: "Unable to reach Groq. Please try again." });
  }
}
