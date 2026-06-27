import { motion } from "framer-motion";
import { Sparkles, Copy, Check } from "lucide-react";
import { useState } from "react";

interface Props {
  role: "user" | "assistant";
  message: string;
  timestamp?: string;
  isLatest?: boolean;
}

function renderMessage(text: string) {
  // Simple markdown-like formatting
  return text
    .split("\n")
    .map((line, i) => {
      // Bold: **text**
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} className={i > 0 ? "mt-1.5" : ""}>
          {parts.map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={j}>{part.slice(2, -2)}</strong>
            ) : (
              <span key={j}>{part}</span>
            )
          )}
        </p>
      );
    });
}

export default function ChatBubble({ role, message, timestamp }: Props) {
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className={`flex gap-3 mb-5 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0 mt-1 shadow-md shadow-violet-200">
          <Sparkles size={14} className="text-white" />
        </div>
      )}

      <div className={`flex flex-col gap-1 max-w-[78%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`relative px-5 py-3.5 rounded-3xl text-sm leading-relaxed group ${
            isUser
              ? "bg-gradient-to-br from-violet-600 to-purple-600 text-white rounded-br-lg shadow-md shadow-violet-200/60"
              : "bg-white border border-slate-100 text-slate-800 rounded-bl-lg shadow-sm"
          }`}
        >
          <div className="prose-chat">{renderMessage(message)}</div>

          {/* Copy button for AI messages */}
          {!isUser && (
            <button
              onClick={copy}
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-violet-300 hover:text-violet-500 text-slate-400"
              aria-label="Copy message"
            >
              {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={11} />}
            </button>
          )}
        </div>

        {timestamp && (
          <span className="text-[11px] text-slate-400 px-1">{timestamp}</span>
        )}
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center shrink-0 mt-1 text-white text-xs font-bold">
          U
        </div>
      )}
    </motion.div>
  );
}
