import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { BookOpen, Plus, Trash2 } from "lucide-react";

import {
  getFlashcards,
  addFlashcard,
  deleteFlashcard,
} from "../../services/flashcardService";

export default function Flashcards() {
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadCards() {
    try {
      const data = await getFlashcards();
      setCards(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCards();
  }, []);

  async function handleAdd() {
    if (!deck || !question || !answer) return;

    await addFlashcard(deck, question, answer);

    setDeck("");
    setQuestion("");
    setAnswer("");

    loadCards();
  }

  async function handleDelete(id) {
    await deleteFlashcard(id);
    loadCards();
  }

  return (
    <DashboardLayout>

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          Flashcards
        </h1>

        <p className="text-gray-500 mt-2">
          Create your own flashcards or generate them with AI.
        </p>

      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-violet-100 mb-8">

        <input
          placeholder="Deck Name"
          value={deck}
          onChange={(e) => setDeck(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 mb-4"
        />

        <textarea
          placeholder="Question"
          rows={3}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 mb-4"
        />

        <textarea
          placeholder="Answer"
          rows={3}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full border rounded-xl px-4 py-3"
        />

        <button
          onClick={handleAdd}
          className="mt-5 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl flex gap-2 items-center"
        >
          <Plus size={18} />
          Add Flashcard
        </button>

      </div>

      {loading ? (
        <div className="text-center py-10">
          Loading...
        </div>
      ) : cards.length === 0 ? (
        <div className="bg-white rounded-3xl border border-violet-100 p-16 text-center">

          <BookOpen
            size={60}
            className="mx-auto text-violet-500"
          />

          <h2 className="text-2xl font-semibold mt-5">
            No Flashcards Yet
          </h2>

          <p className="text-gray-500 mt-3">
            Create your first flashcard.
          </p>

        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">

          {cards.map((card) => (

            <div
              key={card.id}
              className="bg-white rounded-3xl border border-violet-100 p-6 shadow-sm"
            >

              <h2 className="text-xl font-bold">
                {card.deck_name}
              </h2>

              <div className="mt-5">

                <p className="font-semibold text-violet-600">
                  Question
                </p>

                <p>{card.question}</p>

              </div>

              <div className="mt-5">

                <p className="font-semibold text-green-600">
                  Answer
                </p>

                <p>{card.answer}</p>

              </div>

              <button
                onClick={() => handleDelete(card.id)}
                className="mt-6 text-red-500 flex items-center gap-2"
              >
                <Trash2 size={18} />
                Delete
              </button>

            </div>

          ))}

        </div>
      )}

    </DashboardLayout>
  );
}