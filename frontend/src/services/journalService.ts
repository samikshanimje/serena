import api from "./api";

// ── Types ────────────────────────────────────────────────────────────────────
export interface JournalEntry {
  _id: string;
  title: string;
  content: string;
  mood?: string;

  tags?: string[];
  pinned?: boolean;
  favorite?: boolean;

  aiAnalysis?: {
    emotion: string;
    stress: number;
    confidence: number;
    summary: string;
    recommendation: string;
    positiveMoments: string[];
    concerns: string[];
  };

  createdAt: string;
  updatedAt: string;
}

// ── CRUD ─────────────────────────────────────────────────────────────────────
export const getJournals = (token: string) =>
  api.get<{ journals: JournalEntry[] }>("/journals", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getJournalById = (id: string, token: string) =>
  api.get<{ journal: JournalEntry }>(`/journals/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createJournal = (
  data: { title: string; content: string; mood?: string; tags?: string[] },
  token: string
) =>
  api.post<{ journal: JournalEntry }>("/journals", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateJournal = (
  id: string,
  data: Partial<{ title: string; content: string; mood?: string; tags?: string[]; pinned?: boolean; favorite?: boolean }>,
  token: string
) =>
  api.put<{ journal: JournalEntry }>(`/journals/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteJournal = (id: string, token: string) =>
  api.delete(`/journals/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  export const getLatestJournal = (token: string) =>
    api.get("/journals/latest", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });