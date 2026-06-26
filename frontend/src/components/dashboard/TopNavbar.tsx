import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, Bell, X, Command } from "lucide-react";

interface Props {
  onMenuClick: () => void;
  userName?: string;
}

const NOTIFS = [
  { id: 1, emoji: "🎉", text: "7-day mood streak! Keep it up.", time: "2m ago", unread: true },
  { id: 2, emoji: "💜", text: "Time for your evening reflection.", time: "1h ago", unread: true },
  { id: 3, emoji: "✅", text: "Sleep habit logged.", time: "8h ago", unread: false },
];

export default function TopNavbar({ onMenuClick, userName = "Samiksha" }: Props) {
  const [showNotifs, setShowNotifs] = useState(false);
  const unread = NOTIFS.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center px-4 md:px-6 bg-white/80 backdrop-blur-xl border-b border-slate-100 gap-3">
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl hover:bg-violet-50 text-slate-400 hover:text-violet-600 transition-colors"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Greeting */}
      <div className="hidden sm:block min-w-0">
        <p className="text-sm font-medium text-slate-700 truncate">
          Good to see you, <span className="text-violet-600 font-semibold">{userName}</span> 🌸
        </p>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-sm ml-auto sm:ml-6">
        <div className="relative group">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
          <input
            type="text"
            placeholder="Search…"
            className="w-full pl-9 pr-10 py-2 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent focus:bg-white placeholder:text-slate-400 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 pointer-events-none">
            <Command size={11} className="text-slate-300" />
            <span className="text-[11px] text-slate-300">K</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="relative">
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setShowNotifs((v) => !v)}
          className="relative p-2 rounded-xl hover:bg-violet-50 text-slate-500 hover:text-violet-600 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={20} />
          {unread > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-violet-600 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
              {unread}
            </span>
          )}
        </motion.button>

        <AnimatePresence>
          {showNotifs && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowNotifs(false)} />
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-80 bg-white rounded-3xl shadow-2xl shadow-slate-200/80 border border-slate-100 z-20 overflow-hidden"
              >
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-50">
                  <span className="text-sm font-semibold text-slate-800">Notifications</span>
                  <button
                    onClick={() => setShowNotifs(false)}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="divide-y divide-slate-50 max-h-80 overflow-y-auto">
                  {NOTIFS.map((n) => (
                    <div
                      key={n.id}
                      className={`px-5 py-3.5 flex gap-3 items-start hover:bg-slate-50 transition-colors cursor-default ${n.unread ? "bg-violet-50/40" : ""}`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center text-sm shrink-0">
                        {n.emoji}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-start gap-2">
                          <p className="text-sm text-slate-700 leading-snug flex-1">{n.text}</p>
                          {n.unread && <div className="w-2 h-2 rounded-full bg-violet-500 mt-1 shrink-0" />}
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3 border-t border-slate-50">
                  <button className="w-full text-xs text-violet-600 font-semibold hover:text-violet-700 transition-colors text-center">
                    Mark all as read
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Avatar */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="w-9 h-9 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-violet-200 cursor-pointer select-none"
        aria-label={`Logged in as ${userName}`}
      >
        {userName.charAt(0).toUpperCase()}
      </motion.div>
    </header>
  );
}
