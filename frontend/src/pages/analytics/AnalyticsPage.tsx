import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, Sparkles, Smile, BookOpen, AlertTriangle, 
  Award, Heart, Lightbulb, Compass, FileText, Loader2
} from "lucide-react";
import { getWeeklyReport, type WeeklyReport } from "../../services/reportService";
import { useTheme } from "../../hooks/useTheme";

export default function AnalyticsPage() {
  const [report, setReport] = useState<WeeklyReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const res = await getWeeklyReport();
        if (res.data.report) {
          setReport(res.data.report);
        } else {
          setError("Could not generate report. Log more entries first!");
        }
      } catch (err: any) {
        console.error(err);
        setError("Please ensure you have logged at least one journal entry and mood check-in this week to generate analysis.");
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-violet-50 dark:bg-dark-lavender/10 flex items-center justify-center">
            <BarChart3 size={15} className="text-violet-500 dark:text-dark-lavender" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-[Sora,sans-serif]">AI Analytics</h1>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Deep-dive emotional intelligence insights</p>
          </div>
        </div>
        <span className="rounded-full border border-violet-100 dark:border-dark-border bg-violet-50 dark:bg-dark-bg-sec px-3 py-1.5 text-xs font-bold text-violet-600 dark:text-dark-lavender flex items-center gap-1.5">
          <Sparkles size={12} className="animate-pulse" /> GENERATED WEEKLY
        </span>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-3xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card p-12 text-center shadow-sm space-y-4"
          >
            <div className="flex justify-center">
              <Loader2 size={36} className="text-violet-500 dark:text-dark-lavender animate-spin" />
            </div>
            <p className="font-semibold text-slate-700 dark:text-slate-300">Synthesizing wellness report…</p>
            <p className="text-xs text-slate-400 dark:text-slate-550 max-w-sm mx-auto">
              Our AI is parsing your recent moods and journal entries to trace behavioral trends and stressors.
            </p>
          </motion.div>
        ) : error ? (
          <motion.div 
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-3xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card p-12 text-center shadow-sm space-y-5"
          >
            <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/20 flex items-center justify-center mx-auto text-3xl">
              💡
            </div>
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-200 mb-1">More data needed</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">{error}</p>
            </div>
          </motion.div>
        ) : report ? (
          <motion.div
            key="report-content"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Overview Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mood Summary Card */}
              <div className="rounded-3xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card p-6 shadow-sm flex flex-col justify-between relative overflow-hidden transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 dark:bg-amber-500/5 rounded-full -translate-y-1/3 translate-x-1/3 blur-2xl pointer-events-none" />
                <div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-white font-[Sora,sans-serif] flex items-center gap-2 mb-3">
                    <Smile size={18} className="text-amber-500" /> Mood Pattern
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{report.moodSummary}</p>
                </div>
              </div>

              {/* Journal Summary Card */}
              <div className="rounded-3xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card p-6 shadow-sm flex flex-col justify-between relative overflow-hidden transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-50 dark:bg-dark-lavender/5 rounded-full -translate-y-1/3 translate-x-1/3 blur-2xl pointer-events-none" />
                <div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-white font-[Sora,sans-serif] flex items-center gap-2 mb-3">
                    <BookOpen size={18} className="text-violet-500 dark:text-dark-lavender" /> Journal Sentiment
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{report.journalSummary}</p>
                </div>
              </div>
            </div>

            {/* Grid of details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Achievements & Habits */}
              <div className="lg:col-span-2 space-y-6">
                {/* Achievements */}
                {report.achievements?.length > 0 && (
                  <div className="rounded-3xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card p-6 shadow-sm space-y-4">
                    <h3 className="text-base font-bold text-slate-800 dark:text-white font-[Sora,sans-serif] flex items-center gap-2">
                      <Award size={18} className="text-emerald-500" /> Key Milestones & Achievements
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {report.achievements.map((ach, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-900/30 rounded-2xl">
                          <span className="text-lg">🏆</span>
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Positive Habits */}
                {report.positiveHabits?.length > 0 && (
                  <div className="rounded-3xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card p-6 shadow-sm space-y-4">
                    <h3 className="text-base font-bold text-slate-800 dark:text-white font-[Sora,sans-serif] flex items-center gap-2">
                      <Heart size={18} className="text-pink-500 dark:text-dark-lavender-sec" /> Supporting Positive Habits
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {report.positiveHabits.map((habit, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-pink-50/40 dark:bg-dark-lavender-sec/10 border border-pink-100/50 dark:border-dark-lavender-sec/20 rounded-2xl">
                          <span className="text-lg">✨</span>
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">{habit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Stress Triggers Panel */}
              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card p-6 shadow-sm space-y-4">
                  <h3 className="text-base font-bold text-slate-800 dark:text-white font-[Sora,sans-serif] flex items-center gap-2">
                    <AlertTriangle size={18} className="text-rose-500" /> Stress Triggers
                  </h3>
                  {report.stressTriggers?.length > 0 ? (
                    <div className="space-y-2.5">
                      {report.stressTriggers.map((trig, idx) => (
                        <div key={idx} className="p-3.5 bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100/50 dark:border-rose-900/30 rounded-2xl flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{trig}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 dark:text-slate-500">No major stress triggers detected this week!</p>
                  )}
                </div>
              </div>
            </div>

            {/* Recommendations & Action Plan */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recommendations */}
              <div className="lg:col-span-2 rounded-3xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card p-6 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-800 dark:text-white font-[Sora,sans-serif] flex items-center gap-2">
                  <Lightbulb size={18} className="text-violet-500 dark:text-dark-lavender" /> AI Wellness Recommendations
                </h3>
                <div className="space-y-3">
                  {report.recommendations?.map((rec, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-violet-50/40 dark:bg-dark-lavender/5 border border-violet-100/50 dark:border-dark-lavender/10 rounded-2xl">
                      <div className="w-7 h-7 rounded-xl bg-violet-100 dark:bg-dark-lavender/10 flex items-center justify-center text-xs shrink-0 mt-0.5">
                        <Compass size={14} className="text-violet-600 dark:text-dark-lavender" />
                      </div>
                      <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Plan */}
              <div className={`rounded-3xl border p-6 text-white shadow-xl flex flex-col justify-between relative overflow-hidden transition-all ${
                isDark
                  ? "border-dark-border bg-gradient-to-br from-dark-card to-dark-card-el"
                  : "border-violet-100 bg-gradient-to-br from-violet-600 to-purple-700 shadow-violet-200/50"
              }`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 dark:bg-dark-lavender/5 rounded-full -translate-y-1/3 translate-x-1/3 blur-xl pointer-events-none" />
                <div className="space-y-4 relative">
                  <h3 className={`text-base font-bold font-[Sora,sans-serif] flex items-center gap-2 ${isDark ? "text-dark-lavender" : "text-white"}`}>
                    <FileText size={18} /> Dynamic Action Plan
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-violet-100"}`}>{report.actionPlan}</p>
                </div>
                <div className={`mt-6 border-t border-white/10 pt-4 text-[10px] font-semibold tracking-widest uppercase ${isDark ? "text-slate-500" : "text-violet-300"}`}>
                  ✦ Custom generated for you
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
