import { motion } from "framer-motion";
import {
  CalendarDays,
  BrainCircuit,
  BookOpenCheck,
  ClipboardCheck,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export default function HeroDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-[36px] border border-gray-200 shadow-2xl overflow-hidden"
    >
      {/* Header */}

      <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold text-gray-900">
            StudyMate Workspace
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Everything you need to study — in one place.
          </p>

        </div>

        <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center">

          <Sparkles className="text-violet-600" />

        </div>

      </div>

      {/* Quick Stats */}

      <div className="grid grid-cols-2 gap-5 p-8">

        <Card
          icon={<BrainCircuit size={22} />}
          title="AI Notes"
          value="Generate"
          color="bg-violet-100 text-violet-600"
        />

        <Card
          icon={<BookOpenCheck size={22} />}
          title="Flashcards"
          value="Create"
          color="bg-blue-100 text-blue-600"
        />

        <Card
          icon={<ClipboardCheck size={22} />}
          title="Quiz"
          value="Practice"
          color="bg-emerald-100 text-emerald-600"
        />

        <Card
          icon={<CalendarDays size={22} />}
          title="Planner"
          value="Organize"
          color="bg-orange-100 text-orange-600"
        />

      </div>

      {/* AI Preview */}

      <div className="mx-8 bg-[#F8F9FC] rounded-3xl p-6">

        <div className="flex items-center gap-3">

          <BrainCircuit className="text-violet-600" />

          <h3 className="font-bold text-lg">
            AI Assistant
          </h3>

        </div>

        <div className="mt-6 space-y-4">

          <div className="bg-violet-100 rounded-2xl px-5 py-4 ml-auto w-[82%]">
            Summarize my DBMS notes.
          </div>

          <div className="bg-white rounded-2xl px-5 py-4 shadow-sm leading-7 text-gray-600">
            Sure! I'll generate:
            <br />
            • Summary
            <br />
            • Important Points
            <br />
            • Flashcards
            <br />
            • Possible Exam Questions
          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="p-8">

        <div className="rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-500 p-6 text-white">

          <div className="flex justify-between items-center">

            <div>

              <p className="opacity-80 text-sm">
                Ready to begin?
              </p>

              <h3 className="text-2xl font-bold mt-2">
                Upload your first notes
              </h3>

            </div>

            <ArrowUpRight size={32} />

          </div>

          <button className="mt-6 bg-white text-violet-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">

            Start Learning

          </button>

        </div>

      </div>

    </motion.div>
  );
}

function Card({ icon, title, value, color }) {
  return (
    <div className="bg-[#F8F9FC] rounded-3xl p-5 hover:shadow-lg transition">

      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>

        {icon}

      </div>

      <p className="text-gray-500 text-sm mt-5">
        {title}
      </p>

      <h3 className="text-xl font-bold mt-1 text-gray-900">
        {value}
      </h3>

      <div className="flex items-center gap-2 mt-5 text-emerald-600 text-sm">

        <CheckCircle2 size={16} />

        Available

      </div>

    </div>
  );
}