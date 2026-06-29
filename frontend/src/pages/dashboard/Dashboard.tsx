import { motion } from "framer-motion";
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
import useJournal from "../../hooks/useJournal";
import useMood from "../../hooks/useMood";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { token, user } = useAuth();
  console.log("Dashboard user =", JSON.stringify(user, null, 2));
  const { latestMood } = useMood(token);
  const { latestJournal } = useJournal(token);

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
              {latestJournal?.aiAnalysis && (
  <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
    <h3 className="text-lg font-bold mb-4">
      🧠 AI Wellness Insight
    </h3>

    <p><strong>Emotion:</strong> {latestJournal.aiAnalysis.emotion}</p>

    <p><strong>Stress:</strong> {latestJournal.aiAnalysis.stress}/10</p>

    <p><strong>Confidence:</strong> {latestJournal.aiAnalysis.confidence}/10</p>

    <p className="mt-3 text-slate-600">
      {latestJournal.aiAnalysis.summary}
    </p>

    <div className="mt-4 rounded-xl bg-violet-50 p-3">
      💡 {latestJournal.aiAnalysis.recommendation}
    </div>
  </div>
)}
              <HabitCard />
            </div>
          </div>
        </motion.main>
      </div>
    </div>
  );
}
