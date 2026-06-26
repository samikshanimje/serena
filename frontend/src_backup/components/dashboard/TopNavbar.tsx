import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, Bell, X } from "lucide-react";

interface TopNavbarProps {
  onMenuClick: () => void;
  userName?: string;
}

const NOTIFICATIONS = [
  {
    id: 1,
    text: "Your mood streak hit 7 days! 🎉",
    time: "2m ago",
    unread: true,
  },
  {
    id: 2,
    text: "Time for your evening reflection.",
    time: "1h ago",
    unread: true,
  },
  {
    id: 3,
    text: "Sleep habit logged successfully.",
    time: "8h ago",
    unread: false,
  },
];

export default function TopNavbar({ onMenuClick, userName = "Samiksha" }: TopNavbarProps) {
  const [showNotifs, setShowNotifs] = useState(false);
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center px-4 md:px-6 bg-white/70 backdrop-blur-xl border-b border-violet-100 gap-4">
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl hover:bg-violet-50 text-slate-500 hover:text-violet-600 transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Greeting */}
      <div className="hidden sm:block">
        <p className="text-sm font-medium text-slate-800">
          Welcome back,{" "}
          <span className="text-violet-600">{userName}</span> 👋
        </p>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xs ml-auto sm:ml-4">
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent placeholder:text-slate-400 transition-all"
          />
        </div>
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setShowNotifs((v) => !v)}
          className="relative p-2 rounded-xl hover:bg-violet-50 text-slate-500 hover:text-violet-600 transition-colors"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-violet-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        <AnimatePresence>
          {showNotifs && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowNotifs(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-80 bg-white rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 z-20 overflow-hidden"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                  <span className="text-sm font-semibold text-slate-700">
                    Notifications
                  </span>
                  <button
                    onClick={() => setShowNotifs(false)}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="divide-y divide-slate-50">
                  {NOTIFICATIONS.map((n) => (
                    <div
                      key={n.id}
                      className={`px-4 py-3 flex gap-3 items-start hover:bg-slate-50 transition-colors ${
                        n.unread ? "bg-violet-50/40" : ""
                      }`}
                    >
                      {n.unread && (
                        <div className="w-2 h-2 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                      )}
                      <div className={n.unread ? "" : "pl-5"}>
                        <p className="text-sm text-slate-700">{n.text}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Avatar */}
      <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-violet-200 cursor-pointer select-none">
        {userName.charAt(0)}
      </div>
    </header>
  );
}
