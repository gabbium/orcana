import { useEffect, useRef, useState, type FC, type KeyboardEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { postChatAssistant } from "../../api/chatAssistant";

type ChatAssistantMessage = {
  id: string;
  role: "user" | "ai";
  content: string;
};

export const ChatAssistantPage: FC = () => {
  const [messages, setMessages] = useState<ChatAssistantMessage[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const mutation = useMutation({
    mutationFn: postChatAssistant,
    onSuccess: (response) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "ai",
          content: response.data.content,
        },
      ]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "ai",
          content: "Ocorreu um erro ao falar com a IA. Tente novamente em alguns instantes.",
        },
      ]);
    },
  });

  const handleSend = () => {
    if (mutation.isPending) {
      return;
    }

    const trimmed = input.trim();

    if (!trimmed) {
      return;
    }

    setInput("");
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "user",
        content: trimmed,
      },
    ]);
    mutation.mutate({ content: trimmed });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages, mutation.isPending]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "50%",
        margin: "auto",
      }}
    >
      <div
        style={{
          padding: 8,
        }}
      >
        <h2 style={{ margin: 0 }}>Orcana</h2>
      </div>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 8,
        }}
      >
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              marginBottom: 8,
              textAlign: m.role === "user" ? "right" : "left",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: 8,
                border: "1px solid #ccc",
              }}
            >
              {m.content}
            </div>
          </div>
        ))}
        {mutation.isPending && (
          <div
            style={{
              marginBottom: 8,
              textAlign: "left",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: 8,
                border: "1px solid #ccc",
              }}
            >
              Aguarde...
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>
      <div
        style={{
          display: "flex",
          padding: 8,
          borderTop: "1px solid #ccc",
          gap: 4,
        }}
      >
        <input
          type="text"
          value={input}
          placeholder="Envie uma mensagem..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ flex: 1 }}
        />
      </div>
    </div>
  );
};
