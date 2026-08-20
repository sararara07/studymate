const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function askGroq(prompt) {
  const response = await fetch(`${API_URL}/ai`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `Groq request failed (${response.status}).`);
  }

  return data.content;
}
