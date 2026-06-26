import { useEffect, useState } from "react";
import {
  createJournal,
  getJournals,
} from "../services/journalService";

export default function useJournal(
  token: string | null
) {
  const [journals, setJournals] = useState<any[]>([]);

  const load = async () => {
    if (!token) return;

    const res = await getJournals(token);

    setJournals(res.data.journals);
  };

  useEffect(() => {
    load();
  }, [token]);

  const addJournal = async (
    title: string,
    content: string,
    mood: string
  ) => {
    if (!token) return;

    await createJournal(
      {
        title,
        content,
        mood,
      },
      token
    );

    load();
  };

  return {
    journals,
    addJournal,
  };
}