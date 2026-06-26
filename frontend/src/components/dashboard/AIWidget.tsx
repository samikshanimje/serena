import { motion } from "framer-motion";
import { Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PROMPTS = [
  "How are you feeling right now?",
  "Let's do a breathing exercise 🌬️",
  "Tell me about your day",
];

export default function AIWidget() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-6 text-white shadow-xl shadow-violet-300/25"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-pink-400/15 rounded-full translate-y-1/2 -translate-x-1/4 blur-xl pointer-events-none" />

      <div className="relative">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
            <Sparkles size={17} />
          </div>
          <div>
            <p className="text-sm font-bold font-[Sora,sans-serif]">Serena AI</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-violet-200">Online now</span>
            </div>
          </div>
        </div>

        <p className="text-lg font-bold font-[Sora,sans-serif] leading-snug mb-1">Need someone to talk to? 💜</p>
        <p className="text-sm text-violet-200 mb-5 leading-relaxed">Judgment-free space to share, reflect, and feel supported.</p>

        <div className="space-y-2 mb-5">
          {PROMPTS.map((p) => (
            <motion.button
              key={p}
              whileHover={{ x: 4 }}
              onClick={() => navigate("/chat")}
              className="w-full text-left px-4 py-2.5 bg-white/15 hover:bg-white/25 rounded-2xl text-sm text-white/90 transition-all border border-white/10 flex items-center justify-between group"
            >
              <span>{p}</span>
              <ArrowRight size={13} className="text-white/40 group-hover:text-white transition-colors" />
            </motion.button>
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/chat")}
          className="w-full py-3 rounded-2xl bg-white text-violet-700 font-bold text-sm hover:bg-violet-50 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-violet-900/20"
        >
          <MessageCircle size={16} />Start conversation
        </motion.button>
      </div>
    </motion.div>
  );
}
