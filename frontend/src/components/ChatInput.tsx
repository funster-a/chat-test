import { SendIcon } from "./SendIcon";
import { VoiceIcon } from "./VoiceIcon";

type ChatInputProps = {
  startRecording: () => void;
  isRecording: boolean;
  inputText: string;
  handleInputText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sendMessage: () => void;
  stopRecording: () => void;
  isLoading: boolean;
};

export const ChatInput = ({
  startRecording,
  isRecording,
  inputText,
  handleInputText,
  sendMessage,
  stopRecording,
  isLoading,
}: ChatInputProps) => {
  const handleRecord = () => {
    if (isRecording === true) {
      stopRecording();
      return;
    }
    startRecording();
  };

  return (
    <div className="card">
      <button
        className="voice"
        onClick={() => handleRecord()}
        disabled={isLoading}
      >
        <VoiceIcon isRecording={isRecording} />
      </button>
      <input
        value={inputText}
        onChange={(e) => handleInputText(e)}
        placeholder="Ask whatever you want"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
        maxLength={1000}
      />

      <button
        className="send"
        onClick={() => sendMessage()}
        disabled={isLoading}
      >
        <SendIcon />
      </button>
    </div>
  );
};
