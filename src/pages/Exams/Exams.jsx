import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CalendarPlus,
  Clock3,
  MailCheck,
  Trash2,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";
import { supabase } from "../../lib/supabase";
import { sendExamReminder } from "../../lib/resend";
import { addExam, deleteExam, getExams } from "../../services/examService";

function getDaysLeft(date) {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const examDay = new Date(`${date}T00:00:00`);
  return Math.ceil((examDay - startOfToday) / (1000 * 60 * 60 * 24));
}

function formatExamDate(date) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function getCountdownLabel(days) {
  if (days < 0) return "Completed";
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `${days} days left`;
}

export default function Exams() {
  const [exams, setExams] = useState([]);
  const [subject, setSubject] = useState("");
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sendingId, setSendingId] = useState(null);

  async function loadPage() {
    try {
      const [examData, authResult] = await Promise.all([
        getExams(),
        supabase.auth.getUser(),
      ]);
      setExams(examData);
      setUser(authResult.data.user);
    } catch (error) {
      console.error("Could not load exams:", error);
      toast.error("Couldn't load your exams.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPage();
  }, []);

  async function handleAdd(event) {
    event.preventDefault();

    if (!subject.trim() || !examName.trim() || !examDate) {
      toast.error("Add a subject, exam name, and date.");
      return;
    }

    try {
      await addExam(subject.trim(), examName.trim(), examDate);
      setSubject("");
      setExamName("");
      setExamDate("");
      await loadPage();
      toast.success("Exam added to your plan.");
    } catch (error) {
      console.error("Could not add exam:", error);
      toast.error("Couldn't add this exam.");
    }
  }

  async function handleDelete(id) {
    try {
      await deleteExam(id);
      setExams((currentExams) => currentExams.filter((exam) => exam.id !== id));
      toast.success("Exam removed.");
    } catch (error) {
      console.error("Could not delete exam:", error);
      toast.error("Couldn't remove this exam.");
    }
  }

  async function handleReminder(exam) {
    const currentUser = user || (await supabase.auth.getUser()).data.user;

    if (!currentUser?.email) {
      toast.error("Your account needs an email address before reminders can be sent.");
      return;
    }

    setSendingId(exam.id);
    try {
      await sendExamReminder({
        name: currentUser.user_metadata?.full_name || "Student",
        email: currentUser.email,
        subject: exam.subject,
        examName: exam.exam_name,
        examDate: exam.exam_date,
      });
      toast.success(`Reminder sent to ${currentUser.email}`);
    } catch (error) {
      console.error("Failed to send exam reminder:", error);
      toast.error(error.message || "Unable to send the reminder.");
    } finally {
      setSendingId(null);
    }
  }

  const upcomingCount = exams.filter((exam) => getDaysLeft(exam.exam_date) >= 0).length;
  const nextExam = exams.find((exam) => getDaysLeft(exam.exam_date) >= 0);

  return (
    <DashboardLayout>
      <Toaster position="top-right" />

      <div className="mx-auto max-w-6xl space-y-8 pb-10">
        <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-600 p-7 text-white shadow-xl shadow-violet-200 sm:p-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium">
                <CalendarDays size={16} /> Exam planner
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Stay ahead of every exam.</h1>
              <p className="mt-3 text-violet-100">Plan deadlines in one place and send a polished reminder straight to your signed-in email.</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-sm">
              <p className="text-sm text-violet-100">Reminders are sent to</p>
              <p className="mt-1 max-w-64 truncate font-semibold">{user?.email || "your account email"}</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Scheduled exams</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{exams.length}</p>
          </div>
          <div className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Upcoming</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{upcomingCount}</p>
          </div>
          <div className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Next exam</p>
            <p className="mt-2 truncate text-lg font-bold text-slate-900">{nextExam?.exam_name || "Nothing planned"}</p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-violet-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-violet-100 p-3 text-violet-700"><CalendarPlus size={22} /></div>
            <div><h2 className="text-xl font-bold text-slate-900">Add an exam</h2><p className="text-sm text-slate-500">Keep your revision schedule current.</p></div>
          </div>
          <form onSubmit={handleAdd} className="grid gap-4 md:grid-cols-[1fr_1fr_180px_auto]">
            <input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Subject" className="rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100" />
            <input value={examName} onChange={(event) => setExamName(event.target.value)} placeholder="Exam name" className="rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100" />
            <input type="date" value={examDate} onChange={(event) => setExamDate(event.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100" />
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700"><CalendarPlus size={18} /> Add exam</button>
          </form>
        </section>

        <section>
          <div className="mb-5 flex items-center justify-between"><div><h2 className="text-2xl font-bold text-slate-900">Your exam schedule</h2><p className="mt-1 text-slate-500">Send a reminder whenever you need a study nudge.</p></div></div>
          {loading ? <div className="rounded-3xl bg-white p-12 text-center text-slate-500 shadow-sm">Loading your exams…</div> : exams.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-violet-200 bg-violet-50/60 p-14 text-center"><CalendarDays className="mx-auto text-violet-500" size={48} /><h3 className="mt-4 text-xl font-bold text-slate-900">Your schedule is clear</h3><p className="mt-2 text-slate-500">Add your first exam above to start planning.</p></div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-2">
              {exams.map((exam) => {
                const days = getDaysLeft(exam.exam_date);
                const isComplete = days < 0;
                return <article key={exam.id} className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="flex justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-wider text-violet-600">{exam.subject}</p><h3 className="mt-2 text-2xl font-bold text-slate-900">{exam.exam_name}</h3></div><button onClick={() => handleDelete(exam.id)} aria-label={`Delete ${exam.exam_name}`} className="h-10 rounded-xl p-2.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600"><Trash2 size={19} /></button></div>
                  <div className="mt-6 flex items-center gap-3 text-slate-600"><div className="rounded-xl bg-slate-100 p-2.5"><CalendarDays size={18} /></div><span className="font-medium">{formatExamDate(exam.exam_date)}</span></div>
                  <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-100 pt-5"><span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${isComplete ? "bg-slate-100 text-slate-500" : days <= 7 ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}><Clock3 size={15} />{getCountdownLabel(days)}</span><button disabled={sendingId === exam.id || isComplete} onClick={() => handleReminder(exam)} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50">{sendingId === exam.id ? "Sending…" : <><MailCheck size={17} /> Send reminder <ArrowUpRight size={15} /></>}</button></div>
                </article>;
              })}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
