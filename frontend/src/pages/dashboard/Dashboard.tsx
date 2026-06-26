import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../components/dashboard/Sidebar";
import TopNavbar from "../../components/dashboard/TopNavbar";
import WelcomeCard from "../../components/dashboard/WelcomeCard";
import StatsGrid from "../../components/dashboard/StatsGrid";
import MoodChart from "../../components/dashboard/MoodChart";
import JournalCard from "../../components/dashboard/JournalCard";
import AIWidget from "../../components/dashboard/AIWidget";
import HabitCard from "../../components/dashboard/HabitCard";
import { useAuth } from "../../hooks/useAuth";
import useMood from "../../hooks/useMood";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { token, user } = useAuth();
  const { latestMood } = useMood(token);

  const userName = user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} userName={userName} />

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex-1 p-4 md:p-6 space-y-5 overflow-y-auto"
        >
          <WelcomeCard userName={userName} wellnessScore={86} />
          <StatsGrid latestMood={latestMood} />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            <div className="lg:col-span-3 space-y-5">
              <MoodChart />
              <JournalCard />
            </div>
            <div className="lg:col-span-2 space-y-5">
              <AIWidget />
              <HabitCard />
            </div>
          </div>
        </motion.main>
      </div>
    </div>
  );
}
