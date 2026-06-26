import api from "./api";

export const addMood = (
  mood: string,
  note: string,
  token: string
) =>
  api.post(
    "/moods",
    {
      mood,
      note,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getMoods = (token: string) =>
  api.get("/moods", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getLatestMood = (token: string) =>
  api.get("/moods/latest", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });