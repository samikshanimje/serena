import { Send } from "lucide-react";
import { useState } from "react";

interface Props {
  onSend: (message: string) => void;
  loading: boolean;
}

export default function ChatInput({
  onSend,
  loading,
}: Props) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);

    setMessage("");
  };

  return (
    <div className="border-t bg-white p-5">
      <div className="mx-auto flex max-w-4xl gap-3">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && handleSend()
          }
          placeholder="Type how you're feeling..."
          className="flex-1 rounded-2xl border p-4 outline-none focus:border-violet-500"
        />

        <button
          disabled={loading}
          onClick={handleSend}
          className="rounded-2xl bg-violet-600 px-6 text-white hover:bg-violet-700 disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}