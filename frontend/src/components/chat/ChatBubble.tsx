import { motion } from "framer-motion";
import { Sparkles, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

interface Props {
  role: "user" | "assistant";
  message: string;
  timestamp?: string;
  isLatest?: boolean;
}

function formatLine(line: string) {
  // Format bold text (**bold**) and inline code (`code`)
  const parts = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, j) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={j} className="font-bold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={j} className="font-mono text-xs bg-slate-100 text-violet-700 px-1 py-0.5 rounded border border-slate-200">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={j}>{part}</span>;
  });
}

function renderMessage(text: string) {
  return text.split("\n").map((line, i) => {
    // List item parsing
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      const content = line.trim().substring(2);
      return (
        <li key={i} className="ml-4 list-disc text-sm mt-1 leading-relaxed text-slate-700">
          {formatLine(content)}
        </li>
      );
    }
    return (
      <p key={i} className={`text-sm leading-relaxed text-slate-700 ${i > 0 ? "mt-2" : ""}`}>
        {formatLine(line)}
      </p>
    );
  });
}

export default function ChatBubble({ role, message, timestamp }: Props) {
  const isUser = role === "user";
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const userName = user?.name ?? "User";
  const userInitial = userName.charAt(0).toUpperCase();

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
          <div className={`prose-chat ${isUser ? "text-white" : ""}`}>
            {isUser ? message.split("\n").map((l, i) => <p key={i} className={i > 0 ? "mt-1" : ""}>{l}</p>) : renderMessage(message)}
          </div>

          {/* Copy button for AI messages */}
          {!isUser && (
            <button
              onClick={copy}
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-violet-300 hover:text-violet-500 text-slate-400 cursor-pointer"
              aria-label="Copy message"
            >
              {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={11} />}
            </button>
          )}
        </div>

        {timestamp && (
          <span className="text-[10px] text-slate-400 px-1 mt-0.5">{timestamp}</span>
        )}
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="shrink-0 mt-1">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={userName}
              className="w-8 h-8 rounded-full border border-violet-100 object-cover shadow-sm"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              {userInitial}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
