import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  trend?: string;
  trendPositive?: boolean;
  delay?: number;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
  trend,
  trendPositive = true,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="bg-white rounded-3xl p-5 shadow-sm shadow-slate-200 border border-slate-100 hover:shadow-md hover:shadow-violet-100 transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-10 h-10 rounded-2xl ${iconBg} flex items-center justify-center`}
        >
          <Icon size={18} className={iconColor} />
        </div>
        {trend && (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              trendPositive
                ? "bg-emerald-50 text-emerald-600"
                : "bg-red-50 text-red-500"
            }`}
          >
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-800 tracking-tight mb-0.5">
          {value}
        </p>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
      </div>
    </motion.div>
  );
}
