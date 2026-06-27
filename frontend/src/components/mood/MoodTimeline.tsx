import { motion } from "framer-motion";
import { Clock, StickyNote } from "lucide-react";

const MOOD_META: Record<string, { emoji: string; color: string; bg: string }> = {
  Amazing:  { emoji: "😄", color: "#10b981", bg: "bg-emerald-50" },
  Happy:    { emoji: "😊", color: "#8b5cf6", bg: "bg-violet-50" },
  Calm:     { emoji: "😌", color: "#38bdf8", bg: "bg-sky-50" },
  Neutral:  { emoji: "😐", color: "#94a3b8", bg: "bg-slate-100" },
  Sad:      { emoji: "😔", color: "#60a5fa", bg: "bg-blue-50" },
  "Very Sad":{ emoji: "😭", color: "#818cf8", bg: "bg-indigo-50" },
  Angry:    { emoji: "😡", color: "#f87171", bg: "bg-red-50" },
  Anxious:  { emoji: "😰", color: "#fb923c", bg: "bg-orange-50" },
};

function relativeDate(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff} days ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function parseNote(raw: string) {
  // Strip energy/stress meta prefixes, return human note
  const match = raw.match(/\|\s*(.+)$/);
  return match ? match[1].trim() : null;
}

interface MoodEntry {
  _id: string;
  mood: string;
  note: string;
  createdAt: string;
}

interface Props {
  moods: MoodEntry[];
  loading: boolean;
}

const DEMO: MoodEntry[] = [
  { _id: "1", mood: "Happy",    note: "Energy:4 Stress:2 Sleep:4 Water:3 | Great morning run!", createdAt: new Date(Date.now() - 86400000).toISOString() },
  { _id: "2", mood: "Anxious",  note: "Energy:2 Stress:4 Sleep:3 Water:2 | Big presentation today", createdAt: new Date(Date.now() - 2 * 86400000).toISOString() },
  { _id: "3", mood: "Calm",     note: "Energy:3 Stress:2 Sleep:5 Water:4 | Meditation session helped", createdAt: new Date(Date.now() - 3 * 86400000).toISOString() },
  { _id: "4", mood: "Amazing",  note: "Energy:5 Stress:1 Sleep:5 Water:5 | Best day in a while!", createdAt: new Date(Date.now() - 4 * 86400000).toISOString() },
  { _id: "5", mood: "Neutral",  note: "Energy:3 Stress:3 Sleep:3 Water:3", createdAt: new Date(Date.now() - 5 * 86400000).toISOString() },
];

export default function MoodTimeline({ moods, loading }: Props) {
  const entries = (moods?.length ? moods : DEMO).slice(0, 10);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-slate-900 font-[Sora,sans-serif]">Mood Timeline</h2>
          <p className="text-xs text-slate-400 mt-0.5">Your recent emotional journey</p>
        </div>
        <span className="text-xs text-violet-500 font-semibold bg-violet-50 px-3 py-1 rounded-full border border-violet-100">
          {entries.length} entries
        </span>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 rounded-2xl bg-slate-100 animate-pulse shrink-0" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-3 rounded-full bg-slate-100 animate-pulse w-24" />
                <div className="h-3 rounded-full bg-slate-100 animate-pulse w-48" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-violet-200 via-purple-100 to-transparent" />

          <div className="space-y-4">
            {entries.map((entry, i) => {
              const meta = MOOD_META[entry.mood] ?? { emoji: "🙂", color: "#94a3b8", bg: "bg-slate-100" };
              const humanNote = parseNote(entry.note);
              return (
                <motion.div
                  key={entry._id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="flex gap-4 group"
                >
                  {/* Emoji bubble */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    className={`relative z-10 h-10 w-10 shrink-0 rounded-2xl ${meta.bg} flex items-center justify-center text-xl border-2 border-white shadow-sm group-hover:shadow-md transition-all`}
                    style={{ boxShadow: `0 0 0 2px ${meta.color}22` }}
                  >
                    {meta.emoji}
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 min-w-0 rounded-2xl bg-white border border-slate-100 px-4 py-3 shadow-sm hover:shadow-md hover:border-slate-200 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-800">{entry.mood}</span>
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ color: meta.color, background: `${meta.color}18` }}
                        >
                          {i === 0 ? "Latest" : relativeDate(entry.createdAt)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400 shrink-0">
                        <Clock size={11} />
                        <span className="text-[10px]">
                          {new Date(entry.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                    {humanNote && (
                      <p className="mt-1.5 flex items-start gap-1.5 text-xs text-slate-500 leading-relaxed">
                        <StickyNote size={11} className="mt-0.5 shrink-0 text-slate-300" />
                        {humanNote}
                      </p>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
