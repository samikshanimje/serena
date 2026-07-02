import { motion } from "framer-motion";
import { BookOpen, Flame, ArrowLeft, Feather } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

const QUOTES = [
  { text: "Writing is the painting of the voice.", author: "Voltaire" },
  { text: "Journal writing is a voyage to the interior.", author: "Christina Baldwin" },
  { text: "Fill your paper with the breathings of your heart.", author: "William Wordsworth" },
  { text: "In the journal I am at ease.", author: "Anaïs Nin" },
  { text: "Write what disturbs you, what you fear, what you have not been willing to speak about.", author: "Natalie Goldberg" },
  { text: "A journal is your completely unaltered voice.", author: "Lucy Dacus" },
  { text: "Keeping a journal will change your life in ways you'd never imagined.", author: "Oprah Winfrey" },
];

const MOOD_META: Record<string, { emoji: string; label: string }> = {
  Amazing:  { emoji: "😄", label: "Amazing" },
  Happy:    { emoji: "😊", label: "Happy" },
  Calm:     { emoji: "😌", label: "Calm" },
  Neutral:  { emoji: "😐", label: "Neutral" },
  Sad:      { emoji: "😔", label: "Sad" },
  "Very Sad":{ emoji: "😭", label: "Very Sad" },
  Angry:    { emoji: "😡", label: "Angry" },
  Anxious:  { emoji: "😰", label: "Anxious" },
};

interface Props {
  userName?: string;
  streak?: number;
  totalEntries?: number;
  currentMood?: string;
  onNewEntry: () => void;
}

export default function JournalHeader({
  streak = 0,
  totalEntries = 0,
  currentMood,
  onNewEntry,
}: Props) {
  const navigate = useNavigate();
  const quote = QUOTES[new Date().getDay() % QUOTES.length];
  const moodMeta = currentMood ? MOOD_META[currentMood] : null;
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const DATE_STR = new Intl.DateTimeFormat("en-US", {
    weekday: "long", month: "long", day: "numeric",
  }).format(new Date());

  return (
    <div className={`relative overflow-hidden rounded-3xl px-8 py-10 md:px-12 md:py-14 transition-all ${
      isDark
        ? "bg-dark-card border border-dark-border text-white"
        : "bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 text-white shadow-2xl shadow-violet-300/30"
    }`}>
      {/* Ambient orbs - light mode only */}
      {!isDark && (
        <>
          <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-pink-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />
          <div className="pointer-events-none absolute top-0 left-1/3 h-px w-64 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </>
      )}

      {/* Floating feather decoration */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-10 top-8 hidden md:block"
      >
        <Feather size={48} className={isDark ? "text-slate-700/20" : "text-white/10"} strokeWidth={1} />
      </motion.div>

      <div className="relative">
        {/* Back nav */}
        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/dashboard")}
          className={`mb-5 flex items-center gap-2 transition-colors text-sm font-medium group cursor-pointer ${
            isDark ? "text-slate-400 hover:text-dark-lavender" : "text-violet-200 hover:text-white"
          }`}
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Dashboard
        </motion.button>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          {/* Left */}
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`mb-1 text-xs font-semibold uppercase tracking-widest ${isDark ? "text-dark-lavender" : "text-violet-300"}`}
            >
              {DATE_STR}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex items-center gap-3 mb-1"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${isDark ? "bg-dark-lavender/10 text-dark-lavender" : "bg-white/15 text-white"}`}>
                <BookOpen size={20} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-[Sora,sans-serif]">
                My Journal
              </h1>
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`mt-4 max-w-lg border-l-2 pl-4 ${isDark ? "border-dark-border" : "border-white/30"}`}
            >
              <p className={`text-sm italic leading-relaxed ${isDark ? "text-slate-400" : "text-violet-100"}`}>"{quote.text}"</p>
              <p className={`mt-1 text-xs ${isDark ? "text-slate-500" : "text-violet-300"}`}>— {quote.author}</p>
            </motion.blockquote>
          </div>

          {/* Right — stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap gap-3"
          >
            {/* Streak */}
            <div className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${
              isDark ? "border-dark-border bg-dark-bg-sec" : "border-white/20 bg-white/15 backdrop-blur-sm"
            }`}>
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${isDark ? "bg-amber-500/10 text-amber-300" : "bg-white/10 text-amber-300"}`}>
                <Flame size={18} />
              </div>
              <div>
                <p className="text-xl font-bold font-[Sora,sans-serif] leading-none">{streak}</p>
                <p className={`text-[11px] mt-0.5 ${isDark ? "text-slate-400" : "text-violet-200"}`}>day streak</p>
              </div>
            </div>

            {/* Total entries */}
            <div className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${
              isDark ? "border-dark-border bg-dark-bg-sec" : "border-white/20 bg-white/15 backdrop-blur-sm"
            }`}>
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${isDark ? "bg-dark-lavender/15 text-dark-lavender" : "bg-white/10 text-violet-200"}`}>
                <BookOpen size={17} />
              </div>
              <div>
                <p className="text-xl font-bold font-[Sora,sans-serif] leading-none">{totalEntries}</p>
                <p className={`text-[11px] mt-0.5 ${isDark ? "text-slate-400" : "text-violet-200"}`}>entries</p>
              </div>
            </div>

            {/* Current mood */}
            {moodMeta && (
              <div className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${
                isDark ? "border-dark-border bg-dark-bg-sec" : "border-white/20 bg-white/15 backdrop-blur-sm"
              }`}>
                <span className="text-2xl">{moodMeta.emoji}</span>
                <div>
                  <p className="text-sm font-bold leading-none">{moodMeta.label}</p>
                  <p className={`text-[11px] mt-0.5 ${isDark ? "text-slate-400" : "text-violet-200"}`}>today's mood</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* New Entry CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <motion.button
            onClick={onNewEntry}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className={`inline-flex items-center gap-2.5 rounded-2xl px-6 py-3.5 text-sm font-bold transition-all cursor-pointer ${
              isDark
                ? "bg-dark-lavender text-black hover:bg-dark-lavender-hover"
                : "bg-white text-violet-700 shadow-xl shadow-violet-900/20 hover:bg-violet-50"
            }`}
          >
            <Feather size={16} />
            Write today's entry
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
