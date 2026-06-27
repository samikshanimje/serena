import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import JournalEditor from "./JournalEditor";
import { JournalEntry } from "../../services/journalService";

interface Props {
  open: boolean;
  onClose: () => void;
  entry?: JournalEntry | null;       // null = new entry
  onSave: (data: { title: string; content: string; mood?: string; tags: string[] }) => Promise<void>;
  saving: boolean;
}

export default function JournalModal({ open, onClose, entry, onSave, saving }: Props) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed inset-x-4 bottom-0 top-8 z-50 mx-auto flex max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl md:inset-x-0 md:bottom-6 md:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-7 py-4 shrink-0">
              <div className="flex items-center gap-3">
                {/* Drag handle (decorative) */}
                <div className="flex flex-col gap-1 md:hidden">
                  <div className="h-0.5 w-6 rounded-full bg-slate-300" />
                  <div className="h-0.5 w-4 rounded-full bg-slate-200" />
                </div>
                <h2 className="text-sm font-bold text-slate-800 hidden md:block font-[Sora,sans-serif]">
                  {entry ? "Edit entry" : "New entry"}
                </h2>
              </div>

              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                aria-label="Close editor"
              >
                <X size={17} />
              </button>
            </div>

            {/* Gradient top accent */}
            <div className="h-0.5 bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-400 shrink-0" />

            {/* Editor scroll area */}
            <div className="flex-1 overflow-y-auto px-7 py-6">
              <JournalEditor
                key={entry?._id ?? "new"}
                initial={entry}
                onSave={onSave}
                saving={saving}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
