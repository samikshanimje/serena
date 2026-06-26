import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";

const MOOD_DATA = [
  { day: "Mon", mood: 6, energy: 5 },
  { day: "Tue", mood: 7, energy: 6 },
  { day: "Wed", mood: 5, energy: 4 },
  { day: "Thu", mood: 8, energy: 7 },
  { day: "Fri", mood: 7, energy: 8 },
  { day: "Sat", mood: 9, energy: 8 },
  { day: "Sun", mood: 8, energy: 7 },
];

const LABELS: Record<number, string> = { 3: "Low", 5: "Okay", 7: "Good", 9: "Great" };

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-100 px-4 py-3">
      <p className="text-xs font-semibold text-slate-500 mb-1.5">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-slate-600 capitalize">{p.dataKey}:</span>
          <span className="font-semibold text-slate-800">{p.value}/10</span>
        </div>
      ))}
    </div>
  );
}

export default function MoodChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-base font-semibold text-slate-900 font-[Sora,sans-serif]">Mood & Energy</h2>
          <p className="text-xs text-slate-400 mt-0.5">Last 7 days</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-violet-500" />Mood
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-sky-400" />Energy
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={MOOD_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="gMood" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.18} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gEnergy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.18} />
              <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <YAxis
            domain={[3, 10]} ticks={[3, 5, 7, 9]}
            tickFormatter={(v) => LABELS[v] ?? v}
            tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#e2e8f0", strokeWidth: 1 }} />
          <Area type="monotone" dataKey="mood" stroke="#8b5cf6" strokeWidth={2.5}
            fill="url(#gMood)" dot={{ r: 4, fill: "#8b5cf6", strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#8b5cf6", strokeWidth: 2, stroke: "white" }} />
          <Area type="monotone" dataKey="energy" stroke="#38bdf8" strokeWidth={2.5}
            fill="url(#gEnergy)" dot={{ r: 4, fill: "#38bdf8", strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#38bdf8", strokeWidth: 2, stroke: "white" }} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
