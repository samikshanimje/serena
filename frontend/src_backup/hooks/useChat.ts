import { useState } from "react";
import { sendMessage } from "../services/chatService";

export default function useChat(token: string | null) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const send = async (text: string) => {
    if (!token || !text.trim()) return;

    setLoading(true);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        message: text,
      },
    ]);

    try {
      const res = await sendMessage(text, token);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          message: res.data.reply,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    send,
    loading,
  };
}