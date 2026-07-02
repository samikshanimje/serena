import { useEffect, useState } from "react";
import { sendMessage, getChats, clearChats } from "../services/chatService";

export default function useChat(token: string | null) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Load chat history on mount
  useEffect(() => {
    const fetchHistory = async () => {
      if (!token) return;
      try {
        const res = await getChats(token);
        setMessages(res.data.chats || []);
      } catch (err) {
        console.error("Failed to load chat history:", err);
      }
    };
    fetchHistory();
  }, [token]);

  const send = async (text: string) => {
    if (!token || !text.trim()) return;

    setLoading(true);

    // Append user message immediately
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
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setLoading(false);
    }
  };

  const clear = async () => {
    if (!token) return;
    try {
      await clearChats(token);
      setMessages([]);
    } catch (err) {
      console.error("Failed to clear chat history:", err);
    }
  };

  return {
    messages,
    send,
    clear,
    loading,
  };
}