interface Props {
    role: "user" | "assistant";
    message: string;
  }
  
  export default function ChatBubble({
    role,
    message,
  }: Props) {
    const isUser = role === "user";
  
    return (
      <div
        className={`mb-4 flex ${
          isUser ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`max-w-[75%] rounded-3xl px-5 py-3 ${
            isUser
              ? "bg-violet-600 text-white"
              : "bg-white border"
          }`}
        >
          {message}
        </div>
      </div>
    );
  }