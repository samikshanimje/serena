import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-violet-50 via-white to-purple-100">

      <div className="mx-auto grid min-h-[90vh] max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">

        <div>

          <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
            🌸 Your Personal Wellness Companion
          </span>

          <h1 className="mt-8 text-6xl font-bold leading-tight">
            Your Safe Space
            <br />
            for Mental Wellness.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-600">
            Track your mood, journal your thoughts, chat with AI,
            build healthy habits and become your best self.
          </p>

          <div className="mt-10 flex gap-4">

            <button className="flex items-center gap-2 rounded-full bg-violet-600 px-8 py-4 text-white hover:bg-violet-700">
              Get Started
              <ArrowRight size={18}/>
            </button>

            <button className="rounded-full border px-8 py-4">
              Learn More
            </button>

          </div>

        </div>

        <div className="relative flex justify-center">

          <div className="absolute h-80 w-80 rounded-full bg-violet-300 blur-3xl opacity-30"></div>

          <div className="relative flex h-[430px] w-[350px] items-center justify-center rounded-[40px] bg-white shadow-2xl">

            <span className="text-8xl">
              🌸
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}