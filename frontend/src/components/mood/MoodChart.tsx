import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";

const MOOD_SCORE: Record<string, number> = {
  Amazing: 10, Happy: 8, Calm: 7, Neutral: 5, Sad: 4, "Very Sad": 2, Angry: 3, Anxious: 4,
};

const WEEK_DEMO = [
  { day: "Mon", score: 7, label: "Calm" },
  { day: "Tue", score: 8, label: "Happy" },
  { day: "Wed", score: 4, label: "Anxious" },
  { day: "Thu", score: 9, label: "Amazing" },
  { day: "Fri", score: 8, label: "Happy" },
  { day: "Sat", score: 10, label: "Amazing" },
  { day: "Sun", score: 7, label: "Calm" },
];

const MONTH_DEMO = Array.from({ length: 4 }, (_, i) => ({
  week: `Wk ${i + 1}`,
  avg: [6.5, 7.2, 5.8, 8.1][i],
}));

function scoreColor(score: number) {
  if (score >= 8) return "#10b981";
  if (score >= 6) return "#8b5cf6";
  if (score >= 4) return "#fb923c";
  return "#f87171";
}

function WeekTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const { score, label: mood } = payload[0].payload;
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 text-sm">
      <p className="font-bold text-slate-700 mb-0.5">{label}</p>
      <p className="text-slate-500">{mood} · <span className="font-semibold" style={{ color: scoreColor(score) }}>{score}/10</span></p>
    </div>
  );
}

function MonthTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 text-sm">
      <p className="font-bold text-slate-700">{label}</p>
      <p className="text-violet-600 font-semibold">Avg {payload[0].value.toFixed(1)}/10</p>
    </div>
  );
}

interface MoodEntry { mood: string; createdAt: string }

function buildWeekData(moods: MoodEntry[]) {
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const map: Record<string, { score: number; label: string }> = {};
  for (const m of moods) {
    const d = new Date(m.createdAt);
    const day = days[d.getDay()];
    map[day] = { score: MOOD_SCORE[m.mood] ?? 5, label: m.mood };
  }
  return ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(day => ({
    day,
    score: map[day]?.score ?? 0,
    label: map[day]?.label ?? "",
  }));
}

interface Props { moods?: MoodEntry[] }

const TABS = ["Week", "Month"] as const;

export default function MoodChart({ moods }: Props) {
  const [tab, setTab] = useState<"Week"|"Month">("Week");
  const weekData  = moods?.length ? buildWeekData(moods.slice(-7)) : WEEK_DEMO;
  const monthData = MONTH_DEMO;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-slate-900 font-[Sora,sans-serif]">Mood Trends</h2>
          <p className="text-xs text-slate-400 mt-0.5">Your emotional patterns over time</p>
        </div>
        <div className="flex rounded-xl bg-slate-100 p-1 gap-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                tab === t ? "text-violet-700" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab === t && (
                <motion.div
                  layoutId="chart-tab"
                  className="absolute inset-0 rounded-lg bg-white shadow-sm"
                />
              )}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {tab === "Week" ? (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weekData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 10]} ticks={[0,2,4,6,8,10]} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<WeekTooltip />} cursor={{ stroke: "#e2e8f0", strokeWidth: 1 }} />
              <Area
                type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={2.5}
                fill="url(#moodGrad)"
                dot={{ r: 4, fill: "#8b5cf6", strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#8b5cf6", strokeWidth: 2, stroke: "white" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                {monthData.map((_, i) => (
                  <linearGradient key={i} id={`bar${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#8b5cf6" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.6} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<MonthTooltip />} cursor={{ fill: "#f5f3ff" }} />
              <Bar dataKey="avg" radius={[8, 8, 0, 0]}>
                {monthData.map((_, i) => (
                  <Cell key={i} fill={`url(#bar${i})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </motion.div>

      {/* Score legend */}
      <div className="flex flex-wrap gap-3 mt-4">
        {[
          { label: "Amazing",  color: "#10b981" },
          { label: "Good",     color: "#8b5cf6" },
          { label: "Okay",     color: "#fb923c" },
          { label: "Low",      color: "#f87171" },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full" style={{ background: color }} />
            <span className="text-[11px] text-slate-400">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
