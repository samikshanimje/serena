import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface WelcomeCardProps {
  userName?: string;
  wellnessScore?: number;
}

export default function WelcomeCard({
  userName = "Samiksha",
  wellnessScore = 86,
}: WelcomeCardProps) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  const circumference = 2 * Math.PI * 36;
  const dashOffset = circumference - (wellnessScore / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 p-6 md:p-8 text-white shadow-xl shadow-violet-200 col-span-full"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-20 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 blur-2xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={16} className="text-violet-200" />
            <span className="text-violet-200 text-sm font-medium">
              Daily Wellness Check
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            {greeting}, {userName} 🌸
          </h1>
          <p className="text-violet-100 text-sm md:text-base leading-relaxed max-w-md">
            "You don't have to be positive all the time. It's perfectly okay to
            feel sad, angry, annoyed, or anxious. Having feelings doesn't make
            you a negative person — it makes you human."
          </p>
          <p className="text-violet-300 text-xs mt-2">— Lori Deschene</p>
        </div>

        {/* Wellness Score Ring */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="6"
              />
              <motion.circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference}
                animate={{ strokeDashoffset: dashOffset }}
                transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">{wellnessScore}%</span>
              <span className="text-[10px] text-violet-200 font-medium">
                Wellness
              </span>
            </div>
          </div>
          <div className="text-center">
            <span className="inline-flex items-center gap-1 bg-white/20 rounded-full px-3 py-1 text-xs font-medium">
              ↑ 4% from yesterday
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
