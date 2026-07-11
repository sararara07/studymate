import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

        {/* Logo */}

        <Link to="/" className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center">

            <BookOpen className="text-violet-600" size={24} />

          </div>

          <div>

            <h1 className="text-3xl font-bold text-[#6D5DF6]">
              StudyMate
            </h1>

            <p className="text-xs text-gray-500 -mt-1">
              AI Student Workspace
            </p>

          </div>

        </Link>

        {/* Right Buttons */}

        <div className="flex items-center gap-5">

          <Link
            to="/login"
            className="text-gray-700 font-medium hover:text-violet-600 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-[#6D5DF6] hover:bg-[#5d4cf0] text-white px-7 py-3 rounded-2xl font-semibold transition shadow-lg shadow-violet-200"
          >
            Get Started
          </Link>

        </div>

      </div>
    </motion.nav>
  );
}