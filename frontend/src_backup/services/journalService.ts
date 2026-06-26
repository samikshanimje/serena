import api from "./api";

export const createJournal = (
  data: any,
  token: string
) =>
  api.post("/journals", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getJournals = (
  token: string
) =>
  api.get("/journals", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });