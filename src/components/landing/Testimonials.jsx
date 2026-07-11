import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Computer Science Student",
    review:
      "StudyMate completely changed how I prepare for exams. The AI flashcards save me hours every week.",
  },
  {
    name: "Aarav Patel",
    role: "Engineering Student",
    review:
      "The quiz generator and AI summaries are honestly the best features. It feels like having a personal tutor.",
  },
  {
    name: "Emily Carter",
    role: "Medical Student",
    review:
      "The analytics dashboard helped me identify weak subjects and improve my consistency.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center">

          <span className="bg-violet-100 text-violet-700 px-4 py-2 rounded-full font-semibold">
            Testimonials
          </span>

          <h2 className="text-5xl font-bold mt-6">
            Loved by Students
          </h2>

          <p className="text-gray-500 mt-6 max-w-2xl mx-auto">
            Built for students who want to study smarter,
            stay organized and perform better.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {testimonials.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-[#F8F9FC] rounded-3xl p-8 shadow-sm hover:shadow-xl transition"
            >

              <div className="flex gap-1 text-yellow-500">

                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill="currentColor"
                  />
                ))}

              </div>

              <p className="mt-8 text-gray-600 leading-8">

                "{item.review}"

              </p>

              <div className="mt-10">

                <h3 className="font-bold">

                  {item.name}

                </h3>

                <p className="text-gray-500">

                  {item.role}

                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}