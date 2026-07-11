import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import AIWorkspace from "../pages/AIWorkspace/AIWorkspace";
import Flashcards from "../pages/Flashcards/Flashcards";
import Quiz from "../pages/Quiz/Quiz";
import Todos from "../pages/Todos/Todos";
import Diary from "../pages/Diary/Diary";
import StickyNotes from "../pages/StickyNotes/StickyNotes";
import Exams from "../pages/Exams/Exams";
import Analytics from "../pages/Analytics/Analytics";
import SettingsPage from "../pages/Settings/Settings";

export default function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* App Routes */}

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/ai" element={<AIWorkspace />} />

        <Route path="/decks" element={<Flashcards />} />

        <Route path="/quiz" element={<Quiz />} />

        <Route path="/todos" element={<Todos />} />

        <Route path="/diary" element={<Diary />} />

        <Route path="/sticky-notes" element={<StickyNotes />} />

        <Route path="/exams" element={<Exams />} />

        <Route path="/analytics" element={<Analytics />} />

        <Route path="/settings" element={<SettingsPage />} />

      </Routes>

    </BrowserRouter>
  );
}