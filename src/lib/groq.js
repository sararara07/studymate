// In development this goes through Vite's proxy, avoiding a separate browser
// connection to port 5000. Set VITE_API_URL to your deployed backend URL.
const API_URL = import.meta.env.VITE_API_URL || "/api";

export async function askGroq(prompt) {
  let response;
  try {
    response = await fetch(`${API_URL}/ai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
  } catch {
    throw new Error("Couldn't reach the AI server. Start the app with npm run dev and try again.");
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `Groq request failed (${response.status}).`);
  }

  return data.content;
}
