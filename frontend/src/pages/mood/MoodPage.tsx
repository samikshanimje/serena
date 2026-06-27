import { motion } from "framer-motion";
import { useRef } from "react";
import MoodCalendar from "../../components/mood/MoodCalendar";
import MoodChart from "../../components/mood/MoodChart";
import MoodEmptyState from "../../components/mood/MoodEmptyState";
import MoodHeader from "../../components/mood/MoodHeader";
import MoodInsights from "../../components/mood/MoodInsights";
import MoodSelector from "../../components/mood/MoodSelector";
import MoodStats from "../../components/mood/MoodStats";
import MoodTimeline from "../../components/mood/MoodTimeline";
import { useAuth } from "../../context/AuthContext";
import useMood from "../../hooks/useMood";


import type { HTMLMotionProps } from "framer-motion";

const fadeUp = (
  delay = 0
): Pick<HTMLMotionProps<"div">, "initial" | "animate" | "transition"> => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.5,
    delay,
    ease: [0.16, 1, 0.3, 1] as const,
  },
});

export default function MoodPage() {
  const { token, user } = useAuth();
  const { moods, loading, refetch } = useMood(token);
  const selectorRef = useRef<HTMLDivElement>(null);

  const userName = user?.name?.split(" ")[0] ?? "there";
  const isEmpty = !loading && (!moods || moods.length === 0);

  const scrollToSelector = () => {
    selectorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Ambient background gradients */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-violet-200/25 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-purple-200/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-100/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8 space-y-6">

        {/* ── Header ── */}
        <motion.div {...fadeUp(0)}>
          <MoodHeader userName={userName} streak={moods?.length ?? 0} />
        </motion.div>

        {/* ── Mood Selector ── */}
        <motion.div {...fadeUp(0.08)} ref={selectorRef}>
          <Section>
            <MoodSelector token={token} onLogged={() => refetch()} />
          </Section>
        </motion.div>

        {/* ── Empty state ── */}
        {isEmpty && (
          <motion.div {...fadeUp(0.12)}>
            <Section>
              <MoodEmptyState onStart={scrollToSelector} />
            </Section>
          </motion.div>
        )}

        {/* ── Stats + Timeline ── */}
        {!isEmpty && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats — left col */}
            <motion.div {...fadeUp(0.12)}>
              <Section>
                <MoodStats
                  streak={Math.min(moods?.length ?? 0, 12)}
                  longestStreak={21}
                  totalEntries={moods?.length ?? 0}
                  avgScore={7}
                />
              </Section>
            </motion.div>

            {/* Timeline — right 2 cols */}
            <motion.div {...fadeUp(0.16)} className="lg:col-span-2">
              <Section>
                <MoodTimeline moods={moods ?? []} loading={loading} />
              </Section>
            </motion.div>
          </div>
        )}

        {/* ── Charts + Calendar ── */}
        {!isEmpty && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div {...fadeUp(0.2)}>
              <Section>
                <MoodChart moods={moods ?? []} />
              </Section>
            </motion.div>
            <motion.div {...fadeUp(0.24)}>
              <Section>
                <MoodCalendar moods={moods ?? []} />
              </Section>
            </motion.div>
          </div>
        )}

        {/* ── AI Insights (full width) ── */}
        {!isEmpty && (
          <motion.div {...fadeUp(0.28)}>
            <Section>
              <MoodInsights />
            </Section>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* Reusable white card wrapper */
function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
      {children}
    </div>
  );
}
