import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { addMood } from "../../services/moodService";

const MOODS = [
  { emoji: "😄", label: "Amazing",  value: "Amazing",  color: "#10b981", glow: "rgba(16,185,129,0.35)",  grad: "from-emerald-400 to-green-500",  bg: "bg-emerald-50" },
  { emoji: "😊", label: "Happy",    value: "Happy",    color: "#8b5cf6", glow: "rgba(139,92,246,0.35)",  grad: "from-violet-400 to-purple-500",  bg: "bg-violet-50" },
  { emoji: "😌", label: "Calm",     value: "Calm",     color: "#38bdf8", glow: "rgba(56,189,248,0.35)",  grad: "from-sky-400 to-cyan-400",       bg: "bg-sky-50" },
  { emoji: "😐", label: "Neutral",  value: "Neutral",  color: "#94a3b8", glow: "rgba(148,163,184,0.3)",  grad: "from-slate-400 to-slate-500",    bg: "bg-slate-100" },
  { emoji: "😔", label: "Sad",      value: "Sad",      color: "#60a5fa", glow: "rgba(96,165,250,0.35)",  grad: "from-blue-400 to-indigo-400",    bg: "bg-blue-50" },
  { emoji: "😭", label: "Very Sad", value: "Very Sad", color: "#818cf8", glow: "rgba(129,140,248,0.35)", grad: "from-indigo-400 to-violet-500",  bg: "bg-indigo-50" },
  { emoji: "😡", label: "Angry",    value: "Angry",    color: "#f87171", glow: "rgba(248,113,113,0.35)", grad: "from-red-400 to-rose-500",       bg: "bg-red-50" },
  { emoji: "😰", label: "Anxious",  value: "Anxious",  color: "#fb923c", glow: "rgba(251,146,60,0.35)",  grad: "from-orange-400 to-amber-400",   bg: "bg-orange-50" },
];

const ENERGY_LABELS   = ["Drained", "Low", "Moderate", "Good", "Energized"];
const STRESS_LABELS   = ["None",    "Mild","Moderate", "High", "Intense"];
const SLEEP_LABELS    = ["Poor", "Fair", "Okay", "Good", "Great"];

interface SliderProps {
  label: string;
  emoji: string;
  value: number;
  onChange: (v: number) => void;
  labels: string[];
  color: string;
}

