export default function Hero() {
    return (
      <section className="min-h-[90vh] bg-gradient-to-br from-violet-50 via-white to-purple-100 flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
  
          <div>
            <span className="inline-block rounded-full bg-violet-100 px-4 py-2 text-violet-700 font-medium">
              🌸 AI Powered Mental Wellness
            </span>
  
            <h1 className="mt-6 text-6xl font-bold leading-tight">
              Your Safe Space
              <br />
              for Mental Wellness.
            </h1>
  
            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Serena helps you manage stress, journal your thoughts,
              track your mood, connect with others, and chat with an
              AI wellness companion.
            </p>
  
            <div className="mt-10 flex gap-4">
              <button className="rounded-full bg-violet-600 px-8 py-4 text-white hover:bg-violet-700">
                Get Started
              </button>
  
              <button className="rounded-full border px-8 py-4">
                Learn More
              </button>
            </div>
          </div>
  
          <div className="flex justify-center">
            <div className="h-96 w-96 rounded-full bg-gradient-to-br from-violet-400 to-purple-300 blur-3xl opacity-40 absolute"></div>
  
            <div className="relative h-96 w-96 rounded-3xl bg-white shadow-2xl flex items-center justify-center">
              🌸
            </div>
          </div>
  
        </div>
      </section>
    );
  }