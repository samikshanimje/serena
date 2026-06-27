import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, SlidersHorizontal, Heart, Tag, ChevronDown } from "lucide-react";

export interface FilterState {
  query: string;
  mood: string;
  tag: string;
  favoritesOnly: boolean;
  sort: "newest" | "oldest";
}

const MOODS = [
  { value: "", label: "All moods",  emoji: "✨" },
  { value: "Amazing",   label: "Amazing",   emoji: "😄" },
  { value: "Happy",     label: "Happy",     emoji: "😊" },
  { value: "Calm",      label: "Calm",      emoji: "😌" },
  { value: "Neutral",   label: "Neutral",   emoji: "😐" },
  { value: "Sad",       label: "Sad",       emoji: "😔" },
  { value: "Very Sad",  label: "Very Sad",  emoji: "😭" },
  { value: "Angry",     label: "Angry",     emoji: "😡" },
  { value: "Anxious",   label: "Anxious",   emoji: "😰" },
];

interface Props {
  filters: FilterState;
  onFiltersChange: (f: FilterState) => void;
  availableTags: string[];
}

export default function JournalFilters({ filters, onFiltersChange, availableTags }: Props) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [moodOpen, setMoodOpen]         = useState(false);

  const update = (patch: Partial<FilterState>) =>
    onFiltersChange({ ...filters, ...patch });

  const hasActive =
    filters.mood || filters.tag || filters.favoritesOnly || filters.query || filters.sort !== "newest";

  const selectedMood = MOODS.find((m) => m.value === filters.mood) ?? MOODS[0];

  return (
    <div className="space-y-3">
      {/* Search row */}
      <div className="flex gap-2">
        <div className="relative flex-1 group">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors"
          />
          <motion.input
            type="text"
            placeholder="Search entries…"
            value={filters.query}
            onChange={(e) => update({ query: e.target.value })}
            className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-9 pr-10 text-sm text-slate-800 placeholder:text-slate-400 focus:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-100 transition-all"
            whileFocus={{ scale: 1.005 }}
            transition={{ duration: 0.15 }}
          />
          <AnimatePresence>
            {filters.query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                onClick={() => update({ query: "" })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-500 transition-colors"
              >
                <X size={14} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Advanced toggle */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAdvanced((v) => !v)}
          className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-medium transition-all ${
            showAdvanced || hasActive
              ? "border-violet-300 bg-violet-50 text-violet-700"
              : "border-slate-200 bg-white text-slate-600 hover:border-violet-200"
          }`}
        >
          <SlidersHorizontal size={14} />
          <span className="hidden sm:inline">Filters</span>
          {hasActive && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white">
              !
            </span>
          )}
        </motion.button>

        {/* Favorites */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => update({ favoritesOnly: !filters.favoritesOnly })}
          className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-medium transition-all ${
            filters.favoritesOnly
              ? "border-pink-300 bg-pink-50 text-pink-600"
              : "border-slate-200 bg-white text-slate-500 hover:border-pink-200"
          }`}
          aria-pressed={filters.favoritesOnly}
          aria-label="Show favorites only"
        >
          <Heart size={14} className={filters.favoritesOnly ? "fill-pink-500" : ""} />
          <span className="hidden sm:inline">Favorites</span>
        </motion.button>
      </div>

      {/* Advanced panel */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-3 pt-1">
              {/* Mood dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMoodOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:border-violet-200 transition-colors"
                >
                  <span>{selectedMood.emoji}</span>
                  <span>{selectedMood.label}</span>
                  <ChevronDown size={13} className={`text-slate-400 transition-transform ${moodOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {moodOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setMoodOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-12 z-20 w-48 rounded-2xl border border-slate-100 bg-white shadow-xl overflow-hidden"
                      >
                        {MOODS.map((m) => (
                          <button
                            key={m.value}
                            onClick={() => { update({ mood: m.value }); setMoodOpen(false); }}
                            className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-violet-50 ${
                              filters.mood === m.value ? "bg-violet-50 text-violet-700 font-semibold" : "text-slate-700"
                            }`}
                          >
                            <span>{m.emoji}</span>{m.label}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Tag filter */}
              {availableTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {availableTags.slice(0, 8).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => update({ tag: filters.tag === tag ? "" : tag })}
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                        filters.tag === tag
                          ? "border-violet-300 bg-violet-100 text-violet-700"
                          : "border-slate-200 bg-white text-slate-600 hover:border-violet-200"
                      }`}
                    >
                      <Tag size={10} />
                      {tag}
                    </button>
                  ))}
                </div>
              )}

              {/* Sort */}
              <div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1">
                {(["newest", "oldest"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => update({ sort: s })}
                    className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all capitalize ${
                      filters.sort === s
                        ? "bg-violet-600 text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Clear all */}
              {hasActive && (
                <button
                  onClick={() => onFiltersChange({ query: "", mood: "", tag: "", favoritesOnly: false, sort: "newest" })}
                  className="flex items-center gap-1.5 rounded-2xl border border-red-100 bg-red-50 px-4 py-2.5 text-xs font-medium text-red-500 hover:bg-red-100 transition-colors"
                >
                  <X size={12} />Clear all
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
