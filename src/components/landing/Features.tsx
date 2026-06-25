import {
    Brain,
    BookOpen,
    HeartHandshake,
    Trophy,
    MessageCircle,
    ShieldCheck,
  } from "lucide-react";
  
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-violet-600" />,
      title: "AI Companion",
      desc: "Talk to your AI wellness assistant anytime.",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-violet-600" />,
      title: "Daily Journal",
      desc: "Write, reflect and understand your emotions.",
    },
    {
      icon: <HeartHandshake className="h-8 w-8 text-violet-600" />,
      title: "Community",
      desc: "Connect anonymously with supportive people.",
    },
    {
      icon: <Trophy className="h-8 w-8 text-violet-600" />,
      title: "Gamification",
      desc: "Earn badges and maintain healthy streaks.",
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-violet-600" />,
      title: "Mood Tracking",
      desc: "Track your emotional journey every day.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-violet-600" />,
      title: "Emergency Support",
      desc: "Quick access to trusted emergency resources.",
    },
  ];
  
  export default function Features() {
    return (
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
  
          <h2 className="text-center text-5xl font-bold">
            Everything You Need 🌸
          </h2>
  
          <p className="mt-4 text-center text-gray-500">
            Designed to help you build a healthier and happier life.
          </p>
  
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
  
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                {feature.icon}
  
                <h3 className="mt-6 text-2xl font-semibold">
                  {feature.title}
                </h3>
  
                <p className="mt-3 text-gray-600">
                  {feature.desc}
                </p>
              </div>
            ))}
  
          </div>
  
        </div>
      </section>
    );
  }