function PremiumSlider({ label, emoji, value, onChange, labels, color }: SliderProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{emoji}</span>
          <span className="text-sm font-semibold text-slate-700">{label}</span>
        </div>
        <span className="text-sm font-bold px-2.5 py-0.5 rounded-full" style={{ color, background: `${color}18` }}>
          {labels[value - 1]}
        </span>
      </div>
      <div className="relative h-2 rounded-full bg-slate-100">
        <motion.div
          className="absolute h-2 rounded-full"
          style={{ background: `linear-gradient(to right, ${color}88, ${color})` }}
          animate={{ width: `${((value - 1) / 4) * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <input
          type="range" min={1} max={5} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-2"
          aria-label={label}
        />
        {/* Thumb dot */}
        <motion.div
          className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 -translate-x-1/2 rounded-full border-2 border-white shadow-md"
          style={{ left: `${((value - 1) / 4) * 100}%`, background: color }}
          animate={{ left: `${((value - 1) / 4) * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        {labels.map((l) => (
          <span key={l} className="text-[10px] text-slate-400">{l}</span>
        ))}
      </div>
    </div>
  );
}

interface Props {
  token: string | null;
  onLogged: () => void;
}

export default function MoodSelector({ token, onLogged }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [energy,   setEnergy]   = useState(3);
  const [stress,   setStress]   = useState(3);
  const [sleep,    setSleep]    = useState(3);
  const [water,    setWater]    = useState(3);
  const [note,     setNote]     = useState("");
  const [expanded, setExpanded] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [done,     setDone]     = useState(false);

  const selectedMood = MOODS.find((m) => m.value === selected);

  const handleLog = async () => {
    if (!selected || !token) return;
    setLoading(true);
    try {
      const fullNote = `Energy:${energy} Stress:${stress} Sleep:${sleep} Water:${water}${note ? ` | ${note}` : ""}`;
      await addMood(selected, fullNote, token);
      setDone(true);
      setTimeout(() => { onLogged(); setDone(false); }, 1800);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Emoji grid */}
      <div>
        <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-4">Select your mood</p>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {MOODS.map((mood, i) => {
            const isSelected = selected === mood.value;
            return (
              <motion.button
                key={mood.value}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, type: "spring", stiffness: 300 }}
                whileHover={{ y: -4, scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => { setSelected(mood.value); setExpanded(true); }}
                aria-pressed={isSelected}
                aria-label={`Mood: ${mood.label}`}
                className={`relative flex flex-col items-center gap-2 rounded-2xl p-3 pt-4 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                  isSelected
                    ? "bg-white shadow-xl"
                    : "bg-white/60 hover:bg-white border border-slate-100 shadow-sm"
                }`}
                style={isSelected ? {
                  boxShadow: `0 0 0 2px ${mood.color}, 0 8px 32px ${mood.glow}`,
                } : {}}
              >
                {/* Gradient border ring when selected */}
                {isSelected && (
                  <motion.div
                    layoutId="mood-ring"
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${mood.grad} opacity-10`}
                  />
                )}

                <motion.span
                  className="text-3xl md:text-4xl leading-none"
                  animate={isSelected ? { scale: [1, 1.25, 1], rotate: [0, -8, 8, 0] } : { scale: 1 }}
                  transition={{ duration: 0.45 }}
                >
                  {mood.emoji}
                </motion.span>
                <span className={`text-[11px] font-semibold ${isSelected ? "text-slate-800" : "text-slate-500"}`}>
                  {mood.label}
                </span>

                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full flex items-center justify-center"
                    style={{ background: mood.color }}
                  >
                    <Check size={11} className="text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Details panel */}
      <AnimatePresence>
        {selected && expanded && (
          <motion.div
            key="details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm space-y-7">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-2xl flex items-center justify-center text-xl"
                    style={{ background: `${selectedMood?.color}18` }}
                  >
                    {selectedMood?.emoji}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{selectedMood?.label}</p>
                    <p className="text-xs text-slate-400">Tell me more about how you're feeling</p>
                  </div>
                </div>
                <button
                  onClick={() => setExpanded(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <ChevronUp size={16} />
                </button>
              </div>

              {/* Sliders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <PremiumSlider
                  label="Energy Level" emoji="⚡" value={energy}
                  onChange={setEnergy} labels={ENERGY_LABELS} color="#8b5cf6"
                />
                <PremiumSlider
                  label="Stress Level" emoji="🌀" value={stress}
                  onChange={setStress} labels={STRESS_LABELS} color="#f87171"
                />
                <PremiumSlider
                  label="Sleep Quality" emoji="🌙" value={sleep}
                  onChange={setSleep} labels={SLEEP_LABELS} color="#38bdf8"
                />
                <PremiumSlider
                  label="Water Intake" emoji="💧" value={water}
                  onChange={setWater} labels={["None", "Little", "Some", "Good", "Lots"]} color="#34d399"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Notes <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <motion.textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value.slice(0, 280))}
                    placeholder="What's on your mind? Any thoughts, triggers, or moments worth noting…"
                    rows={3}
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100 transition-all"
                    whileFocus={{ scale: 1.005 }}
                    transition={{ duration: 0.15 }}
                  />
                  <span className={`absolute bottom-3 right-4 text-[11px] font-medium transition-colors ${note.length > 240 ? "text-amber-500" : "text-slate-400"}`}>
                    {note.length}/280
                  </span>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                onClick={handleLog}
                disabled={loading || done}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                className={`relative w-full py-4 rounded-2xl font-bold text-sm transition-all shadow-lg ${
                  done
                    ? "bg-emerald-500 text-white shadow-emerald-200"
                    : "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-violet-200 hover:from-violet-700 hover:to-purple-700 disabled:opacity-60"
                }`}
              >
                {done ? (
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <Check size={18} />Mood logged! 🎉
                  </motion.span>
                ) : loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={17} className="animate-spin" />Logging…
                  </span>
                ) : (
                  `Log my mood — ${selectedMood?.emoji} ${selectedMood?.label}`
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {selected && !expanded && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setExpanded(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-violet-200 bg-violet-50/50 py-3 text-sm font-medium text-violet-500 hover:bg-violet-50 transition-colors"
        >
          <ChevronDown size={15} />Add details &amp; log mood
        </motion.button>
      )}
    </div>
  );
}
