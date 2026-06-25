const moods = [
    {
      emoji: "😁",
      title: "Amazing",
      color: "bg-green-100",
    },
    {
      emoji: "😊",
      title: "Good",
      color: "bg-emerald-100",
    },
    {
      emoji: "😐",
      title: "Okay",
      color: "bg-yellow-100",
    },
    {
      emoji: "😔",
      title: "Low",
      color: "bg-orange-100",
    },
    {
      emoji: "😭",
      title: "Stressed",
      color: "bg-red-100",
    },
  ];
  
  export default function MoodSection() {
    return (
      <section className="bg-violet-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
  
          <h2 className="text-center text-5xl font-bold">
            How are you feeling today?
          </h2>
  
          <p className="mt-4 text-center text-gray-600">
            Check in with yourself in just one tap.
          </p>
  
          <div className="mt-16 grid gap-6 md:grid-cols-5">
  
            {moods.map((mood) => (
              <button
                key={mood.title}
                className={`${mood.color} rounded-3xl p-8 transition duration-300 hover:-translate-y-2 hover:shadow-xl`}
              >
                <div className="text-6xl">
                  {mood.emoji}
                </div>
  
                <h3 className="mt-6 text-2xl font-semibold">
                  {mood.title}
                </h3>
              </button>
            ))}
  
          </div>
  
        </div>
      </section>
    );
  }