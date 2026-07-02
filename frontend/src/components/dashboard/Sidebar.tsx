import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, SmilePlus, BookOpen, Bot,
  BarChart3, User, LogOut, X, Sparkles,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

const NAV = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Mood Tracker", icon: SmilePlus, to: "/mood" },
  { label: "Journal", icon: BookOpen, to: "/journal" },
  { label: "AI Companion", icon: Bot, to: "/chat" },
  { label: "Analytics", icon: BarChart3, to: "/analytics" },
  { label: "Profile", icon: User, to: "/profile" },
];

interface Props { open: boolean; onClose: () => void; }

function SidebarContent({ onClose }: { onClose: () => void }) {
  const { logout } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-dark-bg-sec border-r border-slate-100 dark:border-dark-border">
      {/* Logo */}
      <div className="px-5 pt-6 pb-7 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-200 dark:shadow-none">
            <span className="text-base leading-none">🌸</span>
          </div>
          <span className="text-lg font-bold text-slate-900 dark:text-white font-[Sora,sans-serif] tracking-tight">Serena</span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-xl hover:bg-violet-50 dark:hover:bg-dark-lavender/10 text-slate-400 hover:text-violet-600 dark:hover:text-dark-lavender transition-colors"
        >
          <X size={17} />
        </button>
      </div>

      {/* Nav label */}
      <div className="px-5 mb-2">
        <span className="text-[10px] font-semibold tracking-widest text-slate-400 dark:text-slate-500 uppercase">Menu</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {NAV.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => window.innerWidth < 1024 && onClose()}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 group cursor-pointer ${
                isActive
                  ? "bg-violet-600 text-white shadow-md shadow-violet-200/60 dark:bg-dark-lavender dark:text-black dark:shadow-none"
                  : "text-slate-500 hover:bg-violet-50 hover:text-violet-700 dark:text-slate-400 dark:hover:bg-dark-lavender/10 dark:hover:text-dark-lavender"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={17}
                  className={isActive ? "text-white dark:text-black" : "text-slate-400 dark:text-slate-500 group-hover:text-violet-500 dark:group-hover:text-dark-lavender transition-colors"}
                />
                {label}
                {label === "AI Companion" && (
                  <span className="ml-auto flex items-center gap-1 bg-violet-100 dark:bg-dark-lavender/10 text-violet-600 dark:text-dark-lavender text-[10px] font-bold px-2 py-0.5 rounded-full">
                    <Sparkles size={9} />AI
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-5">
        {/* Upgrade prompt */}
        <div className={`mb-4 p-4 rounded-2xl border transition-all ${
          isDark
            ? "bg-dark-card-el/40 border-dark-border"
            : "bg-gradient-to-br from-violet-50 to-purple-50 border-violet-100"
        }`}>
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles size={14} className={isDark ? "text-dark-lavender" : "text-violet-500"} />
            <span className={`text-xs font-semibold ${isDark ? "text-dark-lavender" : "text-violet-700"}`}>Pro plan</span>
          </div>
          <p className={`text-xs leading-relaxed mb-3 ${isDark ? "text-slate-400" : "text-slate-500"}`}>Unlock unlimited AI chats and advanced analytics.</p>
          <button className={`w-full py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            isDark
              ? "bg-dark-lavender text-black hover:bg-dark-lavender-hover"
              : "bg-violet-600 text-white hover:bg-violet-700"
          }`}>
            Upgrade
          </button>
        </div>

        <div className="h-px bg-slate-100 dark:bg-dark-border mb-3" />

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-400 transition-all group cursor-pointer"
        >
          <LogOut size={16} className="text-slate-400 dark:text-slate-500 group-hover:text-red-400 transition-colors" />
          Sign out
        </button>
      </div>
    </div>
  );
}

export default function Sidebar({ open, onClose }: Props) {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex w-60 shrink-0 h-screen sticky top-0">
        <SidebarContent onClose={onClose} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-60 z-50 shadow-2xl"
            >
              <SidebarContent onClose={onClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
