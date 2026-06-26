import { motion } from "framer-motion";
import { Brain, BookOpen, HeartHandshake, Trophy, MessageCircle, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: Brain,
    title: "AI Companion",
    desc: "Talk to your wellness assistant anytime, day or night. Powered by Gemini.",
    color: "bg-violet-50 text-violet-600",
    border: "border-violet-100",
  },
  {
    icon: BookOpen,
    title: "Daily Journal",
    desc: "Write, reflect, and understand your emotions in a safe, private space.",
    color: "bg-blue-50 text-blue-600",
    border: "border-blue-100",
  },
  {
    icon: MessageCircle,
    title: "Mood Tracking",
    desc: "Log how you feel every day and see patterns emerge over time.",
    color: "bg-amber-50 text-amber-600",
    border: "border-amber-100",
  },
  {
    icon: Trophy,
    title: "Habit Streaks",
    desc: "Build and maintain wellness habits with streaks and gentle reminders.",
    color: "bg-emerald-50 text-emerald-600",
    border: "border-emerald-100",
  },
  {
    icon: HeartHandshake,
    title: "Community",
    desc: "Connect anonymously with others on similar journeys.",
    color: "bg-pink-50 text-pink-600",
    border: "border-pink-100",
  },
  {
    icon: ShieldCheck,
    title: "Private & Secure",
    desc: "Your data is end-to-end encrypted. Your thoughts belong only to you.",
    color: "bg-slate-50 text-slate-600",
    border: "border-slate-200",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section id="features" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-violet-50 text-violet-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-violet-100">
            Features
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 font-[Sora,sans-serif] mb-4">
            Everything you need
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto text-lg">
            Designed to help you understand your emotions and build a healthier mental life.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={item}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`rounded-3xl p-7 border ${f.border} hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 group`}
              >
                <div className={`w-12 h-12 rounded-2xl ${f.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 font-[Sora,sans-serif]">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{f.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
