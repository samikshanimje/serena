import { motion } from "framer-motion";
import { User, Mail, Shield, Bell, Sparkles, Award } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../hooks/useTheme";

export default function ProfilePage() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const userName = user?.name ?? "Serena Member";
  const userEmail = user?.email ?? "member@serena.com";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 md:p-8 max-w-4xl mx-auto space-y-6"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-xl bg-violet-50 dark:bg-dark-lavender/10 flex items-center justify-center">
          <User size={15} className="text-violet-500 dark:text-dark-lavender" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-[Sora,sans-serif]">Account Profile</h1>
      </div>

      {/* Profile Card */}
      <div className={`rounded-3xl border p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center gap-6 relative overflow-hidden transition-all ${
        isDark ? "border-dark-border bg-dark-card" : "border-slate-100 bg-white"
      }`}>
        {!isDark && (
          <div className="absolute top-0 right-0 w-48 h-48 bg-violet-50 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl pointer-events-none" />
        )}
        {isDark && (
          <div className="absolute top-0 right-0 w-48 h-48 bg-dark-lavender/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl pointer-events-none" />
        )}
        
        {/* Avatar */}
        <div className="relative group shrink-0">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={userName}
              className={`w-24 h-24 rounded-full border-4 object-cover shadow-sm ${
                isDark ? "border-dark-border" : "border-violet-100"
              }`}
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 text-white flex items-center justify-center font-bold text-3xl shadow-lg shadow-violet-200 dark:shadow-none">
              {userInitial}
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs border-2 border-white dark:border-dark-card shadow">
            🌸
          </div>
        </div>

        {/* Info */}
        <div className="text-center md:text-left flex-1 space-y-1.5">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white font-[Sora,sans-serif]">{userName}</h2>
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${
              isDark
                ? "bg-dark-lavender/10 border-dark-lavender/25 text-dark-lavender"
                : "bg-violet-50 border-violet-100 text-violet-600"
            }`}>
              <Sparkles size={9} /> PRO MEMBER
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center md:justify-start gap-1.5">
            <Mail size={13} className="text-slate-450 dark:text-slate-500" />
            {userEmail}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">Account ID: <span className={`font-mono text-[10px] px-1 py-0.5 rounded border ${
            isDark ? "bg-dark-bg border-dark-border text-slate-300" : "bg-slate-50 border-slate-100"
          }`}>{user?._id ?? "N/A"}</span></p>
        </div>

        {/* Streak / Stats */}
        <div className={`flex gap-4 shrink-0 mt-4 md:mt-0 w-full md:w-auto border-t pt-4 md:border-t-0 md:pt-0 justify-around ${
          isDark ? "border-dark-border" : "border-slate-50"
        }`}>
          <div className={`text-center px-4 py-2 rounded-2xl min-w-[100px] border ${
            isDark
              ? "bg-amber-500/10 border-amber-900/30 text-amber-400"
              : "bg-amber-50/50 border-amber-100/50 text-amber-600"
          }`}>
            <div className="text-2xl font-extrabold font-[Sora,sans-serif] flex items-center justify-center gap-1">
              🔥 {user?.streak ?? 0}
            </div>
            <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-550 tracking-wider uppercase">Active Streak</div>
          </div>
          <div className={`text-center px-4 py-2 rounded-2xl min-w-[100px] border ${
            isDark
              ? "bg-dark-lavender/10 border-dark-lavender/25 text-dark-lavender"
              : "bg-violet-50/50 border-violet-100/50 text-violet-650"
          }`}>
            <div className="text-2xl font-extrabold font-[Sora,sans-serif] flex items-center justify-center gap-1">
              <Award size={20} className={isDark ? "text-dark-lavender" : "text-violet-500"} /> 86%
            </div>
            <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-550 tracking-wider uppercase">Wellness Score</div>
          </div>
        </div>
      </div>

      {/* Account Settings Forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`rounded-3xl border p-6 shadow-sm space-y-4 transition-all ${
          isDark ? "border-dark-border bg-dark-card text-white" : "border-slate-100 bg-white"
        }`}>
          <h3 className={`text-base font-bold font-[Sora,sans-serif] flex items-center gap-2 border-b pb-3 ${
            isDark ? "border-dark-border text-white" : "border-slate-50 text-slate-800"
          }`}>
            <Shield size={16} className="text-slate-500" /> Security Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>Change Password</label>
              <input
                type="password"
                placeholder="Current Password"
                className={`w-full px-3 py-2 rounded-xl text-sm placeholder:text-slate-450 focus:outline-none focus:ring-2 transition-all ${
                  isDark
                    ? "bg-dark-bg border-dark-border text-white focus:ring-dark-lavender/10 focus:border-dark-lavender"
                    : "bg-slate-50 border-slate-200 text-slate-850 focus:ring-violet-300 focus:border-violet-400"
                }`}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="New Password"
                className={`w-full px-3 py-2 rounded-xl text-sm placeholder:text-slate-450 focus:outline-none focus:ring-2 transition-all ${
                  isDark
                    ? "bg-dark-bg border-dark-border text-white focus:ring-dark-lavender/10 focus:border-dark-lavender"
                    : "bg-slate-50 border-slate-200 text-slate-850 focus:ring-violet-300 focus:border-violet-400"
                }`}
              />
            </div>
            <button className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              isDark
                ? "bg-dark-lavender text-black hover:bg-dark-lavender-hover"
                : "bg-violet-600 text-white hover:bg-violet-700"
            }`}>
              Update Password
            </button>
          </div>
        </div>

        <div className={`rounded-3xl border p-6 shadow-sm space-y-4 transition-all ${
          isDark ? "border-dark-border bg-dark-card text-white" : "border-slate-100 bg-white"
        }`}>
          <h3 className={`text-base font-bold font-[Sora,sans-serif] flex items-center gap-2 border-b pb-3 ${
            isDark ? "border-dark-border text-white" : "border-slate-50 text-slate-800"
          }`}>
            <Bell size={16} className="text-slate-500" /> Notification Preferences
          </h3>
          <div className="space-y-3">
            {[
              { label: "Daily reminder check-in email", desc: "Receive email checking in on your mood" },
              { label: "AI Weekly Insights digest", desc: "Weekly summaries of your journal entries" },
              { label: "Product announcements", desc: "New features and wellness techniques releases" },
            ].map((pref, i) => (
              <label key={i} className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  defaultChecked={i < 2}
                  className={`mt-1 rounded border-slate-350 cursor-pointer ${
                    isDark
                      ? "bg-dark-bg border-dark-border text-dark-lavender focus:ring-dark-lavender focus:ring-offset-dark-card"
                      : "text-violet-650 focus:ring-violet-550"
                  }`}
                />
                <div>
                  <span className={`text-sm font-semibold transition-colors ${
                    isDark
                      ? "text-slate-300 group-hover:text-dark-lavender"
                      : "text-slate-700 group-hover:text-violet-600"
                  }`}>{pref.label}</span>
                  <p className="text-xs text-slate-400 dark:text-slate-500 leading-snug">{pref.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
