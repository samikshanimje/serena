import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Moon, Calendar, Zap, Heart } from "lucide-react";

const INSIGHTS = [
  {
    icon: TrendingUp,
    color: "#10b981",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    title: "You've been happier this week",
    desc: "Your average mood score improved by 18% compared to last week. Keep it up! 🎉",
  },
  {
    icon: Calendar,
    color: "#f87171",
    bg: "bg-red-50",
    iconColor: "text-red-400",
    title: "Mondays seem tough for you",
    desc: "Your mood tends to dip on Monday mornings. Try a short walk or journaling to ease into the week.",
  },
  {
    icon: Moon,
    color: "#8b5cf6",
    bg: "bg-violet-50",
    iconColor: "text-violet-500",
    title: "Sleep affects your mood",
    desc: "On days you log good sleep, your mood score averages 2.4 points higher. Prioritize rest.",
  },
  {
    icon: Zap,
    color: "#fb923c",
    bg: "bg-orange-50",
    iconColor: "text-orange-500",
    title: "Energy & mood are linked",
    desc: "Your energy levels closely mirror your emotional state. Exercise might help on low-mood days.",
  },
  {
    icon: Heart,
    color: "#ec4899",
    bg: "bg-pink-50",
    iconColor: "text-pink-500",
    title: "Weekends are your best days",
    desc: "Saturday and Sunday consistently show your highest mood scores. You thrive with unstructured time.",
  },
];

export default function MoodInsights() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md shadow-violet-200">
            <Sparkles size={18} className="text-white" />
          </div>
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-500 opacity-40"
            animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900 font-[Sora,sans-serif]">AI Insights</h2>
          <p className="text-xs text-slate-400 mt-0.5">Personalized patterns Serena noticed</p>
        </div>
        <span className="ml-auto text-[10px] font-semibold bg-violet-50 text-violet-600 border border-violet-100 rounded-full px-2.5 py-1">
          Powered by AI
        </span>
      </div>

      {/* Insight cards */}
      <div className="space-y-3">
        {INSIGHTS.map((insight, i) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm hover:shadow-md hover:border-slate-200 transition-all"
            >
              {/* Subtle gradient on hover */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(135deg, ${insight.color}06 0%, transparent 60%)` }}
              />

              <div className="relative flex items-start gap-4">
                <div className={`h-9 w-9 shrink-0 rounded-xl ${insight.bg} flex items-center justify-center`}>
                  <Icon size={17} className={insight.iconColor} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 mb-0.5">{insight.title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{insight.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Glass bottom card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-indigo-500/10 border border-violet-100 p-5"
      >
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-300/20 blur-2xl" />
        <div className="flex items-center gap-3">
          <span className="text-2xl">✨</span>
          <p className="text-sm text-slate-600 leading-relaxed">
            <span className="font-semibold text-violet-700">Keep logging daily</span> — more data means sharper, more personalized insights over time.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
