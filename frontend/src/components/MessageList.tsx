import { useEffect, useRef } from "react";
import { type Message } from "../hooks/useChat";

export const MessageList = ({
  isLoading,
  messages,
}: {
  isLoading: boolean;
  messages: Message[];
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="chat">
      {messages.length === 0 && (
        <>
          <h2>Hi there!</h2>
          <h3>What would you like to know</h3>
          <span>
            Use one of the most common prompts below or ask your own question
          </span>
        </>
      )}
      {messages?.map((msg, index) => (
        <div key={index} className={"message-row " + msg.role}>
          <div className="bubble">{msg.text}</div>
        </div>
      ))}

      {isLoading && (
        <div className="message-row ai">
          <div className="bubble loader-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};
