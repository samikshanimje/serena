import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Plus } from "lucide-react";

interface Props {
  onSend: (message: string) => void;
  loading: boolean;
}

export default function ChatInput({ onSend, loading }: Props) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [message]);

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed || loading) return;
    onSend(trimmed);
    setMessage("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = message.trim().length > 0 && !loading;

  return (
    <div className="border-t border-slate-100 bg-white/80 backdrop-blur-xl px-4 py-4">
      <div className="mx-auto max-w-3xl">
        <div className="relative flex items-end gap-2 bg-white border border-slate-200 rounded-3xl shadow-sm focus-within:border-violet-300 focus-within:ring-2 focus-within:ring-violet-100 transition-all px-4 py-3">
          {/* Attach */}
          <button
            type="button"
            className="shrink-0 p-1.5 rounded-xl text-slate-400 hover:text-violet-500 hover:bg-violet-50 transition-colors"
            aria-label="Attach file"
          >
            <Plus size={18} />
          </button>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Share how you're feeling…"
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none leading-relaxed py-1 max-h-40"
            aria-label="Message input"
          />

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="p-1.5 rounded-xl text-slate-400 hover:text-violet-500 hover:bg-violet-50 transition-colors"
              aria-label="Voice message"
            >
              <Mic size={16} />
            </button>

            <AnimatePresence mode="wait">
              <motion.button
                key={canSend ? "active" : "idle"}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.15 }}
                type="button"
                disabled={!canSend}
                onClick={handleSend}
                className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
                  canSend
                    ? "bg-violet-600 text-white shadow-md shadow-violet-200 hover:bg-violet-700 hover:scale-105 active:scale-95"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
                aria-label="Send message"
              >
                <Send size={16} className={canSend ? "" : ""} />
              </motion.button>
            </AnimatePresence>
          </div>
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-2">
          Serena is AI-powered and not a substitute for professional care. Press <kbd className="px-1 py-0.5 bg-slate-100 rounded text-[10px] font-mono">↵ Enter</kbd> to send.
        </p>
      </div>
    </div>
  );
}
