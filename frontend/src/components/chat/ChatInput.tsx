import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Plus } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

interface Props {
  onSend: (message: string) => void;
  loading: boolean;
}

export default function ChatInput({ onSend, loading }: Props) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
    <div className={`border-t px-4 py-4 transition-all ${
      isDark ? "border-dark-border bg-dark-bg-sec/80 backdrop-blur-xl" : "border-slate-100 bg-white/80 backdrop-blur-xl"
    }`}>
      <div className="mx-auto max-w-3xl">
        <div className={`relative flex items-end gap-2 border rounded-3xl transition-all px-4 py-3 ${
          isDark
            ? "bg-dark-card border-dark-border focus-within:border-dark-lavender focus-within:ring-2 focus-within:ring-dark-lavender/10"
            : "bg-white border-slate-200 focus-within:border-violet-300 focus-within:ring-2 focus-within:ring-violet-100"
        }`}>
          {/* Attach */}
          <button
            type="button"
            className={`shrink-0 p-1.5 rounded-xl transition-colors cursor-pointer ${
              isDark ? "text-slate-500 hover:text-dark-lavender hover:bg-dark-lavender/10" : "text-slate-400 hover:text-violet-500 hover:bg-violet-50"
            }`}
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
            className={`flex-1 resize-none bg-transparent text-sm placeholder:text-slate-400 outline-none leading-relaxed py-1 max-h-40 ${
              isDark ? "text-white placeholder:text-slate-500" : "text-slate-900 placeholder:text-slate-400"
            }`}
            aria-label="Message input"
          />

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className={`shrink-0 p-1.5 rounded-xl transition-colors cursor-pointer ${
                isDark ? "text-slate-500 hover:text-dark-lavender hover:bg-dark-lavender/10" : "text-slate-400 hover:text-violet-500 hover:bg-violet-50"
              }`}
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
                className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                  canSend
                    ? (isDark
                        ? "bg-dark-lavender text-black hover:bg-dark-lavender-hover hover:scale-105 active:scale-95 shadow-lg"
                        : "bg-violet-600 text-white shadow-md shadow-violet-200 hover:bg-violet-700 hover:scale-105 active:scale-95")
                    : (isDark
                        ? "bg-dark-card-el text-slate-650 cursor-not-allowed"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed")
                }`}
                aria-label="Send message"
              >
                <Send size={16} />
              </motion.button>
            </AnimatePresence>
          </div>
        </div>

        <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-2">
          Serena is AI-powered and not a substitute for professional care. Press <kbd className={`px-1 py-0.5 rounded text-[10px] font-mono ${
            isDark ? "bg-dark-card-el text-slate-400" : "bg-slate-100"
          }`}>↵ Enter</kbd> to send.
        </p>
      </div>
    </div>
  );
}
