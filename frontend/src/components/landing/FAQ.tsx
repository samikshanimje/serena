import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Is Serena a replacement for therapy?",
    a: "No. Serena is a personal wellness companion designed to help you track moods, reflect through journaling, and practice healthy habits. For serious mental health concerns, please seek a licensed professional.",
  },
  {
    q: "Is my data private and secure?",
    a: "Absolutely. All your journal entries, mood logs, and conversations are encrypted and stored securely. We never sell or share your personal data with third parties.",
  },
  {
    q: "How does the AI companion work?",
    a: "Serena AI is powered by Google's Gemini model. It's designed to be a compassionate, non-judgmental listener that helps you reflect and find clarity — not to diagnose or prescribe.",
  },
  {
    q: "Is Serena free to use?",
    a: "Serena offers a free tier with core features including mood tracking, journaling, and limited AI chats. A Pro plan unlocks unlimited AI conversations and advanced analytics.",
  },
  {
    q: "Can I delete my account and data?",
    a: "Yes, at any time. You can permanently delete your account and all associated data from your profile settings. We retain nothing after deletion.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white hover:border-violet-200 transition-colors">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 group"
        aria-expanded={open}
      >
        <span className="font-semibold text-slate-800 text-[15px] group-hover:text-violet-700 transition-colors">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown size={18} className={`transition-colors ${open ? "text-violet-500" : "text-slate-400"}`} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-50 pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-violet-50 text-violet-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-violet-100">
            FAQ
          </span>
          <h2 className="text-4xl font-bold text-slate-900 font-[Sora,sans-serif] mb-4">
            Frequently asked questions
          </h2>
          <p className="text-slate-500">Everything you need to know about Serena.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {FAQS.map((item) => (
            <FAQItem key={item.q} {...item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
