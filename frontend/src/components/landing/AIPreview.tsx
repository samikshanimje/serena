import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CHAT_DEMO = [
  { role: "user", text: "I've been feeling really stressed lately with work." },
  { role: "ai", text: "I hear you 💜 Work stress can feel overwhelming. Let's take this one step at a time. Would you like to try a breathing exercise, or would you prefer to journal your thoughts?" },
  { role: "user", text: "Breathing exercise sounds good." },
  { role: "ai", text: "Perfect. Let's do box breathing together. Inhale for 4 seconds... hold for 4... exhale for 4... hold for 4. Ready? 🌬️" },
];

export default function AIPreview() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-violet-100">
            <Sparkles size={14} />AI Wellness Companion
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 font-[Sora,sans-serif] mb-5 leading-tight">
            Meet Serena AI 🌸
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed mb-8">
            Talk freely with your personal AI companion anytime. Serena helps you reflect, reduce stress, build habits, and stay mentally healthy.
          </p>
          <Link to="/chat">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-violet-600 text-white font-bold hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200"
            >
              Try AI companion <ArrowRight size={16} />
            </motion.button>
          </Link>
        </motion.div>

        {/* RIGHT — Chat preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="rounded-3xl bg-slate-50 p-6 border border-slate-100 shadow-xl shadow-slate-100">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm font-[Sora,sans-serif]">Serena AI</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-slate-400">Online</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {CHAT_DEMO.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.12 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-violet-600 text-white rounded-br-md"
                        : "bg-white border border-slate-100 text-slate-700 shadow-sm rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
