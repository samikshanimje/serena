import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Feather, Tag, X, Check, Loader2, Hash, SmilePlus,
} from "lucide-react";
import { JournalEntry } from "../../services/journalService";

const MOODS = [
  { value: "Amazing",  emoji: "😄" },
  { value: "Happy",    emoji: "😊" },
  { value: "Calm",     emoji: "😌" },
  { value: "Neutral",  emoji: "😐" },
  { value: "Sad",      emoji: "😔" },
  { value: "Very Sad", emoji: "😭" },
  { value: "Angry",    emoji: "😡" },
  { value: "Anxious",  emoji: "😰" },
];

interface Props {
  initial?: JournalEntry | null;
  onSave: (data: { title: string; content: string; mood?: string; tags: string[] }) => Promise<void>;
  saving: boolean;
}

export default function JournalEditor({ initial, onSave, saving }: Props) {
  const [title,       setTitle]       = useState(initial?.title   ?? "");
  const [content,     setContent]     = useState(initial?.content ?? "");
  const [mood,        setMood]        = useState(initial?.mood    ?? "");
  const [tags,        setTags]        = useState<string[]>(initial?.tags ?? []);
  const [tagInput,    setTagInput]    = useState("");
  const [savedFlash,  setSavedFlash]  = useState(false);
  const [dirty,       setDirty]       = useState(false);
  const [showMoodPicker, setShowMoodPicker] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(240, el.scrollHeight)}px`;
  }, [content]);

  // Mark dirty on any change
  useEffect(() => { setDirty(true); }, [title, content, mood, tags]);

  // Focus title on mount
  useEffect(() => {
    if (!initial) setTimeout(() => document.getElementById("journal-title")?.focus(), 80);
  }, []);

  const handleAddTag = () => {
    const t = tagInput.trim().toLowerCase().replace(/\s+/g, "-");
    if (t && !tags.includes(t) && tags.length < 8) {
      setTags((p) => [...p, t]);
      setTagInput("");
    }
  };

  const handleSave = useCallback(async () => {
    if (!content.trim() && !title.trim()) return;
    await onSave({ title, content, mood: mood || undefined, tags });
    setSavedFlash(true);
    setDirty(false);
    setTimeout(() => setSavedFlash(false), 2200);
  }, [title, content, mood, tags, onSave]);

  const selectedMoodMeta = MOODS.find((m) => m.value === mood);
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const charCount = content.length;

  return (
    <div className="flex flex-col h-full">
      {/* ── Autosave indicator ── */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-xs">
          <AnimatePresence mode="wait">
            {saving ? (
              <motion.span key="saving" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-violet-500">
                <Loader2 size={12} className="animate-spin" />Saving…
              </motion.span>
            ) : savedFlash ? (
              <motion.span key="saved" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-emerald-500">
                <Check size={12} />Saved
              </motion.span>
            ) : dirty ? (
              <motion.span key="unsaved" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-slate-400">
                Unsaved changes
              </motion.span>
            ) : (
              <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-slate-300">
                All changes saved
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span>{wordCount} words</span>
          <span className={charCount > 4800 ? "text-amber-500" : ""}>{charCount} / 5000</span>
        </div>
      </div>

      {/* ── Title ── */}
      <input
        id="journal-title"
        type="text"
        placeholder="Give this entry a title…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={120}
        className="mb-5 w-full border-none bg-transparent text-2xl font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none font-[Sora,sans-serif]"
        aria-label="Journal entry title"
      />

      {/* ── Mood + Tags bar ── */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {/* Mood picker */}
        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => setShowMoodPicker((v) => !v)}
            className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm font-medium transition-all ${
              mood
                ? "border-violet-200 bg-violet-50 text-violet-700"
                : "border-slate-200 bg-white text-slate-500 hover:border-violet-200"
            }`}
          >
            {selectedMoodMeta ? (
              <><span>{selectedMoodMeta.emoji}</span>{selectedMoodMeta.value}</>
            ) : (
              <><SmilePlus size={14} />Add mood</>
            )}
          </motion.button>

          <AnimatePresence>
            {showMoodPicker && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowMoodPicker(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-10 z-20 grid grid-cols-4 gap-1.5 rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl"
                >
                  {MOODS.map((m) => (
                    <motion.button
                      key={m.value}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => { setMood(mood === m.value ? "" : m.value); setShowMoodPicker(false); }}
                      className={`flex flex-col items-center gap-0.5 rounded-xl p-2 text-sm transition-all ${
                        mood === m.value ? "bg-violet-100 ring-1 ring-violet-300" : "hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-xl">{m.emoji}</span>
                      <span className="text-[9px] text-slate-500 font-medium">{m.value}</span>
                    </motion.button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          {tags.map((tag) => (
            <motion.span
              key={tag}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600"
            >
              <Hash size={9} />{tag}
              <button onClick={() => setTags((p) => p.filter((t) => t !== tag))} className="ml-0.5 hover:text-red-400 transition-colors">
                <X size={9} />
              </button>
            </motion.span>
          ))}
          {tags.length < 8 && (
            <div className="flex items-center">
              <input
                type="text"
                placeholder="+ tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") { e.preventDefault(); handleAddTag(); }
                }}
                className="w-16 border-none bg-transparent text-xs text-slate-500 placeholder:text-slate-300 focus:outline-none focus:w-24 transition-all"
                aria-label="Add tag"
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="h-px bg-gradient-to-r from-violet-100 via-purple-100 to-transparent mb-5" />

      {/* ── Content ── */}
      <motion.textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value.slice(0, 5000))}
        placeholder="Begin writing… let your thoughts flow freely. This is your safe space."
        className="flex-1 w-full resize-none border-none bg-transparent text-slate-700 leading-8 placeholder:text-slate-300 focus:outline-none text-[15px]"
        style={{ minHeight: 240 }}
        aria-label="Journal entry content"
      />

      {/* ── Save button ── */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Feather size={12} />
          <span>Press <kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px]">Ctrl+S</kbd> to save</span>
        </div>

        <motion.button
          onClick={handleSave}
          disabled={saving || (!content.trim() && !title.trim())}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-200 hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 transition-all"
          onKeyDown={(e) => e.ctrlKey && e.key === "s" && handleSave()}
        >
          {saving ? <><Loader2 size={15} className="animate-spin" />Saving…</> : <><Check size={15} />Save entry</>}
        </motion.button>
      </div>
    </div>
  );
}
