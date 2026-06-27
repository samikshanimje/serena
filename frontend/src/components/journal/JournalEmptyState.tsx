import { motion } from "framer-motion";
import { Feather, BookOpen } from "lucide-react";

interface Props { onNewEntry: () => void }

export default function JournalEmptyState({ onNewEntry }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center px-4"
    >
      {/* Illustration */}
      <div className="relative mb-10">
        {/* Pulsing rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-violet-200"
            animate={{ scale: [1, 1.5 + i * 0.35], opacity: [0.5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.65 }}
          />
        ))}

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-32 w-32 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center"
        >
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-xl shadow-violet-200">
            <BookOpen size={34} className="text-white" />
          </div>
        </motion.div>

        {/* Floating decorations */}
        {[
          { icon: "✍️", x: -65, y: -25, delay: 0 },
          { icon: "🌸", x: 60, y: -35, delay: 0.5 },
          { icon: "✨", x: -55, y: 40, delay: 1 },
          { icon: "💜", x: 60, y: 38, delay: 1.5 },
        ].map(({ icon, x, y, delay }) => (
          <motion.div
            key={icon}
            className="absolute text-xl select-none"
            style={{ top: "50%", left: "50%", marginLeft: x, marginTop: y }}
            animate={{ y: [0, -7, 0], rotate: [-4, 4, -4] }}
            transition={{ duration: 2.8, repeat: Infinity, delay, ease: "easeInOut" }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      <h3 className="text-2xl font-bold text-slate-900 font-[Sora,sans-serif] mb-3">
        Your journal is empty
      </h3>
      <p className="max-w-sm text-base text-slate-500 leading-relaxed mb-3">
        Every meaningful reflection starts with a single line. There's no right or wrong — just your honest thoughts.
      </p>
      <p className="text-sm text-slate-400 mb-10 italic">
        "Start writing, no matter what. The water does not flow until the faucet is turned on." — Louis L'Amour
      </p>

      <motion.button
        onClick={onNewEntry}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-violet-200 hover:from-violet-700 hover:to-purple-700 transition-all"
      >
        <Feather size={20} />
        Write your first entry
      </motion.button>
    </motion.div>
  );
}
