import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 px-10 py-16 text-center text-white shadow-2xl shadow-violet-300/40"
        >
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-pink-400/15 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl pointer-events-none" />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center mx-auto mb-6"
          >
            <Sparkles size={28} className="text-white" />
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold font-[Sora,sans-serif] mb-5 relative z-10 leading-tight">
            Start your wellness journey today.
          </h2>
          <p className="text-violet-200 text-lg max-w-xl mx-auto mb-10 relative z-10 leading-relaxed">
            Small daily habits create lifelong mental wellness. Join 25,000+ people who trust Serena.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-violet-700 font-bold hover:bg-violet-50 transition-colors shadow-xl shadow-violet-900/20 text-base"
              >
                Get started for free <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link to="/login">
              <button className="px-8 py-4 rounded-2xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors text-base">
                Already have an account
              </button>
            </Link>
          </div>

          <p className="text-violet-300 text-sm mt-6 relative z-10">
            Free to start · No credit card required · Private & secure
          </p>
        </motion.div>
      </div>
    </section>
  );
}
