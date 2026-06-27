import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pin, Heart, Edit3, Trash2, Clock, Tag,
  MoreHorizontal, X, BookOpen,
} from "lucide-react";
import type { JournalEntry } from "../../services/journalService";

const MOOD_META: Record<string, { emoji: string; color: string; bg: string }> = {
  Amazing:   { emoji: "😄", color: "#10b981", bg: "bg-emerald-50" },
  Happy:     { emoji: "😊", color: "#8b5cf6", bg: "bg-violet-50" },
  Calm:      { emoji: "😌", color: "#38bdf8", bg: "bg-sky-50" },
  Neutral:   { emoji: "😐", color: "#94a3b8", bg: "bg-slate-100" },
  Sad:       { emoji: "😔", color: "#60a5fa", bg: "bg-blue-50" },
  "Very Sad":{ emoji: "😭", color: "#818cf8", bg: "bg-indigo-50" },
  Angry:     { emoji: "😡", color: "#f87171", bg: "bg-red-50" },
  Anxious:   { emoji: "😰", color: "#fb923c", bg: "bg-orange-50" },
};

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const mins  = Math.max(1, Math.ceil(words / 200));
  return `${mins} min read`;
}

function relDate(dateStr: string) {
  const d = new Date(dateStr);
  const diff = Math.floor((Date.now() - d.getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7)  return `${diff}d ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

interface Props {
  entry: JournalEntry;
  onEdit:     (entry: JournalEntry) => void;
  onDelete:   (id: string) => void;
  onPin:      (id: string, pinned: boolean) => void;
  onFavorite: (id: string, fav: boolean) => void;
  index?: number;
}

export default function JournalCard({ entry, onEdit, onDelete, onPin, onFavorite, index = 0 }: Props) {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);

  const mood = entry.mood ? MOOD_META[entry.mood] : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`group relative rounded-3xl border bg-white p-6 shadow-sm hover:shadow-xl hover:shadow-violet-100/50 transition-all ${
        entry.pinned ? "border-violet-200 ring-1 ring-violet-200/50" : "border-slate-100"
      }`}
    >
      {/* Pin ribbon */}
      {entry.pinned && (
        <div className="absolute -top-2 left-5 flex items-center gap-1 rounded-full bg-violet-600 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-md">
          <Pin size={9} />Pinned
        </div>
      )}

      {/* Top row */}
      <div className="flex items-start gap-3 mb-3">
        {/* Mood emoji */}
        {mood && (
          <motion.div
            whileHover={{ scale: 1.2, rotate: -5 }}
            className={`h-10 w-10 shrink-0 rounded-2xl ${mood.bg} flex items-center justify-center text-xl shadow-sm`}
          >
            {mood.emoji}
          </motion.div>
        )}
        {!mood && (
          <div className="h-10 w-10 shrink-0 rounded-2xl bg-slate-100 flex items-center justify-center">
            <BookOpen size={18} className="text-slate-400" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-900 text-base leading-snug truncate pr-2">
            {entry.title || "Untitled entry"}
          </h3>
          <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
            <span>{relDate(entry.createdAt)}</span>
            <span>·</span>
            <Clock size={10} />
            <span>{readingTime(entry.content)}</span>
            {mood && (
              <>
                <span>·</span>
                <span style={{ color: mood.color }} className="font-medium">{entry.mood}</span>
              </>
            )}
          </div>
        </div>

        {/* Action menu */}
        <div className="relative shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v); }}
            className="p-1.5 rounded-xl text-slate-300 hover:text-slate-500 hover:bg-slate-100 opacity-0 group-hover:opacity-100 transition-all"
            aria-label="Entry actions"
          >
            <MoreHorizontal size={16} />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-8 z-20 w-44 rounded-2xl border border-slate-100 bg-white shadow-2xl overflow-hidden py-1"
                >
                  <button
                    onClick={() => { onEdit(entry); setMenuOpen(false); }}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-colors"
                  >
                    <Edit3 size={14} />Edit
                  </button>
                  <button
                    onClick={() => { onPin(entry._id, !entry.pinned); setMenuOpen(false); }}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-colors"
                  >
                    <Pin size={14} />{entry.pinned ? "Unpin" : "Pin"}
                  </button>
                  <button
                    onClick={() => { onFavorite(entry._id, !entry.favorite); setMenuOpen(false); }}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                  >
                    <Heart size={14} className={entry.favorite ? "fill-pink-500 text-pink-500" : ""} />
                    {entry.favorite ? "Unfavorite" : "Favorite"}
                  </button>
                  <div className="h-px bg-slate-100 my-1" />
                  <button
                    onClick={() => { setConfirmDel(true); setMenuOpen(false); }}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={14} />Delete
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Preview */}
      <p
        className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-4 cursor-pointer hover:text-slate-700 transition-colors"
        onClick={() => onEdit(entry)}
      >
        {entry.content || <span className="italic text-slate-400">No content yet…</span>}
      </p>

      {/* Tags */}
      {(entry.tags ?? []).length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {(entry.tags ?? []).map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
              <Tag size={9} />{tag}
            </span>
          ))}
        </div>
      )}

      {/* Bottom row */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
        <span className="text-[11px] text-slate-400">
          {new Date(entry.createdAt).toLocaleDateString("en-US", {
            month: "short", day: "numeric", year: "numeric",
          })}
        </span>

        <div className="flex items-center gap-1">
          {/* Favorite toggle */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => onFavorite(entry._id, !entry.favorite)}
            className={`p-2 rounded-xl transition-colors ${
              entry.favorite ? "text-pink-500" : "text-slate-300 hover:text-pink-400"
            }`}
            aria-label="Toggle favorite"
          >
            <Heart size={15} className={entry.favorite ? "fill-pink-500" : ""} />
          </motion.button>

          {/* Edit shortcut */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => onEdit(entry)}
            className="p-2 rounded-xl text-slate-300 hover:text-violet-500 transition-colors"
            aria-label="Edit entry"
          >
            <Edit3 size={15} />
          </motion.button>
        </div>
      </div>

      {/* Delete confirm overlay */}
      <AnimatePresence>
        {confirmDel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 rounded-3xl flex flex-col items-center justify-center gap-4 bg-white/95 backdrop-blur-sm p-6 text-center"
          >
            <Trash2 size={28} className="text-red-400" />
            <div>
              <p className="font-bold text-slate-900 mb-1">Delete this entry?</p>
              <p className="text-sm text-slate-500">This cannot be undone.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDel(false)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <X size={14} />Cancel
              </button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => { onDelete(entry._id); setConfirmDel(false); }}
                className="px-5 py-2.5 rounded-2xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors shadow-md shadow-red-200"
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
