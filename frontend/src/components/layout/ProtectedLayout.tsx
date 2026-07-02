import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar";
import TopNavbar from "../dashboard/TopNavbar";
import { useAuth } from "../../context/AuthContext";
import ProtectedRoute from "../common/ProtectedRoute";

export default function ProtectedLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const userName = user?.name?.split(" ")[0] ?? "there";

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <TopNavbar onMenuClick={() => setSidebarOpen(true)} userName={userName} />
          <main className="flex-1 overflow-y-auto min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
