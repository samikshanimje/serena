import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, SmilePlus, BookOpen, Bot,
  CheckSquare, BarChart3, User, LogOut, X, Sparkles,
} from "lucide-react";

const NAV = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Mood Tracker", icon: SmilePlus, to: "/mood" },
  { label: "Journal", icon: BookOpen, to: "/journal" },
  { label: "AI Companion", icon: Bot, to: "/chat" },
  { label: "Habits", icon: CheckSquare, to: "/habits" },
  { label: "Analytics", icon: BarChart3, to: "/analytics" },
  { label: "Profile", icon: User, to: "/profile" },
];

interface Props { open: boolean; onClose: () => void; }

function SidebarContent({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-100">
      {/* Logo */}
      <div className="px-5 pt-6 pb-7 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-200">
            <span className="text-base leading-none">🌸</span>
          </div>
          <span className="text-lg font-bold text-slate-900 font-[Sora,sans-serif] tracking-tight">Serena</span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-xl hover:bg-violet-50 text-slate-400 hover:text-violet-600 transition-colors"
        >
          <X size={17} />
        </button>
      </div>

      {/* Nav label */}
      <div className="px-5 mb-2">
        <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">Menu</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {NAV.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => window.innerWidth < 1024 && onClose()}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-violet-600 text-white shadow-md shadow-violet-200/60"
                  : "text-slate-500 hover:bg-violet-50 hover:text-violet-700"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={17}
                  className={isActive ? "text-white" : "text-slate-400 group-hover:text-violet-500 transition-colors"}
                />
                {label}
                {label === "AI Companion" && (
                  <span className="ml-auto flex items-center gap-1 bg-violet-100 text-violet-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
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
        <div className="mb-4 p-4 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles size={14} className="text-violet-500" />
            <span className="text-xs font-semibold text-violet-700">Pro plan</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed mb-3">Unlock unlimited AI chats and advanced analytics.</p>
          <button className="w-full py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700 transition-colors">
            Upgrade
          </button>
        </div>

        <div className="h-px bg-slate-100 mb-3" />

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all group"
        >
          <LogOut size={16} className="text-slate-400 group-hover:text-red-400 transition-colors" />
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
