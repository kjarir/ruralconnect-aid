
/// <reference types="vite/client" />

// Add Speech Recognition types
interface Window {
  webkitSpeechRecognition: typeof SpeechRecognition;
  SpeechRecognition: typeof SpeechRecognition;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}
