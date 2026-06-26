import { Sparkles } from "lucide-react";

export default function AIPreview() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

        {/* LEFT */}

        <div>
          <span className="rounded-full bg-violet-100 px-4 py-2 text-violet-700">
            AI Wellness Companion
          </span>

          <h2 className="mt-8 text-5xl font-bold">
            Meet Serena AI 🌸
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Talk freely with your personal AI companion anytime.
            Serena helps you reflect, reduce stress, build habits,
            and stay mentally healthy.
          </p>

          <button className="mt-8 rounded-full bg-violet-600 px-8 py-4 text-white">
            Try AI Assistant
          </button>
        </div>

        {/* RIGHT */}

        <div className="rounded-[35px] bg-violet-50 p-8 shadow-xl">

          <div className="flex items-center gap-3">
            <Sparkles className="text-violet-600" />
            <h3 className="text-xl font-bold">
              Serena AI
            </h3>
          </div>

          <div className="mt-8 space-y-4">

            <div className="ml-auto w-fit rounded-2xl bg-violet-600 px-5 py-3 text-white">
              I've been feeling stressed lately.
            </div>

            <div className="w-fit rounded-2xl bg-white px-5 py-3 shadow">
              I'm here for you 💜
              <br /><br />
              Let's take one step at a time.
              <br /><br />
              Would you like a breathing exercise or
              want to journal your thoughts?
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}