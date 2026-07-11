import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  StickyNote,
  Plus,
  Trash2,
  Search,
  Pin,
  Pencil,
} from "lucide-react";

import {
  getNotes,
  addNote,
  deleteNote,
  togglePin,
  updateNote,
} from "../../services/stickyService";

const COLORS = [
  "#EDE9FE",
  "#DBEAFE",
  "#DCFCE7",
  "#FEF9C3",
  "#FCE7F3",
  "#FED7AA",
];

export default function StickyNotes() {
  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("new");

  const [selectedColor, setSelectedColor] =
    useState(COLORS[0]);

  const [editing, setEditing] = useState(null);

  const [loading, setLoading] = useState(true);

  async function loadNotes() {
    try {
      const data = await getNotes();
      setNotes(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function handleSave() {
    if (!title.trim() || !content.trim()) return;

    if (editing) {
      await updateNote(
        editing,
        title,
        content,
        selectedColor
      );

      setEditing(null);
    } else {
      await addNote(
        title,
        content,
        selectedColor
      );
    }

    setTitle("");
    setContent("");
    setSelectedColor(COLORS[0]);

    loadNotes();
  }

  async function handleDelete(id) {
    await deleteNote(id);
    loadNotes();
  }

  async function handlePin(note) {
    await togglePin(note.id, note.pinned);
    loadNotes();
  }

  function editNote(note) {
    setEditing(note.id);
    setTitle(note.title);
    setContent(note.content);
    setSelectedColor(note.color);
  }

  const filteredNotes = useMemo(() => {
    let data = [...notes];

    data = data.filter(
      (note) =>
        note.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        note.content
          .toLowerCase()
          .includes(search.toLowerCase())
    );

    if (sort === "old") {
      data.reverse();
    }

    return data;
  }, [notes, search, sort]);

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Sticky Notes
          </h1>

          <p className="text-gray-500 mt-2">
            Organize quick ideas and reminders.
          </p>

        </div>

      </div>

      <div className="bg-white rounded-3xl p-6 border border-violet-100 shadow-sm mb-8">

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="Title"
          className="w-full border rounded-xl px-4 py-3 mb-4"
        />

        <textarea
          rows={4}
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          placeholder="Write your note..."
          className="w-full border rounded-xl px-4 py-3 resize-none"
        />

        <div className="flex gap-3 mt-5">

          {COLORS.map((color) => (

            <button
              key={color}
              onClick={() =>
                setSelectedColor(color)
              }
              className={`w-9 h-9 rounded-full border-2 ${
                selectedColor === color
                  ? "border-black"
                  : "border-transparent"
              }`}
              style={{
                backgroundColor: color,
              }}
            />

          ))}

        </div>

        <div className="flex gap-4 mt-6">

          <button
            onClick={handleSave}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >

            <Plus size={18} />

            {editing
              ? "Update Note"
              : "Add Note"}

          </button>

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-3 top-4 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search notes..."
              className="w-full border rounded-xl pl-10 pr-4 py-3"
            />

          </div>

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="border rounded-xl px-4"
          >
            <option value="new">
              Newest
            </option>

            <option value="old">
              Oldest
            </option>

          </select>

        </div>

      </div>
            {loading ? (

        <div className="text-center py-16 text-gray-500">
          Loading...
        </div>

      ) : filteredNotes.length === 0 ? (

        <div className="bg-white rounded-3xl p-16 text-center border border-violet-100 shadow-sm">

          <StickyNote
            size={60}
            className="mx-auto text-violet-500"
          />

          <h2 className="text-2xl font-semibold mt-5">
            No Notes Found
          </h2>

          <p className="text-gray-500 mt-3">
            Create your first sticky note or try a different search.
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredNotes.map((note) => (

            <div
              key={note.id}
              style={{
                backgroundColor: note.color || "#EDE9FE",
              }}
              className="rounded-3xl p-6 shadow-sm hover:shadow-lg transition duration-300 relative group"
            >

              {/* Pin */}

              <button
                onClick={() => handlePin(note)}
                className={`absolute top-4 left-4 transition ${
                  note.pinned
                    ? "text-violet-700"
                    : "text-gray-400 hover:text-violet-600"
                }`}
              >
                <Pin
                  size={18}
                  fill={note.pinned ? "currentColor" : "none"}
                />
              </button>

              {/* Delete */}

              <button
                onClick={() => handleDelete(note.id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
              >
                <Trash2 size={18} />
              </button>

              {/* Edit */}

              <button
                onClick={() => editNote(note)}
                className="absolute top-12 right-4 text-blue-500 hover:text-blue-700 transition"
              >
                <Pencil size={18} />
              </button>

              <div className="pt-6">

                <h2 className="text-xl font-bold break-words">
                  {note.title}
                </h2>

                <p className="mt-4 text-gray-700 whitespace-pre-wrap leading-7 break-words">
                  {note.content}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </DashboardLayout>
  );
}