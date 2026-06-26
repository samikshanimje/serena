import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar skeleton */}
      <div className="hidden lg:flex w-60 shrink-0 bg-white border-r border-slate-100 flex-col gap-4 p-5">
        <div className="flex items-center gap-3 mb-4 p-2">
          <div className="w-9 h-9 rounded-2xl bg-slate-100 animate-pulse" />
          <div className="h-4 w-20 rounded-full bg-slate-100 animate-pulse" />
        </div>
        {[...Array(7)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2.5">
            <div className="w-5 h-5 rounded-lg bg-slate-100 animate-pulse" />
            <div className="h-3 rounded-full bg-slate-100 animate-pulse" style={{ width: `${60 + i * 8}px` }} />
          </div>
        ))}
      </div>

      {/* Main skeleton */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="h-16 bg-white border-b border-slate-100 flex items-center px-6 gap-4">
          <div className="h-4 w-48 rounded-full bg-slate-100 animate-pulse" />
          <div className="flex-1" />
          <div className="h-8 w-40 rounded-full bg-slate-100 animate-pulse" />
          <div className="w-8 h-8 rounded-xl bg-slate-100 animate-pulse" />
          <div className="w-9 h-9 rounded-2xl bg-slate-100 animate-pulse" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="h-44 rounded-3xl bg-slate-200 animate-pulse" />
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 rounded-3xl bg-slate-100 animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-5 gap-5">
            <div className="col-span-3 space-y-5">
              <div className="h-60 rounded-3xl bg-slate-100 animate-pulse" />
              <div className="h-44 rounded-3xl bg-slate-100 animate-pulse" />
            </div>
            <div className="col-span-2 space-y-5">
              <div className="h-72 rounded-3xl bg-slate-100 animate-pulse" />
              <div className="h-56 rounded-3xl bg-slate-100 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token, loading } = useAuth();

  if (loading) return <LoadingSkeleton />;
  if (!token) return <Navigate to="/login" />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
