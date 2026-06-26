import { useAuth } from "@/context/AuthContext";
import ChatBubble from "@/components/chat/ChatBubble";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import TypingIndicator from "@/components/chat/TypingIndicator";
import useChat from "@/hooks/useChat";

export default function ChatPage() {
  const { token } = useAuth();

  const {
    messages,
    send,
    loading,
  } = useChat(token);

  return (
    <div className="min-h-screen bg-slate-100">
      <ChatHeader />

      <div className="mx-auto flex h-[calc(100vh-64px)] max-w-4xl flex-col">

        <div className="flex-1 overflow-y-auto p-6">

          {messages.length === 0 && (
            <ChatBubble
              role="assistant"
              message="Hi Samiksha 🌸 How are you feeling today?"
            />
          )}

          {messages.map((msg, index) => (
            <ChatBubble
              key={index}
              role={msg.role}
              message={msg.message}
            />
          ))}

          {loading && <TypingIndicator />}

        </div>

        <ChatInput
          onSend={send}
          loading={loading}
        />

      </div>
    </div>
  );
}