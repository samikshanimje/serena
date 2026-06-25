import { ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ChatHeader() {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-5">
        <button
          onClick={() => navigate("/dashboard")}
          className="rounded-xl p-2 hover:bg-slate-100"
        >
          <ArrowLeft />
        </button>

        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-violet-100 p-2">
            <Sparkles className="text-violet-600" />
          </div>

          <div>
            <h2 className="font-bold">Serena AI</h2>
            <p className="text-xs text-gray-500">
              Always here for you 🌸
            </p>
          </div>
        </div>

        <div />
      </div>
    </div>
  );
}