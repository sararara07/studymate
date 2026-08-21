import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  CheckCircle2,
  BookOpen,
  BookMarked,
  CalendarDays,
} from "lucide-react";

import { getAnalytics } from "../../services/analyticsService";

export default function Analytics() {
  const [stats, setStats] = useState(null);

  async function loadStats() {
    try {
      const data = await getAnalytics();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  if (!stats) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          Track your study progress.
        </p>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-3xl border border-violet-100 shadow-sm p-6">

          <CheckCircle2
            size={45}
            className="text-violet-600"
          />

          <h2 className="text-4xl font-bold mt-5">
            {stats.completedTodos}
          </h2>

          <p className="text-gray-500 mt-2">
            Completed Tasks
          </p>

        </div>

        <div className="bg-white rounded-3xl border border-violet-100 shadow-sm p-6">

          <BookOpen
            size={45}
            className="text-violet-600"
          />

          <h2 className="text-4xl font-bold mt-5">
            {stats.totalFlashcards}
          </h2>

          <p className="text-gray-500 mt-2">
            Flashcards
          </p>

        </div>

        <div className="bg-white rounded-3xl border border-violet-100 shadow-sm p-6">

          <BookMarked
            size={45}
            className="text-violet-600"
          />

          <h2 className="text-4xl font-bold mt-5">
            {stats.totalDiary}
          </h2>

          <p className="text-gray-500 mt-2">
            Diary Entries
          </p>

        </div>

        <div className="bg-white rounded-3xl border border-violet-100 shadow-sm p-6">

          <CalendarDays
            size={45}
            className="text-violet-600"
          />

          <h2 className="text-4xl font-bold mt-5">
            {stats.totalExams}
          </h2>

          <p className="text-gray-500 mt-2">
            Upcoming Exams
          </p>

        </div>

      </div>

      <div className="bg-white rounded-3xl border border-violet-100 shadow-sm mt-8 p-8">

        <h2 className="text-2xl font-bold">
          Study Progress
        </h2>

        <div className="mt-6">

          <div className="flex justify-between mb-2">

            <span>Task Completion</span>

            <span>
              {stats.completedTodos} / {stats.totalTodos}
            </span>

          </div>

          <div className="w-full bg-violet-100 rounded-full h-4">

            <div
              className="bg-violet-600 h-4 rounded-full"
              style={{
                width:
                  stats.totalTodos === 0
                    ? "0%"
                    : `${
                        (stats.completedTodos /
                          stats.totalTodos) *
                        100
                      }%`,
              }}
            />

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}
