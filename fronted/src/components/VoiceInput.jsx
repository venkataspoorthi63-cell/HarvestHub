import { useEffect, useRef, useState } from "react";

export default function VoiceInput({ onText }) {

  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);

  const recognitionRef = useRef(null);

  useEffect(() => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      setSupported(false);
      return;

    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {

      const text =
        event.results[0][0].transcript;

      onText(text);

      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };

  }, [onText]);


  function toggleListening() {

    if (!supported) return;

    if (listening) {

      recognitionRef.current?.stop();

      setListening(false);

      return;
    }

    try {

      recognitionRef.current?.start();

      setListening(true);

    } catch {

      setListening(false);

    }
  }


  if (!supported) {

    return (
      <div className="voice-box muted">

        🎤 Voice input is not supported
        in this browser.

      </div>
    );
  }


  return (
    <div className="voice-box">

      <button
        type="button"
        className="voice-btn"
        onClick={toggleListening}
      >

        {listening
          ? "⏹ Stop Listening"
          : "🎤 Voice Input"}

      </button>

      <span>

        {listening
          ? "Listening..."
          : "Optional voice input"}

      </span>

    </div>
  );
}