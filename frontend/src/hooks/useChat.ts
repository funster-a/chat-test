import { useState } from "react";

export type ChatRoles = "user" | "ai";

export type Message = {
  role: ChatRoles;
  text: string;
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");

  const sendMessage = async () => {
    const textToSend = inputText.trim();
    if (!textToSend) return;

    setLoading(true);
    setInputText("");
    setMessages((prev) => [...prev, { role: "user", text: textToSend }]);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Неизвестная ошибка сервера");
      }

      setMessages((prev) => [...prev, data]);
    } catch (error: any) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: `❌ Ошибка: ${error.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, isLoading, inputText, setInputText, sendMessage };
};
