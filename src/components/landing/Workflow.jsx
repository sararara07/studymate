import { motion } from "framer-motion";
import {
  Upload,
  Sparkles,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Your Notes",
    description:
      "Upload handwritten notes, PDFs, PPTs or textbook images.",
  },
  {
    icon: Sparkles,
    title: "AI Creates Study Material",
    description:
      "Groq AI generates summaries, flashcards, quizzes, definitions and exam questions instantly.",
  },
  {
    icon: GraduationCap,
    title: "Study & Track Progress",
    description:
      "Practice with flashcards, complete quizzes and monitor your learning analytics.",
  },
];

export default function Workflow() {
  return (
    <section className="py-28 bg-[#F8F9FC]">

      <div className="max-w-7xl mx-auto px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >

          <span className="px-5 py-2 rounded-full bg-violet-100 text-violet-700 font-semibold">
            How StudyMate Works
          </span>

          <h2 className="text-5xl font-bold text-gray-900 mt-6">

            From Notes
            <span className="text-[#6D5DF6]"> to Revision </span>
            in Minutes

          </h2>

          <p className="mt-6 text-gray-500 max-w-3xl mx-auto leading-8">

            StudyMate transforms your study material into
            organized learning resources with the help of AI,
            making revision faster and more effective.

          </p>

        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {steps.map((step, index) => {

            const Icon = step.icon;

            return (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative bg-white rounded-[30px] p-8 shadow-sm border border-gray-200 hover:shadow-xl transition"
              >

                <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center">

                  <Icon
                    size={30}
                    className="text-[#6D5DF6]"
                  />

                </div>

                <div className="mt-8">

                  <span className="text-violet-600 font-semibold">

                    Step {index + 1}

                  </span>

                  <h3 className="text-2xl font-bold mt-3 text-gray-900">

                    {step.title}

                  </h3>

                  <p className="text-gray-500 leading-8 mt-5">

                    {step.description}

                  </p>

                </div>

                {index !== steps.length - 1 && (

                  <div className="hidden lg:flex absolute -right-6 top-20 z-20 w-12 h-12 rounded-full bg-white border border-gray-200 items-center justify-center shadow">

                    <ArrowRight
                      size={20}
                      className="text-violet-600"
                    />

                  </div>

                )}

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}