import { useState } from "react";

import AIWidget from "../../components/dashboard/AIWidget";
import HabitCard from "../../components/dashboard/HabitCard";
import JournalCard from "../../components/dashboard/JournalCard";
import MoodChart from "../../components/dashboard/MoodChart";
import Sidebar from "../../components/dashboard/Sidebar";
import StatsGrid from "../../components/dashboard/StatsGrid";
import TopNavbar from "../../components/dashboard/TopNavbar";
import WelcomeCard from "../../components/dashboard/WelcomeCard";
import { useAuth } from "../../hooks/useAuth";
import useMood from "../../hooks/useMood";
const USER_NAME = "Samiksha";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { token } = useAuth();

const { latestMood } = useMood(token);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar
          onMenuClick={() => setSidebarOpen(true)}
          userName={USER_NAME}
        />

        <main className="flex-1 p-4 md:p-6 space-y-5 overflow-y-auto">
          {/* Welcome */}
          <WelcomeCard userName={USER_NAME} wellnessScore={86} />

          {/* Stats */}
          <StatsGrid latestMood={latestMood} />

          {/* Bottom grid: chart + journal/AI/habits */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {/* Mood chart — wider */}
            <div className="lg:col-span-3 space-y-5">
              <MoodChart />
              <JournalCard />
            </div>

            {/* Right column */}
            <div className="lg:col-span-2 space-y-5">
              <AIWidget />
              <HabitCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
