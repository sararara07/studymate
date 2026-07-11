import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Brain, CalendarDays, CheckCircle2, CheckSquare, GraduationCap, ImagePlus, Sparkles } from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { supabase } from "../../lib/supabase";
import { getAnalytics } from "../../services/analyticsService";
import { getExams } from "../../services/examService";
import { getTodos } from "../../services/todoService";

function daysUntil(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((new Date(`${date}T00:00:00`) - today) / 86400000);
}

function dateLabel(date) {
  return new Intl.DateTimeFormat("en", { day: "numeric", month: "short" }).format(new Date(`${date}T00:00:00`));
}

export default function Dashboard() {
  const [data, setData] = useState({ stats: null, exams: [], todos: [], user: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [stats, exams, todos, auth] = await Promise.all([getAnalytics(), getExams(), getTodos(), supabase.auth.getUser()]);
        setData({ stats, exams, todos, user: auth.data.user });
      } catch (error) {
        console.error("Dashboard data could not load:", error);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  const { stats, exams, todos, user } = data;
  const upcomingExam = exams.find((exam) => daysUntil(exam.exam_date) >= 0);
  const openTodos = todos.filter((todo) => !todo.completed);
  const completedRate = stats?.totalTodos ? Math.round((stats.completedTodos / stats.totalTodos) * 100) : 0;
  const name = user?.user_metadata?.full_name?.split(" ")[0] || "Student";
  const today = new Intl.DateTimeFormat("en", { weekday: "long", day: "numeric", month: "long" }).format(new Date());
  const metrics = [
    { label: "Flashcards", value: stats?.totalFlashcards ?? "—", icon: BookOpen, color: "text-[#7C3AED]", surface: "bg-[#F3E8FF]" },
    { label: "Open tasks", value: openTodos.length, icon: CheckSquare, color: "text-[#22C55E]", surface: "bg-green-50" },
    { label: "Exams planned", value: stats?.totalExams ?? "—", icon: GraduationCap, color: "text-[#F97316]", surface: "bg-orange-50" },
    { label: "Task progress", value: `${completedRate}%`, icon: CheckCircle2, color: "text-[#3B82F6]", surface: "bg-blue-50" },
  ];

  return <DashboardLayout><div className="mx-auto max-w-7xl space-y-8 pb-10">
    <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold text-[#7C3AED]">{today}</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Good to see you, {name}.</h1><p className="mt-2 text-gray-500">Here’s a clear view of what needs your attention.</p></div><Link to="/ai" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7C3AED] px-5 py-3 font-semibold text-white transition hover:bg-[#6D28D9]"><Sparkles size={18} /> Study with AI</Link></header>

    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{metrics.map(({ label, value, icon: Icon, color, surface }) => <div key={label} className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm"><div className={`inline-flex rounded-xl p-3 ${surface} ${color}`}><Icon size={21} /></div><p className="mt-5 text-sm font-medium text-gray-500">{label}</p><p className="mt-1 text-3xl font-bold text-gray-900">{loading ? "…" : value}</p></div>)}</section>

    <section className="grid gap-6 xl:grid-cols-[1.35fr_.85fr]"><div className="rounded-[2rem] border border-violet-100 bg-[#F8F5FF] p-7 shadow-sm sm:p-8"><div className="flex items-start justify-between gap-4"><div><div className="inline-flex rounded-xl bg-white p-3 text-[#7C3AED] shadow-sm"><CalendarDays size={22} /></div><p className="mt-5 text-sm font-semibold uppercase tracking-wider text-[#7C3AED]">Next milestone</p><h2 className="mt-2 text-2xl font-bold text-gray-900">{upcomingExam ? upcomingExam.exam_name : "Your schedule is open"}</h2><p className="mt-2 max-w-md text-gray-500">{upcomingExam ? `${upcomingExam.subject} · ${dateLabel(upcomingExam.exam_date)} · ${daysUntil(upcomingExam.exam_date) === 0 ? "Today" : `${daysUntil(upcomingExam.exam_date)} days to prepare`}` : "Add an exam and StudyMate will keep your revision plan visible."}</p></div><div className="rounded-2xl bg-white px-4 py-3 text-center shadow-sm"><p className="text-xs font-semibold text-gray-500">{upcomingExam ? "DAYS LEFT" : "PLANNER"}</p><p className="mt-1 text-xl font-bold text-[#7C3AED]">{upcomingExam ? Math.max(0, daysUntil(upcomingExam.exam_date)) : "Ready"}</p></div></div><Link to="/exams" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#7C3AED] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#6D28D9]">Open exam planner <ArrowRight size={16} /></Link></div>
      <div className="rounded-[2rem] border border-violet-100 bg-white p-7 shadow-sm"><div className="flex items-center justify-between"><div><h2 className="text-xl font-bold text-gray-900">Today’s focus</h2><p className="mt-1 text-sm text-gray-500">Your next study tasks.</p></div><Link to="/todos" className="text-sm font-semibold text-[#7C3AED] hover:text-[#6D28D9]">View all</Link></div><div className="mt-5 space-y-3">{loading ? <p className="py-7 text-center text-gray-500">Loading tasks…</p> : openTodos.slice(0, 3).map((todo) => <div key={todo.id} className="flex items-center gap-3 rounded-xl bg-[#F8F5FF] p-3"><span className="h-5 w-5 rounded-full border-2 border-[#7C3AED]" /><span className="truncate text-sm font-medium text-gray-700">{todo.title}</span></div>)}{!loading && openTodos.length === 0 && <div className="rounded-xl bg-green-50 p-5 text-center"><CheckCircle2 className="mx-auto text-[#22C55E]" size={24} /><p className="mt-2 text-sm font-semibold text-gray-700">You’re all caught up.</p></div>}</div></div></section>

    <section><div className="mb-5"><h2 className="text-2xl font-bold text-gray-900">Continue studying</h2><p className="mt-1 text-gray-500">Jump back into the tools that move your study plan forward.</p></div><div className="grid gap-4 md:grid-cols-3"><Link to="/ai" className="group rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"><div className="inline-flex rounded-xl bg-[#F3E8FF] p-3 text-[#7C3AED]"><ImagePlus size={22} /></div><h3 className="mt-5 text-lg font-bold text-gray-900">Study from an image</h3><p className="mt-2 text-sm leading-6 text-gray-500">Extract notes from an image and turn them into useful revision material.</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#7C3AED]">Open AI workspace <ArrowRight size={15} /></span></Link><Link to="/decks" className="group rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"><div className="inline-flex rounded-xl bg-green-50 p-3 text-[#22C55E]"><BookOpen size={22} /></div><h3 className="mt-5 text-lg font-bold text-gray-900">Review flashcards</h3><p className="mt-2 text-sm leading-6 text-gray-500">Keep your recall sharp with your saved flashcard decks.</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#22C55E]">Open flashcards <ArrowRight size={15} /></span></Link><Link to="/quiz" className="group rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"><div className="inline-flex rounded-xl bg-orange-50 p-3 text-[#F97316]"><Brain size={22} /></div><h3 className="mt-5 text-lg font-bold text-gray-900">Take a quiz</h3><p className="mt-2 text-sm leading-6 text-gray-500">Test your understanding with questions generated from your notes.</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#F97316]">Open quizzes <ArrowRight size={15} /></span></Link></div></section>
  </div></DashboardLayout>;
}
