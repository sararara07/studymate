import { BookOpen, Mail, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">

      <div className="max-w-7xl mx-auto px-8 py-16">

        <div className="grid lg:grid-cols-3 gap-12">

          {/* Logo */}

          <div>

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center">

                <BookOpen className="text-violet-600" />

              </div>

              <div>

                <h2 className="text-3xl font-bold text-[#6D5DF6]">
                  StudyMate
                </h2>

                <p className="text-sm text-gray-500">
                  AI Student Workspace
                </p>

              </div>

            </div>

            <p className="text-gray-500 mt-6 leading-8 max-w-md">

              StudyMate helps students organize their
              studies using Artificial Intelligence,
              smart notes, flashcards, quizzes,
              analytics and productivity tools.

            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="font-bold text-xl text-gray-900 mb-6">
              Quick Links
            </h3>

            <div className="space-y-4">

              <Link
                to="/login"
                className="block text-gray-500 hover:text-violet-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="block text-gray-500 hover:text-violet-600 transition"
              >
                Register
              </Link>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="font-bold text-xl text-gray-900 mb-6">
              Contact
            </h3>

            <div className="space-y-5">

              <div className="flex items-center gap-3">

                <Mail
                  size={18}
                  className="text-violet-600"
                />

                <span className="text-gray-500">
                  support@studymate.app
                </span>

              </div>

            </div>

          </div>

        </div>

        <div className="border-t border-gray-200 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-gray-500">

            © {new Date().getFullYear()} StudyMate.
            All rights reserved.

          </p>

          <div className="flex items-center gap-2 text-gray-500">

            Built with

            <Heart
              size={16}
              className="text-red-500 fill-red-500"
            />

            React • Supabase • Groq AI

          </div>

        </div>

      </div>

    </footer>
  );
}