import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { BookMarked, Plus, Trash2, CalendarDays } from "lucide-react";

import {
  getDiaryEntries,
  addDiaryEntry,
  deleteDiaryEntry,
} from "../../services/diaryService";

export default function Diary() {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadEntries() {
    try {
      const data = await getDiaryEntries();
      setEntries(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEntries();
  }, []);

  async function handleAdd() {
    if (!title.trim() || !content.trim()) return;

    try {
      await addDiaryEntry(title, content);

      setTitle("");
      setContent("");

      loadEntries();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteDiaryEntry(id);
      loadEntries();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <DashboardLayout>

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-gray-900">
          Study Diary
        </h1>

        <p className="text-gray-500 mt-2">
          Record your daily study journey.
        </p>

      </div>

      {/* Add Entry */}

      <div className="bg-white rounded-3xl border border-violet-100 shadow-sm p-6 mb-8">

        <input
          type="text"
          placeholder="Entry title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-violet-200 rounded-xl px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-violet-400"
        />

        <textarea
          rows={6}
          placeholder="Write about today's study..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-violet-200 rounded-xl px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-violet-400"
        />

        <button
          onClick={handleAdd}
          className="mt-5 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
        >
          <Plus size={18} />
          Save Entry
        </button>

      </div>

      {/* Entries */}

      {loading ? (

        <div className="text-center py-12 text-gray-500">
          Loading...
        </div>

      ) : entries.length === 0 ? (

        <div className="bg-white rounded-3xl border border-violet-100 p-16 text-center shadow-sm">

          <BookMarked
            size={60}
            className="mx-auto text-violet-500"
          />

          <h2 className="text-2xl font-semibold mt-6">
            No Diary Entries Yet
          </h2>

          <p className="text-gray-500 mt-3">
            Write your first study diary entry.
          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {entries.map((entry) => (

            <div
              key={entry.id}
              className="bg-white rounded-3xl border border-violet-100 shadow-sm p-6"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-2xl font-bold">
                    {entry.title}
                  </h2>

                  <div className="flex items-center gap-2 mt-2 text-gray-500">

                    <CalendarDays size={16} />

                    <span>
                      {new Date(entry.created_at).toLocaleDateString()}
                    </span>

                  </div>

                </div>

                <button
                  onClick={() => handleDelete(entry.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={22} />
                </button>

              </div>

              <p className="mt-6 whitespace-pre-wrap leading-7 text-gray-700">
                {entry.content}
              </p>

            </div>

          ))}

        </div>

      )}

    </DashboardLayout>
  );
}