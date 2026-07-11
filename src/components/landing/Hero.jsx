import { motion } from "framer-motion";
import {
  ArrowRight,
  LogIn,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import HeroDashboard from "./HeroDashboard";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F8F9FC]">

      {/* Background */}
      <div className="absolute -top-32 -left-24 w-[450px] h-[450px] rounded-full bg-violet-200/40 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-indigo-100 blur-[130px]" />

      <div className="max-w-7xl mx-auto px-8 min-h-[88vh] flex flex-col lg:flex-row items-center justify-between gap-16">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
          className="flex-1"
        >

          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full font-semibold text-sm">

            ✨ AI Powered Student Workspace

          </div>

          <h1 className="mt-8 text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900">

            One Place

            <span className="text-[#6D5DF6]">

              {" "}For Every

            </span>

            <br />

            Student.

          </h1>

          <p className="mt-8 text-lg text-gray-600 leading-9 max-w-xl">

            Upload notes, generate summaries,
            flashcards, quizzes and revision plans,
            manage your daily tasks, monitor your
            progress and prepare smarter with AI.

          </p>

          <div className="grid grid-cols-2 gap-4 mt-10 max-w-xl">

            <Feature text="AI Notes Generator" />
            <Feature text="Groq Vision OCR" />
            <Feature text="Flashcards" />
            <Feature text="Quiz Generator" />
            <Feature text="Study Analytics" />
            <Feature text="Diary" />
            <Feature text="Sticky Notes" />
            <Feature text="Exam Planner" />

          </div>

          <div className="mt-10 p-6 bg-white rounded-3xl border border-violet-100 shadow-sm max-w-xl">

            <p className="text-gray-600 leading-8">

              StudyMate combines AI learning,
              productivity tools and analytics into
              one beautiful workspace designed for
              students.

            </p>

          </div>

          <div className="flex flex-wrap gap-5 mt-10">

            <Link
              to="/register"
              className="bg-[#6D5DF6] hover:bg-[#5E4CE4] transition text-white px-8 py-4 rounded-2xl flex items-center gap-2 shadow-xl shadow-violet-200"
            >

              Get Started

              <ArrowRight size={18} />

            </Link>

            <Link
              to="/login"
              className="bg-white border border-gray-200 hover:shadow-lg transition px-8 py-4 rounded-2xl flex items-center gap-2"
            >

              <LogIn size={18} />

              Sign In

            </Link>

          </div>

        </motion.div>

        {/* Right */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          className="flex-1"
        >

          <HeroDashboard />

        </motion.div>

      </div>

    </section>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3">

      <CheckCircle2
        size={20}
        className="text-emerald-500"
      />

      <span className="text-gray-700">

        {text}

      </span>

    </div>
  );
}