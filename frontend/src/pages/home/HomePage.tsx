import { motion } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import AIPreview from "../../components/landing/AIPreview";
import MoodSection from "../../components/landing/MoodSection";
import DashboardPreview from "../../components/landing/DashboardPreview";
import Testimonials from "../../components/landing/Testimonials";
import FAQ from "../../components/landing/FAQ";
import CTA from "../../components/landing/CTA";

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Navbar />
      <Hero />
      <MoodSection />
      <Features />
      <AIPreview />
      <DashboardPreview />
      <Testimonials />
      <FAQ />
      <CTA />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-8">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🌸</span>
            <span className="font-bold text-slate-900 font-[Sora,sans-serif]">Serena</span>
          </div>
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Serena. Your mental wellness, your way.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-violet-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-violet-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-violet-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
