import { askGroq } from "../lib/groq";

export async function generateSummary(notes) {
  return await askGroq(`
Summarize these study notes in simple language.

${notes}
`);
}

export async function generateKeyPoints(notes) {
  return await askGroq(`
Extract important key points.

Return only bullet points.

${notes}
`);
}

export async function generateFlashcards(notes) {
  return await askGroq(`
Generate exactly 10 flashcards.

Return ONLY valid JSON.

Format:

[
  {
    "question":"...",
    "answer":"..."
  }
]

${notes}
`);
}

export async function generateQuiz(notes) {
  return await askGroq(`
Generate exactly 10 multiple-choice questions.

VERY IMPORTANT:

Return ONLY valid JSON.

Do NOT include markdown.

Do NOT include explanations.

Each question must have exactly 4 options.

The answer MUST be the FULL TEXT of the correct option.

Example:

[
  {
    "question":"Which language is used for web pages?",
    "options":[
      "HTML",
      "Python",
      "Java",
      "C++"
    ],
    "answer":"HTML"
  }
]

Generate ONLY the JSON.

Study Notes:

${notes}
`);
}