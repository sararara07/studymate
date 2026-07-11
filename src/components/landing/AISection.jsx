import { motion } from "framer-motion";
import {
  BrainCircuit,
  Sparkles,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

export default function AISection() {
  return (
    <section className="py-32 bg-[#F7F8FC]">
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT */}

        <motion.div
          initial={{opacity:0,x:-50}}
          whileInView={{opacity:1,x:0}}
          viewport={{once:true}}
        >

          <span className="bg-violet-100 text-violet-700 px-4 py-2 rounded-full font-semibold">
            AI Study Buddy
          </span>

          <h2 className="text-5xl font-bold mt-6 leading-tight">

            Your Personal
            <span className="text-[#6D5DF6]">

              {" "}Learning Assistant

            </span>

          </h2>

          <p className="text-gray-500 mt-8 leading-8">

            StudyMate remembers your syllabus,
            weak subjects, quizzes,
            flashcards and exam schedule.

            Ask anything naturally and get
            personalized explanations powered by Groq AI.

          </p>

          <div className="space-y-5 mt-10">

            {[
              "Explain DBMS like I'm 10",
              "Quiz me on Chapter 4",
              "Summarize these notes",
              "Generate important exam questions",
            ].map((item,index)=>(

              <div
                key={index}
                className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow"
              >

                <BrainCircuit className="text-violet-600"/>

                <span>{item}</span>

              </div>

            ))}

          </div>

          <button className="mt-10 bg-[#6D5DF6] text-white px-7 py-4 rounded-2xl flex items-center gap-2 hover:bg-[#5C4AE6]">

            Try AI Assistant

            <ArrowRight size={18}/>

          </button>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{opacity:0,x:50}}
          whileInView={{opacity:1,x:0}}
          viewport={{once:true}}
          className="bg-white rounded-[35px] shadow-2xl p-8"
        >

          <div className="flex items-center gap-3">

            <Sparkles className="text-violet-600"/>

            <h2 className="font-bold text-2xl">

              AI Conversation

            </h2>

          </div>

          <div className="mt-10 space-y-6">

            <div className="bg-violet-100 rounded-2xl p-5 ml-auto w-[80%]">

              Explain Normalization
              like I'm 10.

            </div>

            <div className="bg-gray-100 rounded-2xl p-5 w-[90%] leading-8">

              Imagine your room is full of toys.

              Normalization is simply organizing
              every toy into the correct box
              so nothing gets duplicated and
              everything becomes easier to find.

            </div>

            <div className="bg-violet-100 rounded-2xl p-5 ml-auto w-[70%]">

              Give me one example.

            </div>

            <div className="bg-gray-100 rounded-2xl p-5 leading-8">

              Imagine a school stores every
              student's name multiple times.

              Instead, Normalization stores it once
              and connects everything using IDs.

            </div>

          </div>

          <div className="mt-10 flex items-center gap-3 bg-[#F8F9FC] rounded-2xl p-4">

            <MessageCircle className="text-violet-600"/>

            <input
              placeholder="Ask StudyMate anything..."
              className="bg-transparent outline-none flex-1"
            />

          </div>

        </motion.div>

      </div>
    </section>
  );
}