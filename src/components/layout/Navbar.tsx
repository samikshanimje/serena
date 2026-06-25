export default function Navbar() {
    return (
      <nav className="sticky top-0 z-50 border-b border-violet-100 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
  
          <h1 className="text-3xl font-bold text-violet-700">
            Serena 🌸
          </h1>
  
          <div className="hidden gap-8 font-medium md:flex">
            <a href="#">Home</a>
            <a href="#">Features</a>
            <a href="#">Resources</a>
            <a href="#">Community</a>
            <a href="#">Contact</a>
          </div>
  
          <div className="flex gap-4">

<button className="rounded-full px-5 py-2">
Login
</button>

<button className="rounded-full bg-violet-600 px-6 py-3 text-white">
Sign Up
</button>

</div>
  
        </div>
      </nav>
    );
  }