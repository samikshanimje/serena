import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const MOOD_PREVIEW = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😌", label: "Calm" },
  { emoji: "😤", label: "Stressed" },
  { emoji: "🤩", label: "Excited" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-purple-50 min-h-[92vh] flex items-center">
      {/* Ambient blobs */}
      <div className="absolute top-[-120px] right-[-120px] w-[600px] h-[600px] rounded-full bg-violet-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-80px] w-[500px] h-[500px] rounded-full bg-pink-200/20 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-7 border border-violet-200"
          >
            <Sparkles size={14} />
            AI-powered wellness — 2026
          </motion.div>

          <h1 className="text-5xl lg:text-6xl font-bold leading-[1.08] text-slate-900 mb-6 font-[Sora,sans-serif]">
            Your safe space<br />
            for{" "}
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              mental wellness.
            </span>
          </h1>

          <p className="text-xl text-slate-500 leading-relaxed max-w-lg mb-10">
            Track your mood, journal freely, talk to your AI companion, and build habits that actually stick.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-violet-600 text-white font-bold hover:bg-violet-700 transition-colors shadow-xl shadow-violet-200 text-base"
              >
                Start for free <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="px-8 py-4 rounded-2xl border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition-colors text-base"
              >
                Sign in
              </motion.button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-10">
            {[
              { num: "25K+", label: "Users" },
              { num: "1M+", label: "Mood logs" },
              { num: "4.9★", label: "Rating" },
            ].map(({ num, label }) => (
              <div key={label}>
                <div className="text-2xl font-bold text-violet-700 font-[Sora,sans-serif]">{num}</div>
                <div className="text-sm text-slate-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — App preview card */}
        <motion.div
          initial={{ opacity: 0, x: 24, y: 16 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="absolute w-80 h-80 rounded-full bg-violet-300/25 blur-3xl -translate-x-8 translate-y-8 pointer-events-none" />

          <div className="relative w-80 rounded-[32px] bg-white shadow-2xl shadow-violet-200/60 p-6 border border-slate-100">
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <span>🌸</span>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Good morning</p>
                <p className="text-sm font-bold text-slate-900">Samiksha</p>
              </div>
              <div className="ml-auto flex items-center gap-1 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-emerald-600 font-semibold">Active</span>
              </div>
            </div>

            {/* Wellness score */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white mb-4">
              <p className="text-xs text-violet-200 font-medium mb-1">Wellness Score</p>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold font-[Sora,sans-serif]">86</span>
                <span className="text-2xl font-bold mb-1">%</span>
              </div>
              <div className="h-1.5 bg-white/20 rounded-full mt-3 overflow-hidden">
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "86%" }}
                  transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Mood picker */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-slate-500 mb-2.5">How are you feeling?</p>
              <div className="grid grid-cols-4 gap-2">
                {MOOD_PREVIEW.map(({ emoji, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-2xl text-center cursor-pointer transition-all border ${
                      i === 0
                        ? "bg-violet-50 border-violet-200"
                        : "bg-slate-50 border-transparent hover:border-violet-100"
                    }`}
                  >
                    <span className="text-xl">{emoji}</span>
                    <span className="text-[10px] font-medium text-slate-600">{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* AI message */}
            <div className="flex gap-2.5 items-start p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
                <Sparkles size={12} className="text-white" />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                You seem to be feeling good lately! Your mood has improved by 12% this week. 🎉
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
