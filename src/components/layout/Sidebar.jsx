import {
  LayoutDashboard,
  Sparkles,
  BookOpen,
  Brain,
  CheckSquare,
  BookMarked,
  StickyNote,
  CalendarDays,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";

export default function Sidebar() {
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutUser();
    navigate("/");
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive
        ? "bg-[#F3E8FF] text-[#7C3AED] font-semibold"
        : "text-gray-600 hover:bg-[#F8F5FF] hover:text-[#7C3AED]"
    }`;

  return (
    <aside className="w-72 bg-white border-r border-violet-100 h-screen sticky top-0 flex flex-col">

      {/* Logo */}

      <div className="p-8 border-b border-violet-100">

        <h1 className="text-3xl font-bold text-[#7C3AED]">
          StudyMate
        </h1>

        <p className="text-gray-500 mt-1">
          AI Student Companion
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 p-5 space-y-2">

        <NavLink to="/dashboard" className={linkClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/ai" className={linkClass}>
          <Sparkles size={20} />
          AI Workspace
        </NavLink>

        <NavLink to="/decks" className={linkClass}>
          <BookOpen size={20} />
          Flashcards
        </NavLink>

        <NavLink to="/quiz" className={linkClass}>
          <Brain size={20} />
          Quiz
        </NavLink>

        <NavLink to="/todos" className={linkClass}>
          <CheckSquare size={20} />
          Todos
        </NavLink>

        <NavLink to="/diary" className={linkClass}>
          <BookMarked size={20} />
          Diary
        </NavLink>

        <NavLink to="/sticky-notes" className={linkClass}>
          <StickyNote size={20} />
          Sticky Notes
        </NavLink>

        <NavLink to="/exams" className={linkClass}>
          <CalendarDays size={20} />
          Exams
        </NavLink>

        <NavLink to="/analytics" className={linkClass}>
          <BarChart3 size={20} />
          Analytics
        </NavLink>

        <NavLink to="/settings" className={linkClass}>
          <Settings size={20} />
          Settings
        </NavLink>

      </nav>

      {/* Logout */}

      <div className="p-5 border-t border-violet-100">

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-3 rounded-xl transition"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
}
