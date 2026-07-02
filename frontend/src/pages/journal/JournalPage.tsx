import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";

import { useAuth } from "@/context/AuthContext";
import useJournal from "@/hooks/useJournal";
import useMood from "../../hooks/useMood";

import JournalEmptyState from "@/components/journal/JournalEmptyState";
//import JournalFilters from "@/components/journal/JournalFilters";
import JournalFilters, {
  type FilterState,
} from "../../components/journal/JournalFilters";
import JournalHeader from "@/components/journal/JournalHeader";
import JournalInsightCard from "@/components/journal/JournalInsightCard";
import JournalModal from "@/components/journal/JournalModal";
import JournalStats from "@/components/journal/JournalStats";
import JournalTimeline from "@/components/journal/JournalTimeline";
import type { JournalEntry } from "@/services/journalService";




/* ── Loading skeletons ─────────────────────────────────────────────────────── */
function CardSkeleton() {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm animate-pulse space-y-3">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-slate-100" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-40 rounded-full bg-slate-100" />
          <div className="h-3 w-24 rounded-full bg-slate-100" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 rounded-full bg-slate-100" />
        <div className="h-3 rounded-full bg-slate-100 w-4/5" />
        <div className="h-3 rounded-full bg-slate-100 w-3/5" />
      </div>
    </div>
  );
}

/* ── Filter + sort logic ───────────────────────────────────────────────────── */
function applyFilters(journals: JournalEntry[], filters: FilterState): JournalEntry[] {
  let result = [...journals];

  if (filters.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.content.toLowerCase().includes(q) ||
        (j.tags ?? []).some((t) => t.toLowerCase().includes(q))
    );
  }
  if (filters.mood)         result = result.filter((j) => j.mood === filters.mood);
  if (filters.tag)          result = result.filter((j) => (j.tags ?? []).includes(filters.tag));
  if (filters.favoritesOnly) result = result.filter((j) => j.favorite);

  result.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return filters.sort === "oldest" ? dateA - dateB : dateB - dateA;
  });

  // Pinned always float to top
  return [
    ...result.filter((j) => j.pinned),
    ...result.filter((j) => !j.pinned),
  ];
}

const DEFAULT_FILTERS: FilterState = {
  query: "", mood: "", tag: "", favoritesOnly: false, sort: "newest",
};

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as any },
});

