import { motion } from "framer-motion";
import { PenLine, ArrowRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { JournalEntry } from "../../services/journalService";

interface Props {
  entry?: JournalEntry | null;
}

export default function JournalCard({ entry }: Props) {
  const navigate = useNavigate();

  const preview = entry?.content
    ? entry.content.slice(0, 160) + (entry.content.length > 160 ? "…" : "")
    : "Begin writing down your thoughts, reflections, and bright spots. Writing consistently develops emotional intelligence and clarity.";

  const formattedDate = entry?.createdAt
    ? new Date(entry.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "No recent entries";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center">
            <PenLine size={15} className="text-violet-500" />
          </div>
          <h2 className="text-base font-semibold text-slate-900 font-[Sora,sans-serif]">Journal</h2>
        </div>
        <button
          onClick={() => navigate("/journal")}
          className="text-xs text-violet-500 font-semibold hover:text-violet-700 transition-colors flex items-center gap-1 cursor-pointer"
        >
          All entries <ArrowRight size={12} />
        </button>
      </div>

      <div className="flex-1 bg-gradient-to-br from-violet-50/70 to-purple-50/70 rounded-2xl p-4 border border-violet-100/60">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="text-sm font-semibold text-slate-800 leading-snug truncate pr-2">
            {entry?.title || "Start your journal journey"}
          </span>
          {entry?.mood && (
            <span className="text-xs bg-white border border-violet-100 rounded-full px-2.5 py-0.5 text-slate-500 whitespace-nowrap shrink-0">
              {entry.mood}
            </span>
          )}
        </div>
        <p className="text-sm text-slate-500 leading-relaxed mb-3 line-clamp-3">
          {preview}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock size={11} />
          {formattedDate}
        </div>
      </div>

      <button
        onClick={() => navigate("/journal")}
        className="mt-4 w-full py-2.5 rounded-2xl border-2 border-dashed border-violet-200 text-sm text-violet-500 font-medium hover:bg-violet-50 hover:border-violet-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <PenLine size={14} />
        Write today's entry
      </button>
    </motion.div>
  );
}
