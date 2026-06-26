import { motion } from "framer-motion";
import { Brain, CheckCircle2, Droplets, Moon } from "lucide-react";

interface HabitItem {
  label: string;
  value: number;
  goal: string;
  current: string;
  color: string;
  bgColor: string;
  icon: typeof Droplets;
  iconColor: string;
  done: boolean;
}

const HABITS: HabitItem[] = [
  {
    label: "Water",
    value: 72,
    goal: "2.5 L",
    current: "1.8 L",
    color: "#38bdf8",
    bgColor: "bg-sky-50",
    icon: Droplets,
    iconColor: "text-sky-500",
    done: false,
  },
  {
    label: "Sleep",
    value: 87,
    goal: "8 hrs",
    current: "7 hrs",
    color: "#8b5cf6",
    bgColor: "bg-violet-50",
    icon: Moon,
    iconColor: "text-violet-500",
    done: true,
  },
  {
    label: "Meditation",
    value: 50,
    goal: "20 min",
    current: "10 min",
    color: "#a78bfa",
    bgColor: "bg-purple-50",
    icon: Brain,
    iconColor: "text-purple-500",
    done: false,
  },
];

function Ring({
  value,
  color,
  size = 56,
}: {
  value: number;
  color: string;
  size?: number;
}) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="5"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-slate-700">{value}%</span>
      </div>
    </div>
  );
}

export default function HabitCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className="bg-white rounded-3xl p-6 shadow-sm shadow-slate-200 border border-slate-100"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-semibold text-slate-800">
            Today's Habits
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">2 of 3 completed</p>
        </div>
        <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 rounded-full px-3 py-1">
          <span className="text-sm">🔥</span>
          <span className="text-xs font-semibold text-amber-600">12 day streak</span>
        </div>
      </div>

      {/* Rings row */}
      <div className="flex items-center justify-around mb-5 py-2">
        {HABITS.map((h) => (
          <div key={h.label} className="flex flex-col items-center gap-2">
            <Ring value={h.value} color={h.color} />
            <span className="text-xs font-medium text-slate-500">{h.label}</span>
          </div>
        ))}
      </div>

      {/* Progress bars */}
      <div className="space-y-3">
        {HABITS.map((h) => {
          const Icon = h.icon;
          return (
            <div key={h.label}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-lg ${h.bgColor} flex items-center justify-center`}
                  >
                    <Icon size={12} className={h.iconColor} />
                  </div>
                  <span className="text-sm font-medium text-slate-600">
                    {h.label}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400">
                    {h.current} / {h.goal}
                  </span>
                  {h.done && (
                    <CheckCircle2 size={14} className="text-emerald-500" />
                  )}
                </div>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: h.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${h.value}%` }}
                  transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
