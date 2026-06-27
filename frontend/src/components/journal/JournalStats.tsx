import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PenLine, Flame, Hash, TrendingUp } from "lucide-react";
import { JournalEntry } from "../../services/journalService";

function useCounter(target: number, delay = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      let start: number | null = null;
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 900, 1);
        setVal(Math.floor(p * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timer);
  }, [target, delay]);
  return val;
}

function countWords(text: string) {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

function getWeekEntries(journals: JournalEntry[]) {
  const oneWeekAgo = Date.now() - 7 * 86400000;
  return journals.filter((j) => new Date(j.createdAt).getTime() > oneWeekAgo);
}

interface StatCardProps {
  icon: typeof PenLine;
  label: string;
  value: number;
  suffix?: string;
  color: string;
  bg: string;
  iconColor: string;
  delay?: number;
}

function StatCard({ icon: Icon, label, value, suffix = "", color, bg, iconColor, delay = 0 }: StatCardProps) {
  const count = useCounter(value, delay * 1000);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all"
    >
      <div className={`mb-3 h-9 w-9 rounded-xl ${bg} flex items-center justify-center`}>
        <Icon size={17} className={iconColor} />
      </div>
      <p className="text-2xl font-bold text-slate-900 font-[Sora,sans-serif] tracking-tight">
        {count}
        <span className="text-sm font-semibold ml-0.5" style={{ color }}>{suffix}</span>
      </p>
      <p className="text-xs font-medium text-slate-500 mt-0.5">{label}</p>
    </motion.div>
  );
}

interface Props { journals: JournalEntry[] }

const MOOD_SCORES: Record<string, number> = {
  Amazing: 10, Happy: 8, Calm: 7, Neutral: 5, Sad: 3, "Very Sad": 2, Angry: 2, Anxious: 3,
};

export default function JournalStats({ journals }: Props) {
  const weekEntries = getWeekEntries(journals);
  const totalWords  = weekEntries.reduce((acc, j) => acc + countWords(j.content), 0);
  const avgMood     = weekEntries.length
    ? Math.round(weekEntries.reduce((acc, j) => acc + (MOOD_SCORES[j.mood ?? ""] ?? 5), 0) / weekEntries.length)
    : 0;

  const streak = Math.min(journals.length, 12); // simplified

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 font-[Sora,sans-serif]">Weekly Reflection</h2>
          <p className="text-xs text-slate-400 mt-0.5">Your writing this week</p>
        </div>
        <span className="rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-600">
          Last 7 days
        </span>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={PenLine}    label="Entries this week"  value={weekEntries.length}
          color="#8b5cf6"   bg="bg-violet-50"          iconColor="text-violet-500"  delay={0.08}
        />
        <StatCard
          icon={Flame}      label="Day streak"          value={streak}
          color="#f97316"   bg="bg-orange-50"          iconColor="text-orange-500"  delay={0.14}
        />
        <StatCard
          icon={Hash}       label="Words written"       value={totalWords}
          color="#38bdf8"   bg="bg-sky-50"             iconColor="text-sky-500"     delay={0.2}
        />
        <StatCard
          icon={TrendingUp} label="Avg mood score"      value={avgMood} suffix="/10"
          color="#10b981"   bg="bg-emerald-50"         iconColor="text-emerald-500" delay={0.26}
        />
      </div>

      {/* Mini mood bar */}
      {weekEntries.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
        >
          <p className="text-xs font-semibold text-slate-500 mb-3">This week's mood trend</p>
          <div className="flex items-end gap-1.5 h-10">
            {(weekEntries.length > 0 ? weekEntries : Array(7).fill({ mood: "Neutral" }))
              .slice(-7)
              .map((entry, i) => {
                const score = MOOD_SCORES[entry.mood ?? ""] ?? 5;
                const pct   = (score / 10) * 100;
                const color = score >= 7 ? "#8b5cf6" : score >= 5 ? "#fb923c" : "#f87171";
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <motion.div
                      className="w-full rounded-t-lg"
                      style={{ background: color, height: `${pct}%`, minHeight: 4 }}
                      initial={{ height: 0 }}
                      animate={{ height: `${pct}%` }}
                      transition={{ delay: 0.45 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                );
              })}
          </div>
          <div className="flex justify-between mt-1">
            {["M","T","W","T","F","S","S"].map((d, i) => (
              <span key={i} className="flex-1 text-center text-[10px] text-slate-400">{d}</span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
