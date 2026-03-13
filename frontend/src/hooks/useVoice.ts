import { useEffect, useRef, useState } from "react";

export const useVoice = (
  setInputText: React.Dispatch<React.SetStateAction<string>>,
) => {
  const speechRef = useRef<null | any>(null);
  const [isRecording, setIsRecording] = useState(false);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  useEffect(() => {
    if (SpeechRecognition) {
      speechRef.current = new SpeechRecognition();
      speechRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const textTranscript = event.results[0][0].transcript;
        setInputText(textTranscript);
        setIsRecording(false);
      };
      speechRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const startRecording = () => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      alert("Speech recognition not supported in this browser");
      return;
    }
    setIsRecording(true);
    speechRef.current.start();
  };

  const stopRecording = () => {
    if (isRecording === true) {
      speechRef.current.stop();
    }
  };

  return { startRecording, isRecording, stopRecording };
};
