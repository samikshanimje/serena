import { motion } from "framer-motion";
import {
  Sparkles, Heart, TrendingDown, Sun, Lightbulb, BarChart2,
} from "lucide-react";

const INSIGHTS = [
  {
    icon: Heart,
    color: "#ec4899",
    bg: "from-pink-50 to-rose-50",
    border: "border-pink-100",
    title: "Emotion Summary",
    body: "This week you've expressed feelings of calm and reflection. Gratitude appeared in 3 of your entries.",
    tag: "Emotional Health",
    tagColor: "bg-pink-100 text-pink-600",
  },
  {
    icon: TrendingDown,
    color: "#f87171",
    bg: "from-red-50 to-orange-50",
    border: "border-red-100",
    title: "Stress Indicators",
    body: "Words like 'overwhelmed' and 'deadline' appeared more on Tuesdays. Consider a lighter schedule mid-week.",
    tag: "Stress",
    tagColor: "bg-red-100 text-red-500",
  },
  {
    icon: Sun,
    color: "#f59e0b",
    bg: "from-amber-50 to-yellow-50",
    border: "border-amber-100",
    title: "Positive Moments",
    body: "You mentioned a meaningful walk and time with a friend. These contributed to your highest mood days.",
    tag: "Bright Spots",
    tagColor: "bg-amber-100 text-amber-600",
  },
  {
    icon: BarChart2,
    color: "#8b5cf6",
    bg: "from-violet-50 to-purple-50",
    border: "border-violet-100",
    title: "Weekly Reflection",
    body: "Your writing has become more introspective. Average entry length grew by 40% — you're going deeper.",
    tag: "Progress",
    tagColor: "bg-violet-100 text-violet-600",
  },
  {
    icon: Lightbulb,
    color: "#10b981",
    bg: "from-emerald-50 to-teal-50",
    border: "border-emerald-100",
    title: "Suggested Action",
    body: "Try a 5-minute gratitude prompt tonight: 'What's one thing that went better than expected today?'",
    tag: "Action",
    tagColor: "bg-emerald-100 text-emerald-600",
  },
];

export default function JournalInsightCard() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-md shadow-violet-200">
            <Sparkles size={18} className="text-white" />
          </div>
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-500 opacity-40"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900 font-[Sora,sans-serif]">AI Journal Insights</h2>
          <p className="text-xs text-slate-400 mt-0.5">Patterns detected from your writing</p>
        </div>
        <span className="ml-auto rounded-full border border-violet-100 bg-violet-50 px-2.5 py-1 text-[10px] font-bold text-violet-600">
          ✦ AI POWERED
        </span>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {INSIGHTS.map((insight, i) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className={`relative overflow-hidden rounded-2xl border ${insight.border} bg-gradient-to-br ${insight.bg} p-5 hover:shadow-lg transition-all`}
            >
              {/* Ambient glow */}
              <div
                className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl"
                style={{ background: insight.color }}
              />

              <div className="relative flex items-start gap-3">
                <div
                  className="mt-0.5 h-8 w-8 shrink-0 rounded-xl flex items-center justify-center"
                  style={{ background: `${insight.color}20` }}
                >
                  <Icon size={16} style={{ color: insight.color }} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h3 className="text-sm font-bold text-slate-800">{insight.title}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${insight.tagColor}`}>
                      {insight.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{insight.body}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Glass footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 relative overflow-hidden rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-500/8 via-purple-500/8 to-indigo-500/8 p-5"
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-violet-300/15 blur-2xl" />
        <div className="flex items-center gap-3 relative">
          <span className="text-xl">💡</span>
          <p className="text-sm text-slate-600 leading-relaxed">
            <span className="font-semibold text-violet-700">Insights improve over time.</span>{" "}
            The more consistently you write, the more accurate and personalized your reflections become.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
