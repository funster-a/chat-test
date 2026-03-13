import "./App.css";
import { ChatInput } from "./components/ChatInput";
import { MessageList } from "./components/MessageList";
import { useChat } from "./hooks/useChat";
import { useVoice } from "./hooks/useVoice";

function App() {
  const { messages, isLoading, inputText, setInputText, sendMessage } =
    useChat();

  const { startRecording, isRecording, stopRecording } = useVoice(setInputText);

  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <>
      <h1>Chat Test</h1>
      <MessageList isLoading={isLoading} messages={messages} />
      <ChatInput
        sendMessage={sendMessage}
        inputText={inputText}
        handleInputText={handleInputText}
        isRecording={isRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
        isLoading={isLoading}
      />
    </>
  );
}

export default App;
