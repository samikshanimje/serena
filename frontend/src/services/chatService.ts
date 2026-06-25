import api from "./api";

export const sendMessage = (
  message: string,
  token: string
) =>
  api.post(
    "/chat",
    { message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getChats = (token: string) =>
  api.get("/chat", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });