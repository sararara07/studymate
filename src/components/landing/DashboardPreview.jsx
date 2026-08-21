import { motion } from "framer-motion";
import {
  Flame,
  CheckCircle2,
  BrainCircuit,
  CalendarDays,
  BookOpenCheck,
  TrendingUp,
  Clock3,
} from "lucide-react";

export default function DashboardPreview() {
  return (
    <section
      id="analytics"
      className="py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-8">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="text-center"
        >

          <span className="bg-violet-100 text-violet-700 px-4 py-2 rounded-full font-semibold">
            Dashboard
          </span>

          <h2 className="text-5xl font-bold mt-6">
            Your Complete Study
            <span className="text-[#6D5DF6]">
              {" "}Workspace
            </span>
          </h2>

          <p className="text-gray-500 max-w-3xl mx-auto mt-6 leading-8">
            Everything important is available at a glance —
            study streak, AI insights, tasks, quizzes,
            exams and analytics.
          </p>

        </motion.div>

        <motion.div
          initial={{ opacity:0, scale:.95 }}
          whileInView={{ opacity:1, scale:1 }}
          viewport={{ once:true }}
          transition={{ duration:.7 }}
          className="mt-20 bg-[#F8F9FC] rounded-[40px] p-8 shadow-2xl border border-gray-100"
        >

          {/* Top */}

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-3xl font-bold">

                Welcome Back, Sara 👋

              </h2>

              <p className="text-gray-500 mt-2">

                Let's continue today's study session.

              </p>

            </div>

            <button className="bg-[#6D5DF6] text-white px-5 py-3 rounded-xl">

              Start Studying

            </button>

          </div>

          {/* Stats */}

          <div className="grid lg:grid-cols-4 gap-6 mt-10">

            <Card
              icon={<Flame />}
              title="Study Streak"
              value="18 Days"
            />

            <Card
              icon={<CheckCircle2 />}
              title="Tasks Done"
              value="24/30"
            />

            <Card
              icon={<BrainCircuit />}
              title="AI Notes"
              value="42"
            />

            <Card
              icon={<BookOpenCheck />}
              title="Flashcards"
              value="184"
            />

          </div>

          {/* Bottom */}

          <div className="grid lg:grid-cols-3 gap-6 mt-8">

            {/* Weekly */}

            <div className="bg-white rounded-3xl p-6">

              <div className="flex items-center gap-3">

                <TrendingUp className="text-violet-600"/>

                <h3 className="font-bold">

                  Weekly Progress

                </h3>

              </div>

              <div className="mt-8 space-y-4">

                {[85,65,92,74,80].map((item,index)=>(

                  <div key={index}>

                    <div className="flex justify-between mb-2">

                      <span>Day {index+1}</span>

                      <span>{item}%</span>

                    </div>

                    <div className="h-3 rounded-full bg-gray-200">

                      <motion.div

                        initial={{width:0}}

                        whileInView={{width:`${item}%`}}

                        viewport={{once:true}}

                        className="h-3 rounded-full bg-[#6D5DF6]"

                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* Exam */}

            <div className="bg-white rounded-3xl p-6">

              <div className="flex items-center gap-3">

                <CalendarDays className="text-violet-600"/>

                <h3 className="font-bold">

                  Upcoming Exam

                </h3>

              </div>

              <div className="mt-10 text-center">

                <h2 className="text-6xl font-bold text-[#6D5DF6]">

                  27

                </h2>

                <p className="mt-3 text-gray-500">

                  Days Remaining

                </p>

                <div className="mt-8 bg-violet-100 rounded-2xl p-4">

                  <h3 className="font-bold">

                    Database Management System

                  </h3>

                </div>

              </div>

            </div>

            {/* AI */}

            <div className="bg-gradient-to-br from-violet-500 to-indigo-500 rounded-3xl p-6 text-white">

              <div className="flex items-center gap-3">

                <Clock3/>

                <h3 className="font-bold">

                  AI Insight

                </h3>

              </div>

              <p className="leading-8 mt-8">

                You've studied for
                <strong> 18 hours </strong>
                this week.

                <br/><br/>

                Your strongest subject is
                <strong> DBMS </strong>

                <br/><br/>

                Spend another
                <strong> 45 minutes </strong>

                on Operating System today to
                stay on track.

              </p>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

function Card({ icon, title, value }) {
  return (
    <div className="bg-white rounded-3xl p-6 hover:shadow-xl transition">

      <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600">

        {icon}

      </div>

      <p className="text-gray-500 mt-6">

        {title}

      </p>

      <h2 className="text-3xl font-bold mt-2">

        {value}

      </h2>

    </div>
  );
}
