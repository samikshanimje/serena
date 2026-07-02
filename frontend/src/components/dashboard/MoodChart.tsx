import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";

import { useTheme } from "../../hooks/useTheme";

interface MoodEntry {
  mood: string;
  note?: string;
  createdAt: string;
}

interface Props {
  moods?: MoodEntry[];
}

const MOOD_SCORE: Record<string, number> = {
  Amazing: 10, Happy: 8, Calm: 7, Neutral: 5, Sad: 4, "Very Sad": 2, Angry: 3, Anxious: 4, Tired: 4,
};

const LABELS: Record<number, string> = { 0: "—", 3: "Low", 5: "Okay", 7: "Good", 9: "Great" };

const WEEK_DEMO = [
  { day: "Mon", mood: 6, energy: 5 },
  { day: "Tue", mood: 7, energy: 6 },
  { day: "Wed", mood: 5, energy: 4 },
  { day: "Thu", mood: 8, energy: 7 },
  { day: "Fri", mood: 7, energy: 8 },
  { day: "Sat", mood: 9, energy: 8 },
  { day: "Sun", mood: 8, energy: 7 },
];

function buildWeekData(moods: MoodEntry[]) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const map: Record<string, { mood: number; energy: number }> = {};
  
  // Sort oldest to newest to map correctly
  const sorted = [...moods].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  
  for (const m of sorted) {
    const d = new Date(m.createdAt);
    const day = days[d.getDay()];
    
    let energy = 6;
    if (m.note) {
      const match = m.note.match(/Energy:(\d)/);
      if (match) {
        energy = Number(match[1]) * 2; // scale 1-5 to 1-10
      }
    }
    
    const score = MOOD_SCORE[m.mood] ?? 5;
    map[day] = { mood: score, energy };
  }
  
  return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
    day,
    mood: map[day]?.mood ?? 0,
    energy: map[day]?.energy ?? 0,
  }));
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-dark-card-el rounded-2xl shadow-xl shadow-slate-200/80 dark:shadow-none border border-slate-100 dark:border-dark-border px-4 py-3">
      <p className="text-xs font-semibold text-slate-500 dark:text-dark-text-sec mb-1.5">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-sm mt-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-slate-600 dark:text-dark-text-sec capitalize">{p.dataKey}:</span>
          <span className="font-semibold text-slate-800 dark:text-dark-text-pri">
            {p.value > 0 ? `${p.value}/10` : "Not logged"}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function MoodChart({ moods = [] }: Props) {
  const chartData = moods.length > 0 ? buildWeekData(moods.slice(-14)) : WEEK_DEMO;
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const moodColor = isDark ? "#A78BFA" : "#8B5CF6";
  const energyColor = isDark ? "#C4B5FD" : "#38bdf8";
  const gridColor = isDark ? "#2D2D30" : "#f1f5f9";
  const tooltipCursorColor = isDark ? "#2D2D30" : "#e2e8f0";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-base font-semibold text-slate-900 font-[Sora,sans-serif]">Mood &amp; Energy</h2>
          <p className="text-xs text-slate-400 mt-0.5">Weekly overview</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full`} style={{ backgroundColor: moodColor }} />Mood
          </div>
          <div className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full`} style={{ backgroundColor: energyColor }} />Energy
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="gMood" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={moodColor} stopOpacity={0.18} />
              <stop offset="95%" stopColor={moodColor} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gEnergy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={energyColor} stopOpacity={0.18} />
              <stop offset="95%" stopColor={energyColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <YAxis
            domain={[0, 10]} ticks={[0, 3, 5, 7, 9]}
            tickFormatter={(v) => LABELS[v] ?? v}
            tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: tooltipCursorColor, strokeWidth: 1 }} />
          <Area type="monotone" dataKey="mood" stroke={moodColor} strokeWidth={2.5}
            fill="url(#gMood)" dot={{ r: 4, fill: moodColor, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: moodColor, strokeWidth: 2, stroke: "white" }} />
          <Area type="monotone" dataKey="energy" stroke={energyColor} strokeWidth={2.5}
            fill="url(#gEnergy)" dot={{ r: 4, fill: energyColor, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: energyColor, strokeWidth: 2, stroke: "white" }} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
