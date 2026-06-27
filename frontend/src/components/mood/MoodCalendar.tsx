import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MOOD_COLORS: Record<string, string> = {
  Amazing:   "#10b981",
  Happy:     "#8b5cf6",
  Calm:      "#38bdf8",
  Neutral:   "#94a3b8",
  Sad:       "#60a5fa",
  "Very Sad":"#818cf8",
  Angry:     "#f87171",
  Anxious:   "#fb923c",
};

const MOOD_EMOJI: Record<string, string> = {
  Amazing: "😄", Happy: "😊", Calm: "😌", Neutral: "😐",
  Sad: "😔", "Very Sad": "😭", Angry: "😡", Anxious: "😰",
};

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

interface MoodEntry { mood: string; createdAt: string }

function buildCalendar(year: number, month: number, moods: MoodEntry[]) {
  const moodMap: Record<number, MoodEntry> = {};
  for (const m of moods) {
    const d = new Date(m.createdAt);
    if (d.getFullYear() === year && d.getMonth() === month) {
      moodMap[d.getDate()] = m;
    }
  }
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return { moodMap, firstDay, daysInMonth };
}

// Demo moods for the current month
function getDemoMoods(): MoodEntry[] {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const today = now.getDate();
  const moodList = ["Amazing","Happy","Calm","Happy","Neutral","Sad","Anxious","Happy","Amazing","Calm"];
  return Array.from({ length: today }, (_, i) => ({
    mood: moodList[i % moodList.length],
    createdAt: new Date(y, m, i + 1).toISOString(),
  }));
}

interface Props { moods?: MoodEntry[] }

export default function MoodCalendar({ moods }: Props) {
  const now = new Date();
  const [viewYear,  setViewYear]  = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [tooltip, setTooltip] = useState<{ day: number; mood: MoodEntry } | null>(null);

  const allMoods = moods?.length ? moods : getDemoMoods();
  const { moodMap, firstDay, daysInMonth } = buildCalendar(viewYear, viewMonth, allMoods);

  const prev = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const next = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-slate-900 font-[Sora,sans-serif]">Mood Calendar</h2>
          <p className="text-xs text-slate-400 mt-0.5">Monthly emotional heatmap</p>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={prev} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors" aria-label="Previous month">
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-semibold text-slate-700 min-w-[110px] text-center">
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button onClick={next} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors" aria-label="Next month">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[11px] font-semibold text-slate-400 py-1">{d}</div>
        ))}
      </div>

      {/* Calendar cells */}
      <div className="grid grid-cols-7 gap-1.5 relative">
        {cells.map((day, idx) => {
          if (!day) return <div key={`blank-${idx}`} />;
          const entry = moodMap[day];
          const isToday = day === now.getDate() && viewYear === now.getFullYear() && viewMonth === now.getMonth();
          const color = entry ? MOOD_COLORS[entry.mood] : null;
          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.008, type: "spring", stiffness: 300 }}
              className="relative flex flex-col items-center justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.2, zIndex: 10 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => entry && setTooltip({ day, mood: entry })}
                onMouseLeave={() => setTooltip(null)}
                className={`relative h-9 w-9 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
                  isToday ? "ring-2 ring-violet-400 ring-offset-1" : ""
                } ${color ? "shadow-sm" : "hover:bg-slate-100"}`}
                style={color ? { background: `${color}22` } : {}}
                aria-label={`${MONTHS[viewMonth]} ${day}${entry ? `: ${entry.mood}` : ""}`}
              >
                <span className={`text-[11px] font-semibold leading-none ${color ? "" : "text-slate-400"}`}
                  style={color ? { color } : {}}>
                  {day}
                </span>
                {color && (
                  <motion.div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: color }}
                    animate={{ scale: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.05 }}
                  />
                )}
              </motion.button>

              {/* Tooltip */}
              <AnimatePresence>
                {tooltip?.day === day && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    className="absolute bottom-full mb-2 z-20 whitespace-nowrap rounded-2xl bg-slate-900 px-3 py-2 text-white shadow-xl"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{MOOD_EMOJI[tooltip.mood.mood] ?? "🙂"}</span>
                      <span className="text-xs font-semibold">{tooltip.mood.mood}</span>
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-5 flex flex-wrap gap-3">
        {Object.entries(MOOD_COLORS).map(([mood, color]) => (
          <div key={mood} className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
            <span className="text-[11px] text-slate-500">{mood}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
