import { useState, useRef, useEffect } from "react";

import recordingStart from "../../assets/audios/recordingStart.mp3";
import recordingStop from "../../assets/audios/recordingStop.mp3";
import { createDiary } from "../../api/axios";

function useVoiceRecording({ script }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isRecorded, setIsRecorded] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioURLRef = useRef(null);

  const componentWillUnmount = useRef(false);

  useEffect(() => {
    return () => {
      componentWillUnmount.current = true;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (!componentWillUnmount.current) {
        return;
      }

      if (mediaRecorderRef?.current?.state !== "inactive") {
        mediaRecorderRef?.current?.stop();
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [streamRef.current, mediaRecorderRef.current]);

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    new Audio(recordingStart).play();

    mediaRecorder.start();

    streamRef.current = stream;
    mediaRecorderRef.current = mediaRecorder;

    setIsRecording(true);
    setIsRecorded(false);

    return stream;
  }

  function stopRecording() {
    mediaRecorderRef.current.ondataavailable = (e) => {
      audioURLRef.current = e.data;
    };

    streamRef.current.getAudioTracks().forEach((track) => {
      track.stop();
    });

    new Audio(recordingStop).play();

    mediaRecorderRef.current.stop();

    setIsRecording(false);
    setIsRecorded(true);
  }

  async function uploadRecording() {
    const recorded = new File([audioURLRef.current], "mpeg", {
      lastModified: new Date().getTime(),
      type: "audio/mpeg",
    });

    const formData = new FormData();

    formData.append("script", script);
    formData.append("audio", recorded);

    await createDiary(formData);

    setIsUploaded(true);
  }

  return {
    isRecording,
    isRecorded,
    isUploaded,
    startRecording,
    stopRecording,
    uploadRecording,
  };
}

export default useVoiceRecording;
