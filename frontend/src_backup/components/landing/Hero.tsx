import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-violet-50 via-white to-purple-100">
      <div className="mx-auto grid min-h-[90vh] max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div>
          <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
            🌸 Your Personal Wellness Companion
          </span>

          <h1 className="mt-8 text-5xl font-bold leading-tight lg:text-7xl">
            Your Safe Space
            <br />
            for Mental Wellness.
          </h1>

          <p className="mt-6 max-w-xl text-xl leading-8 text-gray-600">
            Track your mood, journal your thoughts, chat with AI,
            build healthy habits and become your best self.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button className="flex items-center gap-2 rounded-full bg-violet-600 px-8 py-4 text-white transition hover:bg-violet-700">
              Get Started
              <ArrowRight size={18} />
            </button>

            <button className="rounded-full border border-gray-300 bg-white px-8 py-4 transition hover:bg-gray-100">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="mt-12 flex gap-10">
            <div>
              <h2 className="text-3xl font-bold text-violet-700">25K+</h2>
              <p className="text-gray-500">Users</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-violet-700">1M+</h2>
              <p className="text-gray-500">Mood Logs</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-violet-700">4.9★</h2>
              <p className="text-gray-500">Rating</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex justify-center">
          <div className="absolute h-80 w-80 rounded-full bg-violet-300 opacity-40 blur-3xl"></div>

          <div className="relative w-[340px] rounded-[35px] bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-bold">
              Good Morning 🌸
            </h3>

            <p className="mt-2 text-gray-500">
              Here's your wellness summary
            </p>

            <div className="mt-8 rounded-2xl bg-violet-100 p-5">
              <p className="text-sm text-gray-600">
                Wellness Score
              </p>

              <h2 className="mt-2 text-5xl font-bold text-violet-700">
                86%
              </h2>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-gray-100 p-4 text-center">
                😊 Mood
              </div>

              <div className="rounded-2xl bg-gray-100 p-4 text-center">
                📖 Journal
              </div>

              <div className="rounded-2xl bg-gray-100 p-4 text-center">
                💧 Water
              </div>

              <div className="rounded-2xl bg-gray-100 p-4 text-center">
                😴 Sleep
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}