import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowRight, User, Mail, Lock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const BENEFITS = [
  "Track your mood every day",
  "AI companion available 24/7",
  "Private & secure journal",
  "Personalized wellness insights",
];

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const passwordStrength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength];
  const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-emerald-400", "bg-emerald-500"][passwordStrength];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await register(form.name, form.email, form.password);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT — Brand panel */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 flex-col justify-between p-16 text-white"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-100px] right-[-100px] w-[450px] h-[450px] rounded-full bg-pink-400/15 blur-3xl" />
          <div className="absolute bottom-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-indigo-300/20 blur-3xl" />
        </div>

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
            <span className="text-xl">🌸</span>
          </div>
          <span className="text-xl font-bold font-[Sora,sans-serif]">Serena</span>
        </div>

        {/* Central content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="relative z-10"
        >
          <h2 className="text-4xl font-bold mb-4 font-[Sora,sans-serif] leading-tight">
            Begin your path to better mental health.
          </h2>
          <p className="text-violet-200 mb-10 text-lg leading-relaxed">
            Everything you need to understand and improve your emotional wellbeing — in one place.
          </p>

          <div className="space-y-4">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <CheckCircle size={14} className="text-white" />
                </div>
                <span className="text-sm text-white/90">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom stat strip */}
        <div className="relative z-10 flex gap-8">
          {[["25K+", "Active users"], ["4.9★", "Rating"], ["Free", "To start"]].map(([num, label]) => (
            <div key={label}>
              <div className="text-2xl font-bold font-[Sora,sans-serif]">{num}</div>
              <div className="text-xs text-violet-300 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* RIGHT — Form */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white overflow-y-auto"
      >
        <div className="lg:hidden flex items-center gap-2 mb-10">
          <span className="text-2xl">🌸</span>
          <span className="text-xl font-bold text-violet-700 font-[Sora,sans-serif]">Serena</span>
        </div>

        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold text-slate-900 mb-2 font-[Sora,sans-serif]">
              Create your account
            </h1>
            <p className="text-slate-500 mb-8">
              Already have one?{" "}
              <Link to="/login" className="font-semibold text-violet-600 hover:text-violet-700 transition-colors">
                Sign in
              </Link>
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
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

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full name</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  name="name"
                  placeholder="Samiksha Joshi"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent focus:bg-white transition-all text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent focus:bg-white transition-all text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-12 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent focus:bg-white transition-all text-sm"
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

              {/* Strength bar */}
              {form.password && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2"
                >
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          level <= passwordStrength ? strengthColor : "bg-slate-100"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500">
                    Strength: <span className="font-semibold">{strengthLabel}</span>
                  </p>
                </motion.div>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold text-sm hover:from-violet-700 hover:to-purple-700 disabled:opacity-60 transition-all shadow-lg shadow-violet-200 mt-2"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> Creating account…</>
              ) : (
                <>Create account <ArrowRight size={16} /></>
              )}
            </motion.button>

            <p className="text-xs text-slate-400 text-center leading-relaxed">
              By creating an account, you agree to our{" "}
              <span className="text-violet-600 cursor-pointer hover:underline">Terms of Service</span>
              {" "}and{" "}
              <span className="text-violet-600 cursor-pointer hover:underline">Privacy Policy</span>.
            </p>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
