import { useState } from "react";
import { motion } from "framer-motion";
import { Droplets, Moon, Brain, CheckCircle2, Plus } from "lucide-react";

const INITIAL_HABITS = [
  { id: "water", label: "Water", value: 72, goal: 2.5, current: 1.8, unit: "L", step: 0.25, color: "#38bdf8", bg: "bg-sky-50", icon: Droplets, ic: "text-sky-500", done: false },
  { id: "sleep", label: "Sleep", value: 87, goal: 8, current: 7, unit: "hrs", step: 1, color: "#8b5cf6", bg: "bg-violet-50", icon: Moon, ic: "text-violet-500", done: true },
  { id: "meditation", label: "Meditation", value: 50, goal: 20, current: 10, unit: "min", step: 5, color: "#a78bfa", bg: "bg-purple-50", icon: Brain, ic: "text-purple-500", done: false },
];

function Ring({ value, color, size = 56, onClick }: { value: number; color: string; size?: number; onClick?: () => void }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <button onClick={onClick} className="relative group cursor-pointer focus:outline-none" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f1f5f9" strokeWidth="5" />
        <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="5"
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ}
          animate={{ strokeDashoffset: circ - (value / 100) * circ }}
          transition={{ duration: 0.8, ease: "easeOut" }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center transition-transform group-hover:scale-110">
        <span className="text-xs font-bold text-slate-700">{value}%</span>
      </div>
    </button>
  );
}

export default function HabitCard() {
  const [habits, setHabits] = useState(INITIAL_HABITS);

  const handleLogHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        if (h.id === "sleep") {
          const isDone = !h.done;
          return {
            ...h,
            done: isDone,
            current: isDone ? 8 : 0,
            value: isDone ? 100 : 0,
          };
        } else {
          const nextCurrent = Math.min(h.goal, Number((h.current + h.step).toFixed(2)));
          const nextValue = Math.min(100, Math.round((nextCurrent / h.goal) * 100));
          return {
            ...h,
            current: nextCurrent,
            value: nextValue,
            done: nextCurrent >= h.goal,
          };
        }
      })
    );
  };

  const completedCount = habits.filter((h) => h.done).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-semibold text-slate-900 font-[Sora,sans-serif]">Habits</h2>
          <p className="text-xs text-slate-400 mt-0.5">{completedCount} of 3 completed</p>
        </div>
        <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 rounded-full px-3 py-1">
          <span className="text-sm">🔥</span>
          <span className="text-xs font-semibold text-amber-600">Streak: 12d</span>
        </div>
      </div>

      <div className="flex items-center justify-around mb-5 py-2">
        {habits.map((h) => (
          <div key={h.label} className="flex flex-col items-center gap-2">
            <Ring value={h.value} color={h.color} onClick={() => handleLogHabit(h.id)} />
            <span className="text-xs font-medium text-slate-500">{h.label}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {habits.map((h) => {
          const Icon = h.icon;
          return (
            <div key={h.label} className="relative group">
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={() => handleLogHabit(h.id)}
                  className="flex items-center gap-2 text-left hover:text-violet-600 transition-colors focus:outline-none cursor-pointer"
                >
                  <div className={`w-7 h-7 rounded-xl ${h.bg} flex items-center justify-center`}>
                    <Icon size={13} className={h.ic} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{h.label}</span>
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">
                    {h.current} {h.unit} / {h.goal} {h.unit}
                  </span>
                  
                  <button
                    onClick={() => handleLogHabit(h.id)}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                      h.done 
                        ? "bg-emerald-50 text-emerald-500" 
                        : "bg-slate-50 text-slate-400 hover:bg-violet-50 hover:text-violet-600"
                    }`}
                    aria-label={`Log ${h.label}`}
                  >
                    {h.done ? <CheckCircle2 size={13} /> : <Plus size={12} />}
                  </button>
                </div>
              </div>
              <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: h.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${h.value}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
