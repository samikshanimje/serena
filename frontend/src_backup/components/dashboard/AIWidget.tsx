import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";


const PROMPTS = [
  "How are you feeling right now?",
  "Let's do a quick breathing exercise 🌬️",
  "Tell me about your day",
];

export default function AIWidget() {
    const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 p-6 text-white shadow-xl shadow-violet-200"
    >
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-xl pointer-events-none" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold">AI Companion</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-violet-200">Always here for you</span>
            </div>
          </div>
        </div>

        {/* CTA message */}
        <p className="text-lg font-semibold leading-snug mb-1">
          Need someone to talk to? 💜
        </p>
        <p className="text-sm text-violet-200 mb-5 leading-relaxed">
          Your private, judgment-free space to share, reflect, and feel supported — any time.
        </p>

        {/* Quick prompts */}
        <div className="space-y-2 mb-5">
          {PROMPTS.map((prompt) => (
            <button
              key={prompt}
              className="w-full text-left px-4 py-2.5 bg-white/15 hover:bg-white/25 rounded-2xl text-sm text-white/90 transition-all duration-200 backdrop-blur-sm border border-white/10 flex items-center justify-between group"
            >
              <span>{prompt}</span>
              <ArrowRight
                size={14}
                className="text-white/50 group-hover:text-white group-hover:translate-x-0.5 transition-all"
              />
            </button>
          ))}
        </div>

        {/* CTA button */}
        <button
  onClick={() => navigate("/chat")}
  className="w-full py-3 rounded-2xl bg-white text-violet-600 font-semibold text-sm hover:bg-violet-50 transition-colors shadow-lg shadow-violet-800/20 flex items-center justify-center gap-2"
>
  <MessageCircle size={16} />
  Start a conversation
</button>
      </div>
    </motion.div>
  );
}
