import { motion } from "framer-motion";
import { SmilePlus } from "lucide-react";

interface Props {
  onStart: () => void;
}

export default function MoodEmptyState({ onStart }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      {/* SVG Illustration */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="mb-8 relative"
      >
        <div className="relative h-40 w-40 mx-auto">
          {/* Ambient rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-violet-200"
              animate={{ scale: [1, 1.5 + i * 0.3], opacity: [0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
            />
          ))}

          {/* Main circle */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-xl shadow-violet-200">
              <SmilePlus size={36} className="text-white" />
            </div>
          </div>
        </div>

        {/* Floating emojis */}
        {[
          { emoji: "😊", x: -60, y: -20, delay: 0 },
          { emoji: "🌸", x: 60, y: -30, delay: 0.4 },
          { emoji: "✨", x: -50, y: 40, delay: 0.8 },
          { emoji: "💜", x: 55, y: 35, delay: 1.2 },
        ].map(({ emoji, x, y, delay }) => (
          <motion.div
            key={emoji}
            className="absolute text-2xl select-none"
            style={{ top: "50%", left: "50%", marginLeft: x, marginTop: y }}
            animate={{ y: [0, -6, 0], rotate: [-5, 5, -5] }}
            transition={{ duration: 2.5, repeat: Infinity, delay, ease: "easeInOut" }}
          >
            {emoji}
          </motion.div>
        ))}
      </motion.div>

      <h3 className="text-2xl font-bold text-slate-900 font-[Sora,sans-serif] mb-3">
        No moods logged yet
      </h3>
      <p className="text-slate-500 text-base max-w-xs leading-relaxed mb-8">
        Every big journey starts with a single check-in. Take 30 seconds to log how you're feeling right now.
      </p>

      <motion.button
        onClick={onStart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold shadow-xl shadow-violet-200 hover:from-violet-700 hover:to-purple-700 transition-all"
      >
        <SmilePlus size={20} />
        Log my first mood
      </motion.button>
    </motion.div>
  );
}
