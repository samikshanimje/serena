import { motion } from "framer-motion";
import { JournalEntry } from "../../services/journalService";
import JournalCard from "./JournalCard";

function groupByDate(entries: JournalEntry[]) {
  const groups: Record<string, JournalEntry[]> = {};
  for (const entry of entries) {
    const d   = new Date(entry.createdAt);
    const now = new Date();
    const diff = Math.floor((now.getTime() - d.getTime()) / 86400000);
    let label: string;
    if (diff === 0) label = "Today";
    else if (diff === 1) label = "Yesterday";
    else if (diff < 7)  label = d.toLocaleDateString("en-US", { weekday: "long" });
    else label = d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    (groups[label] = groups[label] ?? []).push(entry);
  }
  return groups;
}

interface Props {
  entries: JournalEntry[];
  onEdit:     (entry: JournalEntry) => void;
  onDelete:   (id: string) => void;
  onPin:      (id: string, pinned: boolean) => void;
  onFavorite: (id: string, fav: boolean) => void;
}

export default function JournalTimeline({ entries, onEdit, onDelete, onPin, onFavorite }: Props) {
  const groups = groupByDate(entries);
  let cardIndex = 0;

  return (
    <div className="relative space-y-8">
      {/* Vertical connector */}
      <div className="pointer-events-none absolute left-[22px] top-6 bottom-0 w-px bg-gradient-to-b from-violet-200 via-purple-100 to-transparent" />

      {Object.entries(groups).map(([dateLabel, groupEntries]) => (
        <div key={dateLabel}>
          {/* Sticky date header */}
          <div className="relative flex items-center gap-3 mb-4">
            {/* Dot on timeline */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative z-10 h-[11px] w-[11px] shrink-0 rounded-full border-2 border-violet-400 bg-white shadow-sm ml-[17px]"
            />
            <div className="sticky top-2 z-10">
              <span className="inline-block rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
                {dateLabel}
              </span>
            </div>
          </div>

          {/* Entry cards */}
          <div className="ml-10 space-y-4">
            {groupEntries.map((entry) => {
              const idx = cardIndex++;
              return (
                <JournalCard
                  key={entry._id}
                  entry={entry}
                  index={idx}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onPin={onPin}
                  onFavorite={onFavorite}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
