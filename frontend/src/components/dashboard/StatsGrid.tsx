import { Droplets, Flame, PenLine, Smile } from "lucide-react";
import StatCard from "./StatCard";

const MOOD_EMOJI: Record<string, string> = {
  Happy: "😊", Sad: "😢", Anxious: "😰", Calm: "😌",
  Angry: "😤", Excited: "🤩", Tired: "😴", Neutral: "😐",
};

interface Props {
  latestMood?: { mood: string; note: string } | null;
  userStreak?: number;
  journalCount?: number;
}

export default function StatsGrid({ latestMood, userStreak = 0, journalCount = 0 }: Props) {
  const moodEmoji = latestMood?.mood ? (MOOD_EMOJI[latestMood.mood] ?? "🙂") : null;

  const STATS = [
    {
      title: "Today's Mood",
      value: latestMood ? `${moodEmoji} ${latestMood.mood}` : "—",
      subtitle: latestMood?.note || "Log your mood to start",
      icon: Smile,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
      trend: latestMood ? "Logged" : "Pending",
      trendPositive: !!latestMood,
    },
    {
      title: "Current Streak",
      value: `${userStreak} days`,
      subtitle: userStreak > 0 ? "Keep maintaining your streak!" : "Start a wellness streak!",
      icon: Flame,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
      trend: userStreak > 0 ? "🔥 Active" : "Get started",
      trendPositive: userStreak > 0,
    },
    {
      title: "Journal Entries",
      value: String(journalCount),
      subtitle: "Explore your thoughts",
      icon: PenLine,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-500",
      trend: `${journalCount} total`,
      trendPositive: journalCount > 0,
    },
    {
      title: "Water Intake",
      value: "1.8 L",
      subtitle: "Goal: 2.5 L",
      icon: Droplets,
      iconBg: "bg-sky-50",
      iconColor: "text-sky-500",
      trend: "72%",
      trendPositive: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {STATS.map((stat, i) => (
        <StatCard key={stat.title} {...stat} delay={0.1 + i * 0.07} />
      ))}
    </div>
  );
}
