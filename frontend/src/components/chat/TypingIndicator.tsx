import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      className="flex gap-3 mb-5"
    >
      <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0 shadow-md shadow-violet-200">
        <Sparkles size={14} className="text-white" />
      </div>
      <div className="flex items-center gap-1.5 px-5 py-3.5 bg-white border border-slate-100 rounded-3xl rounded-bl-lg shadow-sm">
        {[0, 0.18, 0.36].map((delay, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-violet-400"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.9, repeat: Infinity, delay, ease: "easeInOut" }}
          />
        ))}
      </div>
    </motion.div>
  );
}
