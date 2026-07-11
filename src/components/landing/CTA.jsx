import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="py-32">

      <div className="max-w-6xl mx-auto px-8">

        <div className="rounded-[40px] bg-gradient-to-r from-[#6D5DF6] to-[#8D84FF] p-16 text-center text-white shadow-2xl">

          <h2 className="text-5xl font-bold">

            Ready to Study Smarter?

          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-violet-100 leading-8">

            Join StudyMate today and let AI help you
            summarize notes, generate quizzes,
            build flashcards and achieve your goals.

          </p>

          <Link
            to="/register"
            className="inline-flex mt-10 bg-white text-[#6D5DF6] px-8 py-4 rounded-2xl font-semibold items-center gap-2 hover:scale-105 transition"
          >

            Get Started Free

            <ArrowRight size={18} />

          </Link>

        </div>

      </div>

    </section>
  );
}