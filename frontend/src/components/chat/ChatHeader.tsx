import { ArrowLeft, Sparkles, MoreHorizontal, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface Props {
  onClear?: () => void;
}

export default function ChatHeader({ onClear }: Props) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100"
    >
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 gap-4">
        {/* Back */}
        <button
          onClick={() => navigate("/dashboard")}
          className="p-2 rounded-2xl hover:bg-slate-100 text-slate-500 hover:text-violet-600 transition-all group flex items-center gap-2"
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-sm font-medium hidden sm:inline text-slate-600">Dashboard</span>
        </button>

        {/* Identity */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md shadow-violet-200">
              <Sparkles size={18} className="text-white" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-sm font-[Sora,sans-serif]">Serena AI</h2>
            <p className="text-xs text-slate-400">Your wellness companion</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {onClear && (
            <button
              onClick={onClear}
              title="Clear conversation"
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-violet-600 transition-colors"
            >
              <RefreshCw size={16} />
            </button>
          )}
          <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-violet-600 transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
