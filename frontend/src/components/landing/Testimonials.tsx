export default function Testimonials() {
    return (
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-4xl font-bold">
            Loved by Students 💜
          </h2>
  
          <p className="mt-4 text-gray-600">
            Serena helps students feel supported every day.
          </p>
  
          <div className="mt-12 grid gap-8 md:grid-cols-3">
  
            <div className="rounded-3xl border bg-violet-50 p-8">
              <p>
                "The AI companion actually helped me journal consistently."
              </p>
  
              <h3 className="mt-6 font-semibold">
                — Aditi
              </h3>
            </div>
  
            <div className="rounded-3xl border bg-violet-50 p-8">
              <p>
                "Tracking my mood every day made me understand myself better."
              </p>
  
              <h3 className="mt-6 font-semibold">
                — Rahul
              </h3>
            </div>
  
            <div className="rounded-3xl border bg-violet-50 p-8">
              <p>
                "The clean interface makes me want to use Serena daily."
              </p>
  
              <h3 className="mt-6 font-semibold">
                — Priya
              </h3>
            </div>
  
          </div>
        </div>
      </section>
    );
  }