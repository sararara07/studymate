const API_URL = "https://api.groq.com/openai/v1/chat/completions";

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export async function askGroq(prompt) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5,
    }),
  });

  if (!response.ok) {
    throw new Error("Groq request failed");
  }

  const data = await response.json();

  return data.choices[0].message.content;
}