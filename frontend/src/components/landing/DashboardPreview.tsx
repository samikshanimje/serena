import { motion } from "framer-motion";
import { Smile, PenLine, Droplets, Flame } from "lucide-react";
import { Link } from "react-router-dom";

const CARDS = [
  { icon: Smile, label: "Mood", value: "Excellent", bg: "bg-violet-50", iconColor: "text-violet-500", border: "border-violet-100" },
  { icon: PenLine, label: "Journal", value: "42 entries", bg: "bg-pink-50", iconColor: "text-pink-500", border: "border-pink-100" },
  { icon: Droplets, label: "Water", value: "2.4 L", bg: "bg-sky-50", iconColor: "text-sky-500", border: "border-sky-100" },
  { icon: Flame, label: "Streak", value: "18 days", bg: "bg-orange-50", iconColor: "text-orange-500", border: "border-orange-100" },
];

export default function DashboardPreview() {
  return (
    <section id="how" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-violet-50 text-violet-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-violet-100">
            Dashboard
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 font-[Sora,sans-serif] mb-4">
            Your wellness, at a glance.
          </h2>
          <p className="text-slate-500 text-lg max-w-md mx-auto">
            Everything you need to understand your mental health — beautifully organized.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-100/60 to-purple-100/40 rounded-[40px] blur-2xl scale-95 pointer-events-none" />

          <div className="relative rounded-[36px] bg-white border border-slate-100 shadow-2xl shadow-slate-200/60 p-8 md:p-10">
            {/* Fake topbar */}
            <div className="flex items-center justify-between mb-8 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <span className="text-sm">🌸</span>
                </div>
                <span className="font-bold text-slate-900 font-[Sora,sans-serif]">Serena</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
            </div>

            {/* Welcome banner */}
            <div className="rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 p-6 text-white mb-6">
              <p className="text-violet-200 text-sm mb-1 font-medium">Good morning 🌸</p>
              <h3 className="text-2xl font-bold font-[Sora,sans-serif]">Welcome back, Samiksha!</h3>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-2 flex-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "86%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
                  />
                </div>
                <span className="text-sm font-bold">86%</span>
              </div>
              <p className="text-violet-200 text-xs mt-1">Wellness score</p>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {CARDS.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className={`${card.bg} ${card.border} border rounded-2xl p-5`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm">
                      <Icon size={17} className={card.iconColor} />
                    </div>
                    <p className="text-lg font-bold text-slate-900 font-[Sora,sans-serif]">{card.value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{card.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className="text-center mt-10">
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-2xl bg-violet-600 text-white font-bold hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200"
            >
              Get your own dashboard →
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
