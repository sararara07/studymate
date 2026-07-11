import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Can StudyMate read handwritten notes?",
    answer:
      "Yes. Groq Vision extracts text from handwritten notes, textbook images, PDFs and PPTs.",
  },
  {
    question: "Does it generate quizzes automatically?",
    answer:
      "Yes. AI creates MCQs, True/False, Fill in the Blanks, Short and Long Answer questions.",
  },
  {
    question: "Can I track my study progress?",
    answer:
      "Yes. StudyMate provides analytics including streaks, accuracy, heatmaps and subject-wise performance.",
  },
  {
    question: "Will my notes remain private?",
    answer:
      "Yes. Every user's data is secured using Supabase Authentication and Row Level Security.",
  },
];

export default function FAQ() {
  return (
    <section className="py-32 bg-[#F7F8FC]">

      <div className="max-w-5xl mx-auto px-8">

        <div className="text-center">

          <span className="bg-violet-100 text-violet-700 px-4 py-2 rounded-full font-semibold">
            FAQ
          </span>

          <h2 className="text-5xl font-bold mt-6">

            Frequently Asked Questions

          </h2>

        </div>

        <div className="mt-20 space-y-6">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-sm"
            >

              <div className="flex justify-between items-center">

                <h3 className="font-semibold text-lg">

                  {faq.question}

                </h3>

                <ChevronDown />

              </div>

              <p className="mt-6 text-gray-500 leading-8">

                {faq.answer}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}