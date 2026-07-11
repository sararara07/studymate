import { motion } from "framer-motion";
import {
  BrainCircuit,
  FileText,
  BookOpenCheck,
  ClipboardCheck,
  BarChart3,
  CalendarClock,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Study Buddy",
    description:
      "Ask questions, understand difficult topics and receive personalized study guidance powered by Groq AI.",
  },
  {
    icon: FileText,
    title: "Smart Notes",
    description:
      "Upload PDFs, PPTs or handwritten notes and instantly generate summaries, definitions and important points.",
  },
  {
    icon: BookOpenCheck,
    title: "Flashcards",
    description:
      "Automatically convert your study material into interactive flashcards for faster revision.",
  },
  {
    icon: ClipboardCheck,
    title: "Quiz Generator",
    description:
      "Generate MCQs, True/False, Fill in the Blanks, Short and Long Answer questions with AI.",
  },
  {
    icon: CalendarClock,
    title: "Study Planner",
    description:
      "Manage your tasks, goals, diary entries, sticky notes and exam countdowns in one place.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Track study streaks, quiz accuracy, productivity and weak subjects through beautiful charts.",
  },
];

export default function Features() {
  return (
    <section className="py-28 bg-white">

      <div className="max-w-7xl mx-auto px-8">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="text-center"
        >

          <span className="bg-violet-100 text-violet-700 px-4 py-2 rounded-full font-semibold">
            Everything You Need
          </span>

          <h2 className="text-5xl font-bold mt-6 text-gray-900">

            One Workspace.
            <br />
            Every Study Tool.

          </h2>

          <p className="text-gray-500 mt-6 max-w-3xl mx-auto leading-8">

            StudyMate combines artificial intelligence with productivity tools
            so you can focus on learning instead of managing multiple apps.

          </p>

        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {features.map((feature, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#F8F9FC] rounded-[28px] p-8 border border-gray-100 hover:border-violet-200 hover:shadow-xl transition duration-300"
            >

              <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600">

                <feature.icon size={30} />

              </div>

              <h3 className="text-2xl font-bold mt-8 text-gray-900">

                {feature.title}

              </h3>

              <p className="text-gray-500 mt-5 leading-8">

                {feature.description}

              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}