import { useEffect, useState } from "react";

import {
  getLatestMood,
  getMoods,
} from "../services/moodService";

export default function useMood(token: string | null) {
  const [moods, setMoods] = useState<any[]>([]);
  const [latestMood, setLatestMood] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadMoods = async () => {
    if (!token) return;

    setLoading(true);

    try {
      const [allRes, latestRes] = await Promise.all([
        getMoods(token),
        getLatestMood(token),
      ]);

      setMoods(allRes.data.moods || []);
      setLatestMood(latestRes.data.mood || null);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadMoods();
  }, [token]);

  return {
    moods,
    latestMood,
    loading,
    refetch: loadMoods,
  };
}