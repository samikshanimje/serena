import { motion } from "framer-motion";
import { Sparkles, TrendingUp } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

interface Props {
  userName?: string;
  wellnessScore?: number;
}

const QUOTES = [
  { text: "You don't have to be positive all the time. Having feelings makes you human.", author: "Lori Deschene" },
  { text: "Self-care is not self-indulgence, it is self-preservation.", author: "Audre Lorde" },
  { text: "Mental health is not a destination, but a process.", author: "Noam Shpancer" },
];

export default function WelcomeCard({ userName = "Samiksha", wellnessScore = 86 }: Props) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const quote = QUOTES[new Date().getDay() % QUOTES.length];
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const R = 36;
  const circ = 2 * Math.PI * R;
  const dashOffset = circ - (wellnessScore / 100) * circ;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative rounded-3xl overflow-hidden p-6 md:p-8 transition-all ${
        isDark
          ? "bg-dark-card border border-dark-border text-white"
          : "bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 text-white shadow-xl shadow-violet-300/30"
      }`}
    >
      {/* Background decorations - light mode only */}
      {!isDark && (
        <>
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-32 w-56 h-56 bg-pink-400/15 rounded-full translate-y-1/2 blur-2xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        </>
      )}

      {/* Background glow - dark mode only */}
      {isDark && (
        <div className="absolute top-0 right-0 w-80 h-80 bg-dark-lavender/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
      )}

      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left */}
        <div className="flex-1 min-w-0">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-2 mb-2"
          >
            <div className={`w-5 h-5 rounded-md flex items-center justify-center ${
              isDark ? "bg-dark-lavender/10 text-dark-lavender" : "bg-white/20 text-violet-200"
            }`}>
              <Sparkles size={11} />
            </div>
            <span className={`text-xs font-semibold tracking-wide uppercase ${
              isDark ? "text-dark-lavender" : "text-violet-200"
            }`}>Daily Wellness</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold font-[Sora,sans-serif] tracking-tight mb-3"
          >
            {greeting}, {userName} 🌸
          </motion.h1>

          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-md"
          >
            <p className={`text-sm leading-relaxed italic ${isDark ? "text-slate-400" : "text-violet-100"}`}>
              "{quote.text}"
            </p>
            <p className={`text-xs mt-2 not-italic ${isDark ? "text-slate-500" : "text-violet-300"}`}>— {quote.author}</p>
          </motion.blockquote>

          {/* Quick badges */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex flex-wrap gap-2 mt-5"
          >
            {[
              { icon: "🔥", label: "12-day streak" },
              { icon: "🎯", label: "3 goals today" },
              { icon: "💜", label: "Feeling good" },
            ].map((badge) => (
              <span
                key={badge.label}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                  isDark
                    ? "bg-dark-bg-sec border border-dark-border text-slate-350"
                    : "bg-white/15 border border-white/20 text-white/90"
                }`}
              >
                <span>{badge.icon}</span>
                {badge.label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Wellness ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, type: "spring", stiffness: 200 }}
          className="flex flex-col items-center gap-3 shrink-0"
        >
          <div className="relative w-28 h-28">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r={R} fill="none" stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.12)"} strokeWidth="6" />
              <motion.circle
                cx="40" cy="40" r={R}
                fill="none" stroke={isDark ? "#A78BFA" : "white"} strokeWidth="6" strokeLinecap="round"
                strokeDasharray={circ} strokeDashoffset={circ}
                animate={{ strokeDashoffset: dashOffset }}
                transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold font-[Sora,sans-serif]">{wellnessScore}<span className="text-lg">%</span></span>
              <span className={`text-[10px] font-medium ${isDark ? "text-slate-500" : "text-violet-200"}`}>Wellness</span>
            </div>
          </div>
          <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 ${
            isDark ? "bg-dark-bg-sec border border-dark-border" : "bg-white/15 border border-white/20"
          }`}>
            <TrendingUp size={12} className="text-emerald-300" />
            <span className={`text-xs font-medium ${isDark ? "text-slate-350" : "text-white/90"}`}>↑ 4% vs yesterday</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
