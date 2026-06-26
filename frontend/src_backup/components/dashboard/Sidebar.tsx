import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  SmilePlus,
  BookOpen,
  Bot,
  CheckSquare,
  BarChart3,
  User,
  LogOut,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Mood Tracker", icon: SmilePlus, to: "/mood" },
  { label: "Journal", icon: BookOpen, to: "/journal" },
  { label: "AI Companion", icon: Bot, to: "/ai" },
  { label: "Habits", icon: CheckSquare, to: "/habits" },
  { label: "Analytics", icon: BarChart3, to: "/analytics" },
  { label: "Profile", icon: User, to: "/profile" },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white/80 backdrop-blur-xl border-r border-violet-100">
      {/* Logo */}
      <div className="px-6 pt-7 pb-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-200">
            <span className="text-lg leading-none">🌸</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">
            Serena
          </span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-xl hover:bg-violet-50 text-slate-400 hover:text-violet-500 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => window.innerWidth < 1024 && onClose()}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-md shadow-violet-200"
                  : "text-slate-500 hover:bg-violet-50 hover:text-violet-700"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={18}
                  className={
                    isActive
                      ? "text-white"
                      : "text-slate-400 group-hover:text-violet-500 transition-colors"
                  }
                />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-5">
        <div className="h-px bg-violet-100 mb-4" />
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all duration-200 group"
        >
          <LogOut
            size={18}
            className="text-slate-400 group-hover:text-red-400 transition-colors"
          />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 shrink-0 h-screen sticky top-0">
        {sidebarContent}
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
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-60 z-50"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
