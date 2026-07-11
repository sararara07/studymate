import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, CheckCircle2, ChevronRight, Info, LogOut, Mail, ShieldCheck, User } from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { supabase } from "../../lib/supabase";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }
    loadUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  const initials = (user?.user_metadata?.full_name || user?.email || "S").slice(0, 1).toUpperCase();
  return <DashboardLayout><div className="mx-auto max-w-5xl space-y-7 pb-10"><header><p className="text-sm font-semibold text-[#7C3AED]">ACCOUNT</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Settings</h1><p className="mt-2 text-gray-500">Manage your account and how StudyMate supports your revision.</p></header>
    <section className="overflow-hidden rounded-[2rem] border border-violet-100 bg-white shadow-sm"><div className="bg-[#F8F5FF] p-6 sm:p-8"><div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center"><div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7C3AED] text-2xl font-bold text-white shadow-lg shadow-violet-200">{initials}</div><div><h2 className="text-2xl font-bold text-gray-900">{user?.user_metadata?.full_name || "Student"}</h2><p className="mt-1 text-gray-500">Your StudyMate profile</p></div><div className="sm:ml-auto"><span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-semibold text-[#22C55E]"><CheckCircle2 size={16} /> Active account</span></div></div></div><div className="grid divide-y divide-violet-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0"><div className="p-6"><div className="flex items-center gap-3 text-[#7C3AED]"><User size={19} /><span className="text-sm font-semibold">DISPLAY NAME</span></div><p className="mt-3 font-medium text-gray-900">{user?.user_metadata?.full_name || "Student"}</p></div><div className="p-6"><div className="flex items-center gap-3 text-[#7C3AED]"><Mail size={19} /><span className="text-sm font-semibold">ACCOUNT EMAIL</span></div><p className="mt-3 break-all font-medium text-gray-900">{user?.email || "Loading…"}</p></div></div></section>
    <section className="rounded-[2rem] border border-violet-100 bg-white p-6 shadow-sm sm:p-8"><h2 className="text-xl font-bold text-gray-900">Study preferences</h2><p className="mt-1 text-sm text-gray-500">Your important study features, all in one place.</p><div className="mt-6 divide-y divide-gray-100"><div className="flex items-center gap-4 py-4"><div className="rounded-xl bg-[#F3E8FF] p-3 text-[#7C3AED]"><Bell size={20} /></div><div className="flex-1"><h3 className="font-semibold text-gray-900">Exam reminders</h3><p className="mt-1 text-sm text-gray-500">Send exam reminders to your account email from the exam planner.</p></div><span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-[#22C55E]">READY</span></div><div className="flex items-center gap-4 py-4"><div className="rounded-xl bg-blue-50 p-3 text-[#3B82F6]"><ShieldCheck size={20} /></div><div className="flex-1"><h3 className="font-semibold text-gray-900">Secure account</h3><p className="mt-1 text-sm text-gray-500">Your study content is linked to your signed-in account.</p></div><ChevronRight className="text-gray-400" size={20} /></div></div></section>
    <section className="rounded-[2rem] border border-violet-100 bg-white p-6 shadow-sm sm:p-8"><div className="flex gap-4"><div className="rounded-xl bg-orange-50 p-3 text-[#F97316]"><Info size={20} /></div><div><h2 className="text-xl font-bold text-gray-900">About StudyMate</h2><p className="mt-2 max-w-2xl leading-7 text-gray-500">StudyMate brings your notes, AI-powered revision tools, tasks, flashcards, quizzes, and exam planning into one calm study space.</p></div></div></section>
    <button onClick={handleLogout} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#EF4444] py-4 font-semibold text-white transition hover:bg-red-600"><LogOut size={19} /> Sign out of StudyMate</button>
  </div></DashboardLayout>;
}
