import { ArrowLeft, Sparkles, MoreHorizontal, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

interface Props {
  onClear?: () => void;
}

export default function ChatHeader({ onClear }: Props) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`sticky top-0 z-50 transition-all border-b ${
        isDark
          ? "bg-dark-bg-sec/80 backdrop-blur-xl border-dark-border"
          : "bg-white/80 backdrop-blur-xl border-slate-100"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 gap-4">
        {/* Back */}
        <button
          onClick={() => navigate("/dashboard")}
          className={`p-2 rounded-2xl transition-all group flex items-center gap-2 cursor-pointer ${
            isDark
              ? "hover:bg-dark-card-el text-slate-400 hover:text-dark-lavender"
              : "hover:bg-slate-100 text-slate-500 hover:text-violet-600"
          }`}
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-sm font-medium hidden sm:inline">Dashboard</span>
        </button>

        {/* Identity */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md shadow-violet-200 dark:shadow-none">
              <Sparkles size={18} className="text-white" />
            </div>
            <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 ${
              isDark ? "border-dark-bg-sec" : "border-white"
            }`} />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white text-sm font-[Sora,sans-serif]">Serena AI</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">Your wellness companion</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {onClear && (
            <button
              onClick={onClear}
              title="Clear conversation"
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isDark ? "hover:bg-dark-card-el text-slate-500 hover:text-dark-lavender" : "hover:bg-slate-100 text-slate-400 hover:text-violet-600"
              }`}
            >
              <RefreshCw size={16} />
            </button>
          )}
          <button className={`p-2 rounded-xl transition-colors cursor-pointer ${
            isDark ? "hover:bg-dark-card-el text-slate-500 hover:text-dark-lavender" : "hover:bg-slate-100 text-slate-400 hover:text-violet-600"
          }`}>
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
