import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/75 backdrop-blur-xl border-b border-slate-100">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md shadow-violet-200">
            <span className="text-sm">🌸</span>
          </div>
          <span className="text-lg font-bold text-slate-900 font-[Sora,sans-serif]">Serena</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-violet-700 hover:bg-violet-50 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden gap-3 md:flex items-center">
          <Link
            to="/login"
            className="px-5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="px-5 py-2.5 rounded-2xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors shadow-md shadow-violet-200"
          >
            Get started free
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-500"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-violet-50 hover:text-violet-700 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                <Link to="/login" onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-2.5 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-700">
                  Sign in
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-2.5 rounded-2xl bg-violet-600 text-white text-sm font-semibold">
                  Get started free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
