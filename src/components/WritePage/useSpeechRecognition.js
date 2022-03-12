import { useState, useRef, useEffect } from "react";

function useSpeechRecognition() {
  const [script, setScript] = useState();

  const recognitionRef = useRef();

  const componentWillUnmount = useRef(false);

  useEffect(() => {
    return () => {
      componentWillUnmount.current = true;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (!componentWillUnmount.current || !recognitionRef.current) {
        return;
      }

      recognitionRef.current.stop();
    };
  }, [recognitionRef.current]);

  function startSpeechRecognition() {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new window.SpeechRecognition();

    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.continuous = true;

    recognition.start();

    recognition.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

      setScript(transcript);
    };

    recognitionRef.current = recognition;
  }

  function stopSpeechRecognition() {
    recognitionRef.current.stop();
  }

  return {
    script,
    startSpeechRecognition,
    stopSpeechRecognition,
  };
}

export default useSpeechRecognition;
