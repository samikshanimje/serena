export default function Navbar() {
    return (
      <nav className="sticky top-0 z-50 bg-white border-b">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6">
          <h1 className="text-2xl font-bold text-violet-600">
            Serena 🌸
          </h1>
  
          <div className="hidden md:flex gap-8">
            <a href="#">Features</a>
            <a href="#">Community</a>
            <a href="#">Resources</a>
            <a href="#">Contact</a>
          </div>
  
          <button className="bg-violet-600 text-white px-5 py-2 rounded-full">
            Get Started
          </button>
        </div>
      </nav>
    );
  }