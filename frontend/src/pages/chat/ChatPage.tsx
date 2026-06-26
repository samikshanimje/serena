import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Wind, Sun, Moon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import ChatBubble from "../../components/chat/ChatBubble";
import ChatHeader from "../../components/chat/ChatHeader";
import ChatInput from "../../components/chat/ChatInput";
import TypingIndicator from "../../components/chat/TypingIndicator";
import useChat from "../../hooks/useChat";

const SUGGESTIONS = [
  { icon: Heart, label: "I'm feeling anxious", prompt: "I've been feeling anxious lately and I'm not sure why." },
  { icon: Wind, label: "Breathing exercise", prompt: "Can we do a breathing exercise together?" },
  { icon: Sun, label: "Celebrate a win", prompt: "I want to share something positive that happened today!" },
  { icon: Moon, label: "Can't sleep", prompt: "I'm having trouble sleeping. Can you help?" },
];

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatPage() {
  const { token, user } = useAuth();
  const { messages, send, loading } = useChat(token);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [msgTimes] = useState(() => new Map<number, string>());
  const [nextIdx, setNextIdx] = useState(0);

  // Track timestamps for messages
  useEffect(() => {
    if (messages.length > nextIdx) {
      for (let i = nextIdx; i < messages.length; i++) {
        msgTimes.set(i, formatTime(new Date()));
      }
      setNextIdx(messages.length);
    }
  }, [messages.length]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const userName = user?.name?.split(" ")[0] ?? "there";

  const handleSend = (text: string) => {
    send(text);
  };

  const handleSuggestion = (prompt: string) => {
    send(prompt);
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <ChatHeader onClear={undefined} />

      <div className="flex-1 flex flex-col mx-auto w-full max-w-3xl min-h-0">
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 py-6">

          {/* Empty state / welcome */}
          <AnimatePresence>
            {isEmpty && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center mb-10 pt-4"
              >
                {/* Avatar */}
                <motion.div
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-5 shadow-xl shadow-violet-300/40"
                >
                  <Sparkles size={32} className="text-white" />
                </motion.div>

                <h2 className="text-2xl font-bold text-slate-900 font-[Sora,sans-serif] mb-2">
                  Hi {userName} 🌸
                </h2>
                <p className="text-slate-500 text-sm max-w-xs leading-relaxed mb-8">
                  I'm Serena, your personal wellness companion. How are you feeling today? I'm here to listen.
                </p>

                {/* Suggestion chips */}
                <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                  {SUGGESTIONS.map(({ icon: Icon, label, prompt }) => (
                    <motion.button
                      key={label}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSuggestion(prompt)}
                      className="flex items-center gap-2.5 p-3.5 bg-white rounded-2xl border border-slate-100 shadow-sm text-left hover:border-violet-200 hover:shadow-md hover:shadow-violet-50 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-xl bg-violet-50 group-hover:bg-violet-100 flex items-center justify-center transition-colors shrink-0">
                        <Icon size={16} className="text-violet-500" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">{label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Initial AI greeting when conversation starts */}
          {!isEmpty && (
            <ChatBubble
              role="assistant"
              message={`Hi ${userName} 🌸 How are you feeling today?`}
              timestamp="Just now"
            />
          )}

          {/* Messages */}
          {messages.map((msg, i) => (
            <ChatBubble
              key={i}
              role={msg.role}
              message={msg.message}
              timestamp={msgTimes.get(i)}
              isLatest={i === messages.length - 1}
            />
          ))}

          {/* Typing indicator */}
          <AnimatePresence>
            {loading && <TypingIndicator />}
          </AnimatePresence>

          <div ref={bottomRef} />
        </div>

        {/* Input — stays at bottom */}
        <ChatInput onSend={handleSend} loading={loading} />
      </div>
    </div>
  );
}
