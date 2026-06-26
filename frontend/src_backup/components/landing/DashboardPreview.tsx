export default function DashboardPreview() {
    return (
      <section className="bg-violet-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
  
          <h2 className="text-center text-5xl font-bold">
            Your Wellness Dashboard
          </h2>
  
          <p className="mt-5 text-center text-gray-600">
            Everything you need in one place.
          </p>
  
          <div className="mt-16 rounded-[40px] bg-white p-10 shadow-2xl">
  
            <div className="grid gap-6 md:grid-cols-4">
  
              <div className="rounded-3xl bg-violet-100 p-8">
                😊
                <h3 className="mt-4 text-2xl font-bold">Mood</h3>
                <p>Excellent</p>
              </div>
  
              <div className="rounded-3xl bg-pink-100 p-8">
                📖
                <h3 className="mt-4 text-2xl font-bold">Journal</h3>
                <p>42 Entries</p>
              </div>
  
              <div className="rounded-3xl bg-blue-100 p-8">
                💧
                <h3 className="mt-4 text-2xl font-bold">Water</h3>
                <p>2.4L</p>
              </div>
  
              <div className="rounded-3xl bg-green-100 p-8">
                🔥
                <h3 className="mt-4 text-2xl font-bold">Streak</h3>
                <p>18 Days</p>
              </div>
  
            </div>
  
          </div>
  
        </div>
      </section>
    );
  }