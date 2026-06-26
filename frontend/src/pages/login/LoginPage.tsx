import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Sparkles, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await login(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT — Illustration Panel */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 flex-col items-center justify-center p-16 text-white"
      >
        {/* Ambient orbs */}
        <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-pink-400/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-60px] w-[350px] h-[350px] rounded-full bg-violet-300/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-white/5 blur-2xl pointer-events-none" />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute top-8 left-8 flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
            <span className="text-xl">🌸</span>
          </div>
          <span className="text-xl font-bold font-[Sora,sans-serif]">Serena</span>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="relative z-10 text-center max-w-sm"
        >
          {/* Abstract illustration */}
          <div className="mx-auto mb-10 w-64 h-64 relative">
            <div className="absolute inset-0 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 p-6">
                {[
                  { emoji: "😊", label: "Mood" },
                  { emoji: "📖", label: "Journal" },
                  { emoji: "💜", label: "AI Chat" },
                  { emoji: "🌙", label: "Sleep" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1, type: "spring" }}
                    className="flex flex-col items-center gap-2 rounded-2xl bg-white/15 backdrop-blur-sm p-4 border border-white/20"
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-xs font-medium text-white/80">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-3 font-[Sora,sans-serif]">
            Your wellness journey starts here.
          </h2>
          <p className="text-violet-200 leading-relaxed">
            Track moods, journal freely, and chat with your AI companion — all in one private space.
          </p>

          {/* Testimonial */}
          <div className="mt-8 p-5 rounded-2xl bg-white/10 border border-white/20 text-left">
            <p className="text-sm text-white/90 italic leading-relaxed">
              "Serena helped me notice patterns I never saw before. I feel so much more in tune with myself."
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-violet-400 flex items-center justify-center text-sm font-bold">A</div>
              <div>
                <p className="text-xs font-semibold">Aanya Sharma</p>
                <p className="text-xs text-white/60">Using Serena for 3 months</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* RIGHT — Login Form */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white"
      >
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-10">
          <span className="text-2xl">🌸</span>
          <span className="text-xl font-bold text-violet-700 font-[Sora,sans-serif]">Serena</span>
        </div>

        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-violet-100">
              <Sparkles size={14} />
              Welcome back
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2 font-[Sora,sans-serif]">
              Sign in to Serena
            </h1>
            <p className="text-slate-500 mb-8">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-violet-600 hover:text-violet-700 transition-colors">
                Create one free
              </Link>
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm"
                >
                  <AlertCircle size={16} className="shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent focus:bg-white transition-all text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <button type="button" className="text-xs text-violet-600 hover:text-violet-700 font-medium transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 pr-12 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent focus:bg-white transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-500 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold text-sm hover:from-violet-700 hover:to-purple-700 disabled:opacity-60 transition-all shadow-lg shadow-violet-200 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={16} />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-xs text-slate-400 font-medium">TRUSTED BY 25K+ USERS</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* Social proof avatars */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex -space-x-2">
              {["A", "R", "M", "S", "P"].map((l, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                  style={{
                    background: `hsl(${260 + i * 20}, 70%, ${55 + i * 5}%)`,
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500">
              Join thousands on their wellness journey
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
