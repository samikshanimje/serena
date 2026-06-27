import { useCallback, useEffect, useState } from "react";
import {
  getJournals,
  createJournal,
  updateJournal,
  deleteJournal,
} from "../services/journalService";

import type { JournalEntry } from "../services/journalService";

export default function useJournal(token: string | null) {
  const [journals, setJournals]   = useState<JournalEntry[]>([]);
  const [loading,  setLoading]    = useState(true);
  const [saving,   setSaving]     = useState(false);
  const [error,    setError]      = useState<string | null>(null);

  // ── Fetch all ──────────────────────────────────────────────────────────────
  const fetchJournals = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await getJournals(token);
      setJournals(res.data.journals ?? []);
    } catch (err) {
      console.error(err);
      setError("Failed to load journals.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchJournals(); }, [fetchJournals]);

  // ── Create ─────────────────────────────────────────────────────────────────
  const addJournal = useCallback(
    async (data: { title: string; content: string; mood?: string; tags?: string[] }) => {
      if (!token) return;
      try {
        setSaving(true);
        const res = await createJournal(data, token);
        setJournals((prev) => [res.data.journal, ...prev]);
        return res.data.journal;
      } catch (err) {
        console.error(err);
        setError("Failed to create journal.");
      } finally {
        setSaving(false);
      }
    },
    [token]
  );

  // ── Update ─────────────────────────────────────────────────────────────────
  const editJournal = useCallback(
    async (
      id: string,
      data: Partial<{ title: string; content: string; mood?: string; tags?: string[]; pinned?: boolean; favorite?: boolean }>
    ) => {
      if (!token) return;
      try {
        setSaving(true);
        const res = await updateJournal(id, data, token);
        setJournals((prev) =>
          prev.map((j) => (j._id === id ? res.data.journal : j))
        );
        return res.data.journal;
      } catch (err) {
        console.error(err);
        setError("Failed to update journal.");
      } finally {
        setSaving(false);
      }
    },
    [token]
  );

  // ── Delete ─────────────────────────────────────────────────────────────────
  const removeJournal = useCallback(
    async (id: string) => {
      if (!token) return;
      try {
        await deleteJournal(id, token);
        setJournals((prev) => prev.filter((j) => j._id !== id));
      } catch (err) {
        console.error(err);
        setError("Failed to delete journal.");
      }
    },
    [token]
  );

  return {
    journals,
    loading,
    saving,
    error,
    refetch: fetchJournals,
    addJournal,
    editJournal,
    removeJournal,
  };
}
