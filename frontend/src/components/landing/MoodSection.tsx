import { motion } from "framer-motion";

const MOODS = [
  { emoji: "😁", title: "Amazing", color: "from-emerald-400 to-green-500", bg: "bg-emerald-50", border: "border-emerald-100", text: "text-emerald-700" },
  { emoji: "😊", title: "Good", color: "from-violet-400 to-purple-500", bg: "bg-violet-50", border: "border-violet-100", text: "text-violet-700" },
  { emoji: "😐", title: "Okay", color: "from-amber-400 to-yellow-500", bg: "bg-amber-50", border: "border-amber-100", text: "text-amber-700" },
  { emoji: "😔", title: "Low", color: "from-orange-400 to-red-400", bg: "bg-orange-50", border: "border-orange-100", text: "text-orange-700" },
  { emoji: "😭", title: "Stressed", color: "from-red-400 to-pink-500", bg: "bg-red-50", border: "border-red-100", text: "text-red-700" },
];

export default function MoodSection() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-white text-slate-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-slate-200 shadow-sm">
            Daily Check-in
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 font-[Sora,sans-serif] mb-4">
            How are you feeling today?
          </h2>
          <p className="text-slate-500 text-lg max-w-md mx-auto">
            Check in with yourself in just one tap. No judgment, just presence.
          </p>
        </motion.div>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {MOODS.map((mood, i) => (
            <motion.button
              key={mood.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -6, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`${mood.bg} ${mood.border} border rounded-3xl p-7 text-center flex flex-col items-center gap-3 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 group`}
            >
              <motion.span
                className="text-5xl block"
                animate={{ rotate: [0, -5, 5, -3, 3, 0] }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              >
                {mood.emoji}
              </motion.span>
              <span className={`text-base font-bold font-[Sora,sans-serif] ${mood.text}`}>
                {mood.title}
              </span>
              <div className={`h-1 w-8 rounded-full bg-gradient-to-r ${mood.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
