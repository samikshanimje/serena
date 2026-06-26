import { useEffect, useState } from "react";

import { getLatestMood } from "../services/moodService";

export default function useMood(token: string | null) {
  const [latestMood, setLatestMood] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    async function loadMood() {
      try {
        const res = await getLatestMood(token);

        setLatestMood(res.data.mood);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    }

    loadMood();
  }, [token]);

  return {
    latestMood,
    loading,
  };
}