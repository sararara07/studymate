import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";

import {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
} from "../../services/todoService";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadTodos() {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTodos();
  }, []);

  async function handleAdd() {
    if (!task.trim()) return;

    try {
      await addTodo(task);
      setTask("");
      loadTodos();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleToggle(todo) {
    try {
      await toggleTodo(todo.id, todo.completed);
      loadTodos();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTodo(id);
      loadTodos();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <DashboardLayout>
      {/* Header */}

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Study Tasks
        </h1>

        <p className="text-gray-500 mt-2">
          Organize your daily study schedule.
        </p>
      </div>

      {/* Add Task */}

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-violet-100 mb-8">

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Enter a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 border border-violet-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-violet-400"
          />

          <button
            onClick={handleAdd}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 rounded-2xl flex items-center gap-2 transition"
          >
            <Plus size={20} />
            Add
          </button>

        </div>

      </div>

      {/* Todo List */}

      <div className="bg-white rounded-3xl shadow-sm border border-violet-100 overflow-hidden">

        {loading ? (

          <div className="p-10 text-center text-gray-500">
            Loading...
          </div>

        ) : todos.length === 0 ? (

          <div className="p-16 text-center">

            <CheckCircle2
              size={60}
              className="mx-auto text-violet-500"
            />

            <h2 className="text-2xl font-semibold mt-6">
              No Tasks Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Add your first study task.
            </p>

          </div>

        ) : (

          <div>

            {todos.map((todo) => (

              <div
                key={todo.id}
                className="flex items-center justify-between px-6 py-5 border-b last:border-none"
              >

                <div className="flex items-center gap-4">

                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo)}
                    className="w-5 h-5 accent-violet-600"
                  />

                  <span
                    className={`text-lg ${
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {todo.title}
                  </span>

                </div>

                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={22} />
                </button>

              </div>

            ))}

          </div>

        )}

      </div>
    </DashboardLayout>
  );
}