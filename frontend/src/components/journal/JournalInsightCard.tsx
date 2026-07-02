import {
  Sparkles, Heart, Sun, Lightbulb,
  AlertTriangle, Compass, HelpCircle, MessageSquareQuote, CheckCircle
} from "lucide-react";
import type { JournalEntry } from "../../services/journalService";
import { useTheme } from "../../hooks/useTheme";

interface Props {
  entry?: JournalEntry | null;
}

const MOOD_EMOJI: Record<string, string> = {
  Amazing: "😄", Happy: "😊", Calm: "😌", Neutral: "😐",
  Sad: "😔", "Very Sad": "😭", Angry: "😡", Anxious: "😰",
};

export default function JournalInsightCard({ entry }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!entry) {
    return (
      <div className="text-center py-10 space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-dark-bg-sec flex items-center justify-center mx-auto text-slate-400 dark:text-slate-500">
          🔍
        </div>
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Select an entry to view AI insights</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 max-w-[200px] mx-auto">Click on any entry in your timeline to analyze its contents.</p>
      </div>
    );
  }

  const analysis = entry.aiAnalysis;

  if (!analysis) {
    return (
      <div className="space-y-5 py-4">
        <div className="flex items-center gap-3 animate-pulse">
          <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-dark-bg-sec" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-32 rounded-full bg-slate-100 dark:bg-dark-bg-sec" />
            <div className="h-3 w-20 rounded-full bg-slate-100 dark:bg-dark-bg-sec" />
          </div>
        </div>
        <div className="rounded-3xl border border-dashed border-slate-200 dark:border-dark-border p-6 text-center space-y-3">
          <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-dark-lavender/10 flex items-center justify-center mx-auto">
            <Sparkles size={16} className="text-violet-500 dark:text-dark-lavender animate-spin" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Analyzing your thoughts…</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-[220px] mx-auto leading-relaxed">
              Serena is parsing your entry to identify emotions, stress triggers, and custom recommendations.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const stressLevel = analysis.stress || 0;
  const stressColor = isDark
    ? (stressLevel >= 7 ? "text-rose-400" : stressLevel >= 4 ? "text-amber-400" : "text-emerald-400")
    : (stressLevel >= 7 ? "text-rose-500" : stressLevel >= 4 ? "text-amber-500" : "text-emerald-500");

  const stressBg = isDark
    ? (stressLevel >= 7 ? "bg-rose-950/20 border-rose-900/30" : stressLevel >= 4 ? "bg-amber-950/20 border-amber-900/30" : "bg-emerald-950/20 border-emerald-900/30")
    : (stressLevel >= 7 ? "bg-rose-50 border-slate-100" : stressLevel >= 4 ? "bg-amber-50 border-slate-100" : "bg-emerald-50 border-slate-100");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-50 dark:border-dark-border pb-4">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-md shadow-violet-200 dark:shadow-none">
            <Sparkles size={18} className="text-white" />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white font-[Sora,sans-serif] truncate">
            Analysis: {entry.title || "Untitled entry"}
          </h2>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Custom mental wellness breakdown</p>
        </div>
        <span className="shrink-0 rounded-full border border-violet-100 dark:border-dark-border bg-violet-50 dark:bg-dark-bg px-2.5 py-1 text-[9px] font-bold text-violet-600 dark:text-dark-lavender uppercase tracking-wider">
          ✦ AI Insights
        </span>
      </div>

      {/* Summary Card */}
      <div className={`rounded-2xl border p-4 relative overflow-hidden transition-all ${
        isDark
          ? "border-dark-border bg-dark-card-el"
          : "border-violet-100/60 bg-gradient-to-br from-violet-50/50 to-purple-50/50"
      }`}>
        <div className={`absolute top-2 right-2 ${isDark ? "text-slate-600" : "text-violet-200"}`}>
          <MessageSquareQuote size={20} />
        </div>
        <h3 className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${
          isDark ? "text-dark-lavender" : "text-violet-800"
        }`}>Summary</h3>
        <p className={`text-xs leading-relaxed font-medium ${
          isDark ? "text-slate-300" : "text-slate-700"
        }`}>
          {analysis.summary}
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-3">
        {/* Emotion */}
        <div className={`rounded-2xl border p-3 text-center flex flex-col justify-between transition-all ${
          isDark ? "border-dark-border bg-dark-bg-sec" : "border-slate-100 bg-slate-50/50"
        }`}>
          <span className={`text-[10px] font-semibold tracking-wider uppercase block mb-1 ${
            isDark ? "text-slate-500" : "text-slate-400"
          }`}>Emotion</span>
          <span className="text-2xl block my-1">
            {MOOD_EMOJI[analysis.emotion] ?? "🌸"}
          </span>
          <span className={`text-[11px] font-bold truncate capitalize ${
            isDark ? "text-slate-300" : "text-slate-700"
          }`}>
            {analysis.emotion || "Reflective"}
          </span>
        </div>

        {/* Stress */}
        <div className={`rounded-2xl border p-3 text-center flex flex-col justify-between transition-all ${stressBg}`}>
          <span className={`text-[10px] font-semibold tracking-wider uppercase block mb-1 ${
            isDark ? "text-slate-500" : "text-slate-400"
          }`}>Stress</span>
          <span className={`text-2xl font-extrabold block my-0.5 ${stressColor}`}>
            {stressLevel}
            <span className="text-xs font-normal text-slate-400 dark:text-slate-500">/10</span>
          </span>
          <span className={`text-[11px] font-bold truncate ${
            isDark ? "text-slate-300" : "text-slate-700"
          }`}>
            {stressLevel >= 7 ? "High" : stressLevel >= 4 ? "Moderate" : "Low"}
          </span>
        </div>

        {/* Confidence */}
        <div className={`rounded-2xl border p-3 text-center flex flex-col justify-between transition-all ${
          isDark ? "border-dark-border bg-dark-bg-sec" : "border-slate-100 bg-violet-50/50"
        }`}>
          <span className={`text-[10px] font-semibold tracking-wider uppercase block mb-1 ${
            isDark ? "text-slate-500" : "text-slate-400"
          }`}>Confidence</span>
          <span className={`text-2xl font-extrabold block my-0.5 ${
            isDark ? "text-dark-lavender" : "text-violet-600"
          }`}>
            {analysis.confidence || 5}
            <span className="text-xs font-normal text-slate-400 dark:text-slate-500">/10</span>
          </span>
          <span className={`text-[11px] font-bold truncate ${
            isDark ? "text-slate-300" : "text-slate-700"
          }`}>
            {analysis.confidence >= 7 ? "Strong" : "Moderate"}
          </span>
        </div>
      </div>

      {/* Positive Signals & Concerns */}
      <div className="grid grid-cols-1 gap-4">
        {/* Positive Signals */}
        {((analysis as any).positiveSignals?.length > 0 || analysis.positiveMoments?.length > 0) && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sun size={13} className="text-amber-500" /> Positive Signals
            </h3>
            <div className="space-y-1.5">
              {((analysis as any).positiveSignals || analysis.positiveMoments || []).map((sig: string, i: number) => (
                <div key={i} className={`flex items-start gap-2 text-xs px-3 py-2 rounded-xl transition-all border ${
                  isDark
                    ? "bg-emerald-950/20 border-emerald-900/30 text-slate-300"
                    : "bg-emerald-50/30 border-emerald-100/50 text-slate-600"
                }`}>
                  <CheckCircle size={12} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>{sig}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Areas of Concern */}
        {analysis.concerns?.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle size={13} className="text-rose-500" /> Areas of Concern
            </h3>
            <div className="space-y-1.5">
              {analysis.concerns.map((con: string, i: number) => (
                <div key={i} className={`flex items-start gap-2 text-xs px-3 py-2 rounded-xl transition-all border ${
                  isDark
                    ? "bg-rose-950/20 border-rose-900/30 text-slate-300"
                    : "bg-rose-50/30 border-rose-100/50 text-slate-600"
                }`}>
                  <AlertTriangle size={12} className="text-rose-400 shrink-0 mt-0.5" />
                  <span>{con}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Suggested Action & Recommended Activity */}
      {((analysis as any).recommendedActivity || analysis.recommendation) && (
        <div className={`rounded-2xl border p-4 shadow-sm space-y-2 transition-all ${
          isDark ? "border-dark-border bg-dark-card-el" : "border-violet-100 bg-white"
        }`}>
          <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
            isDark ? "text-dark-lavender" : "text-slate-800"
          }`}>
            <Compass size={14} className="text-violet-500" /> Recommended Activity
          </h3>
          <p className={`text-xs ${isDark ? "text-slate-300" : "text-slate-600"} leading-relaxed`}>
            {(analysis as any).recommendedActivity || analysis.recommendation}
          </p>
        </div>
      )}

      {/* AI Reflection prompt */}
      {(analysis as any).reflection && (
        <div className={`rounded-2xl border p-4 space-y-2 transition-all ${
          isDark ? "border-dark-border bg-dark-card-el" : "border-indigo-100 bg-indigo-50/20"
        }`}>
          <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
            isDark ? "text-dark-lavender-sec" : "text-slate-800"
          }`}>
            <HelpCircle size={14} className="text-indigo-500" /> AI Reflection Prompt
          </h3>
          <p className={`text-xs font-medium italic leading-relaxed ${
            isDark ? "text-slate-300" : "text-indigo-950"
          }`}>
            "{(analysis as any).reflection}"
          </p>
        </div>
      )}

      {/* Wellness Tip & Encouragement Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Wellness Tip */}
        {(analysis as any).wellnessTip && (
          <div className={`rounded-2xl border p-4 space-y-2 transition-all ${
            isDark ? "border-emerald-900/30 bg-emerald-950/25" : "border-emerald-100 bg-emerald-50/10"
          }`}>
            <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              isDark ? "text-emerald-400" : "text-slate-800"
            }`}>
              <Lightbulb size={14} className="text-emerald-500" /> Wellness Tip
            </h3>
            <p className={`text-xs ${isDark ? "text-slate-300" : "text-slate-600"} leading-relaxed`}>
              {(analysis as any).wellnessTip}
            </p>
          </div>
        )}

        {/* AI Encouragement */}
        {(analysis as any).encouragement && (
          <div className={`rounded-2xl border p-4 space-y-2 transition-all ${
            isDark ? "border-dark-border bg-dark-card-el" : "border-pink-100 bg-pink-50/15"
          }`}>
            <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              isDark ? "text-dark-lavender-sec" : "text-slate-800"
            }`}>
              <Heart size={14} className="text-pink-500 animate-pulse" /> Encouragement
            </h3>
            <p className={`text-xs leading-relaxed italic ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              {(analysis as any).encouragement}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
