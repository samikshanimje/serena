import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Trophy, BarChart2, Calendar, Star, Zap } from "lucide-react";

/* Animated counter hook */
function useCounter(target: number, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return val;
}

interface StatTileProps {
  icon: typeof Flame;
  label: string;
  value: number;
  suffix?: string;
  color: string;
  bg: string;
  iconColor: string;
  delay?: number;
}

function StatTile({ icon: Icon, label, value, suffix = "", color, bg, iconColor, delay = 0 }: StatTileProps) {
  const count = useCounter(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all"
    >
      <div className={`h-9 w-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
        <Icon size={17} className={iconColor} />
      </div>
      <p className="text-2xl font-bold font-[Sora,sans-serif] text-slate-900 tracking-tight">
        {count}<span className="text-base font-semibold" style={{ color }}>{suffix}</span>
      </p>
      <p className="text-xs font-medium text-slate-500 mt-0.5">{label}</p>
    </motion.div>
  );
}

interface Props {
  streak?: number;
  longestStreak?: number;
  totalEntries?: number;
  avgScore?: number;
}

export default function MoodStats({
  streak = 7,
  longestStreak = 21,
  totalEntries = 47,
  avgScore = 7,
}: Props) {
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    if (streak > 0 && streak % 7 === 0) {
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 3000);
    }
  }, [streak]);

  return (
    <div>
      {/* Celebration banner */}
      <AnimatePresence>
        {celebrate && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            className="mb-5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 px-5 py-3 text-white text-sm font-semibold flex items-center gap-3 shadow-lg shadow-amber-200"
          >
            <span className="text-xl">🎉</span>
            Amazing! {streak}-day streak milestone reached!
            <Star size={16} className="ml-auto" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero streak card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-5 relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 p-6 text-white shadow-xl shadow-orange-200/40"
      >
        <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/10 blur-xl" />

        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame size={16} className="text-white/80" />
              <span className="text-sm font-medium text-white/80">Current Streak</span>
            </div>
            <div className="flex items-end gap-2">
              <motion.span
                className="text-6xl font-bold font-[Sora,sans-serif] leading-none"
                animate={celebrate ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.4 }}
              >
                {streak}
              </motion.span>
              <span className="text-xl font-semibold pb-1 text-white/80">days</span>
            </div>

            {/* Progress to next milestone */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-white/70 mb-1.5">
                <span>Progress to {Math.ceil(streak / 7) * 7}-day badge</span>
                <span>{streak % 7}/7</span>
              </div>
              <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${((streak % 7) / 7) * 100}%` }}
                  transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* Flame icon large */}
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-20 w-20 rounded-3xl bg-white/20 flex items-center justify-center shrink-0"
          >
            <Flame size={44} className="text-white" />
          </motion.div>
        </div>

        {/* Best streak sub-stat */}
        <div className="relative mt-4 flex items-center gap-2 text-xs text-white/70 border-t border-white/20 pt-3">
          <Trophy size={13} />
          <span>Personal best: <strong className="text-white">{longestStreak} days</strong></span>
        </div>
      </motion.div>

      {/* Stat tiles grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatTile
          icon={BarChart2} label="Total mood logs" value={totalEntries}
          color="#8b5cf6" bg="bg-violet-50" iconColor="text-violet-500" delay={0.1}
        />
        <StatTile
          icon={Star} label="Avg mood score" value={avgScore} suffix="/10"
          color="#10b981" bg="bg-emerald-50" iconColor="text-emerald-500" delay={0.15}
        />
        <StatTile
          icon={Calendar} label="Days active" value={Math.round(totalEntries * 0.85)} suffix=" days"
          color="#38bdf8" bg="bg-sky-50" iconColor="text-sky-500" delay={0.2}
        />
        <StatTile
          icon={Zap} label="Best week score" value={9} suffix="/10"
          color="#fb923c" bg="bg-orange-50" iconColor="text-orange-500" delay={0.25}
        />
      </div>
    </div>
  );
}