export default function JournalPage() {
  const { token, user }  = useAuth();
  const { latestMood }   = useMood(token);
  const {
    journals, loading, saving,
    addJournal, editJournal, removeJournal,
  } = useJournal(token);

  const [filters,    setFilters]    = useState<FilterState>(DEFAULT_FILTERS);
  const [modalOpen,  setModalOpen]  = useState(false);
  const [editEntry,  setEditEntry]  = useState<JournalEntry | null>(null);
  const [selectedInsightEntryId, setSelectedInsightEntryId] = useState<string | null>(null);

  const userName = user?.name?.split(" ")[0] ?? "there";

  const activeInsightEntry = useMemo(() => {
    if (selectedInsightEntryId) {
      return journals.find((j) => j._id === selectedInsightEntryId) || journals[0] || null;
    }
    return journals[0] || null;
  }, [journals, selectedInsightEntryId]);

  /* Available tags from all entries */
  const availableTags = useMemo(() => {
    const set = new Set<string>();
    journals.forEach((j) => j.tags?.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [journals]);

  /* Filtered + sorted list */
  const filtered = useMemo(() => applyFilters(journals, filters), [journals, filters]);

  /* Writing streak (consecutive days with at least one entry) */
  const streak = useMemo(() => {
    const days = new Set(
      journals.map((j) => new Date(j.createdAt).toDateString())
    );
    let count = 0;
    let d = new Date();
    while (days.has(d.toDateString())) {
      count++;
      d.setDate(d.getDate() - 1);
    }
    return count;
  }, [journals]);

  /* ── Handlers ── */
  const openNew = () => { setEditEntry(null); setModalOpen(true); };
  const openEdit = (entry: JournalEntry) => { setEditEntry(entry); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditEntry(null); };

  const handleSave = async (data: { title: string; content: string; mood?: string; tags: string[] }) => {
    if (editEntry) {
      await editJournal(editEntry._id, data);
    } else {
      await addJournal(data);
    }
    closeModal();
  };

  const handlePin      = (id: string, pinned: boolean)   => editJournal(id, { pinned });
  const handleFavorite = (id: string, favorite: boolean) => editJournal(id, { favorite });

  const isEmpty = !loading && journals.length === 0;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-violet-200/20 dark:bg-dark-lavender/8 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-purple-200/15 dark:bg-dark-lavender-sec/6 blur-3xl" />
        <div className="absolute top-1/2 right-0 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-pink-100/15 dark:bg-dark-lavender/4 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8 space-y-6">

        {/* ── Header ── */}
        <motion.div {...fadeUp(0)}>
          <JournalHeader
            userName={userName}
            streak={streak}
            totalEntries={journals.length}
            currentMood={latestMood?.mood}
            onNewEntry={openNew}
          />
        </motion.div>

        {/* ── Weekly Stats ── */}
        {!isEmpty && (
          <motion.div {...fadeUp(0.07)}>
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
              <JournalStats journals={journals} />
            </div>
          </motion.div>
        )}

        {/* ── Main grid: list left, insights right ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* ── LEFT: Filters + Timeline ── */}
          <div className="xl:col-span-2 space-y-5">

            {/* Filters */}
            {!isEmpty && (
              <motion.div {...fadeUp(0.12)}>
                <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
                  <JournalFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    availableTags={availableTags}
                  />
                </div>
              </motion.div>
            )}

            {/* Loading skeletons */}
            {loading && (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => <CardSkeleton key={i} />)}
              </div>
            )}

            {/* Empty state */}
            {isEmpty && (
              <motion.div {...fadeUp(0.1)}>
                <div className="rounded-3xl border border-slate-100 bg-white shadow-sm">
                  <JournalEmptyState onNewEntry={openNew} />
                </div>
              </motion.div>
            )}

            {/* Zero filtered results */}
            {!loading && !isEmpty && filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-3xl border border-slate-100 bg-white p-12 text-center shadow-sm"
              >
                <p className="text-3xl mb-3">🔍</p>
                <p className="font-semibold text-slate-700 mb-1">No entries match your filters</p>
                <p className="text-sm text-slate-400 mb-5">Try adjusting your search or clearing the filters.</p>
                <button
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                  className="rounded-xl border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Clear filters
                </button>
              </motion.div>
            )}

            {/* Timeline */}
            {!loading && filtered.length > 0 && (
              <motion.div {...fadeUp(0.14)}>
                <JournalTimeline
                  entries={filtered}
                  onEdit={openEdit}
                  onDelete={removeJournal}
                  onPin={handlePin}
                  onFavorite={handleFavorite}
                  selectedId={activeInsightEntry?._id}
                  onSelect={(entry) => setSelectedInsightEntryId(entry._id)}
                />
              </motion.div>
            )}
          </div>

          {/* ── RIGHT: AI Insights ── */}
          {!isEmpty && (
            <motion.div {...fadeUp(0.18)}>
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8 sticky top-6">
                <JournalInsightCard entry={activeInsightEntry} />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── FAB ── */}
      <AnimatePresence>
        {!modalOpen && (
          <motion.button
            key="fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            onClick={openNew}
            className="fixed bottom-8 right-8 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-2xl shadow-violet-300/50 hover:from-violet-700 hover:to-purple-700 transition-all"
            aria-label="New journal entry"
          >
            <Plus size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Modal ── */}
      <JournalModal
        open={modalOpen}
        onClose={closeModal}
        entry={editEntry}
        onSave={handleSave}
        saving={saving}
        availableTags={availableTags}
      />
    </div>
  );
}
