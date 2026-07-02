import { motion } from "framer-motion";
import { Flame, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

interface Props {
  userName?: string;
  streak?: number;
}

const HOUR_GREETINGS = [
  { range: [5, 12], text: "Good morning", sub: "A gentle start to your day." },
  { range: [12, 17], text: "Good afternoon", sub: "Pause and check in with yourself." },
  { range: [17, 21], text: "Good evening", sub: "How did your day treat you?" },
  { range: [21, 24], text: "Good night", sub: "Reflect before you rest." },
  { range: [0, 5], text: "Hey there", sub: "Taking a moment for yourself?" },
];

function getGreeting() {
  const h = new Date().getHours();
  return HOUR_GREETINGS.find(({ range }) => h >= range[0] && h < range[1]) ?? HOUR_GREETINGS[0];
}

const DAY = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(new Date());

export default function MoodHeader({ userName = "Samiksha", streak = 7 }: Props) {
  const navigate = useNavigate();
  const greeting = getGreeting();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`relative overflow-hidden rounded-3xl px-8 py-10 md:px-12 md:py-14 transition-all ${
      isDark
        ? "bg-dark-card border border-dark-border text-white"
        : "bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 text-white shadow-2xl shadow-violet-300/30"
    }`}>
      {/* Ambient orbs - light mode only */}
      {!isDark && (
        <>
          <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-pink-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl" />
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-px w-96 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </>
      )}

      <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          {/* Back nav */}
          <motion.button
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/dashboard")}
            className={`mb-5 flex items-center gap-2 transition-colors text-sm font-medium group cursor-pointer ${
              isDark ? "text-slate-400 hover:text-dark-lavender" : "text-violet-200 hover:text-white"
            }`}
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            Dashboard
          </motion.button>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-sm font-medium tracking-wide mb-1 ${isDark ? "text-dark-lavender" : "text-violet-200"}`}
          >
            {DAY}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-2 font-[Sora,sans-serif]"
          >
            {greeting.text}, {userName} 🌸
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className={`text-base md:text-lg ${isDark ? "text-slate-400" : "text-violet-200"}`}
          >
            How are you feeling today?
          </motion.p>
        </div>

        {/* Streak badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="flex items-center gap-4 self-start md:self-auto"
        >
          <div className={`flex items-center gap-3 rounded-2xl border px-5 py-3.5 ${
            isDark ? "border-dark-border bg-dark-bg-sec" : "border-white/20 bg-white/15 backdrop-blur-sm"
          }`}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${isDark ? "bg-amber-500/10 text-amber-300" : "bg-amber-400/20 text-amber-300"}`}>
              <Flame size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold font-[Sora,sans-serif] leading-none">{streak}</p>
              <p className={`text-xs font-medium mt-0.5 ${isDark ? "text-slate-400" : "text-violet-200"}`}>day streak</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
