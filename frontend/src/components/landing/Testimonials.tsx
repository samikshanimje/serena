import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    text: "The AI companion actually helped me journal consistently. I've never stuck with a habit this long before.",
    name: "Aditi S.",
    role: "Final year engineering student",
    avatar: "A",
    stars: 5,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    text: "Tracking my mood every day made me understand myself better. I can now see what triggers my anxiety.",
    name: "Rahul M.",
    role: "Working professional",
    avatar: "R",
    stars: 5,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    text: "The clean interface makes me want to use Serena daily. It doesn't feel like a chore — it feels like self-care.",
    name: "Priya K.",
    role: "Postgraduate student",
    avatar: "P",
    stars: 5,
    gradient: "from-pink-500 to-rose-500",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-white text-slate-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-slate-200 shadow-sm">
            Testimonials
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 font-[Sora,sans-serif] mb-4">
            Loved by thousands 💜
          </h2>
          <p className="text-slate-500 text-lg">Serena helps people feel supported every single day.</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-100 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <span key={j} className="text-amber-400 text-sm">★</span>
                ))}
              </div>

              <p className="text-slate-700 leading-relaxed mb-6 text-[15px]">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-sm font-bold shadow-md`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social proof bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-center"
        >
          <div className="flex -space-x-3">
            {["A", "R", "P", "M", "S", "K"].map((l, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-sm"
                style={{ background: `hsl(${260 + i * 22}, 65%, ${55 + i * 4}%)` }}
              >
                {l}
              </div>
            ))}
          </div>
          <div className="text-sm text-slate-600">
            <span className="font-bold text-violet-700">25,000+</span> people trust Serena for their mental wellness
          </div>
        </motion.div>
      </div>
    </section>
  );
}
