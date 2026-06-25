import { motion } from "framer-motion";
import { PenLine, ArrowRight, Clock } from "lucide-react";

const RECENT_ENTRY = {
  title: "Finding peace in the little things",
  preview:
    "Today I noticed the way sunlight filtered through my window in the morning, and for the first time in a while, I just sat with it. No phone, no rushing…",
  mood: "😌 Peaceful",
  date: "Today, 9:14 AM",
  readTime: "2 min read",
};

export default function JournalCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="bg-white rounded-3xl p-6 shadow-sm shadow-slate-200 border border-slate-100 flex flex-col"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center">
            <PenLine size={15} className="text-violet-500" />
          </div>
          <h2 className="text-base font-semibold text-slate-800">
            Latest Journal
          </h2>
        </div>
        <button className="text-xs text-violet-500 font-medium hover:text-violet-700 transition-colors flex items-center gap-1">
          All entries <ArrowRight size={12} />
        </button>
      </div>

      {/* Entry Card */}
      <div className="flex-1 bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-4 border border-violet-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">
            {RECENT_ENTRY.title}
          </span>
          <span className="text-xs bg-white border border-violet-100 rounded-full px-2.5 py-0.5 text-slate-500">
            {RECENT_ENTRY.mood}
          </span>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed mb-3 line-clamp-3">
          {RECENT_ENTRY.preview}
        </p>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <Clock size={11} />
            {RECENT_ENTRY.date}
          </div>
          <span>·</span>
          <span>{RECENT_ENTRY.readTime}</span>
        </div>
      </div>

      <button className="mt-4 w-full py-2.5 rounded-2xl border-2 border-dashed border-violet-200 text-sm text-violet-500 font-medium hover:bg-violet-50 hover:border-violet-300 transition-all duration-200 flex items-center justify-center gap-2">
        <PenLine size={14} />
        Write today's entry
      </button>
    </motion.div>
  );
}
