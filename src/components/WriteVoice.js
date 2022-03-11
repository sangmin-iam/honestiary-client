import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CgPlayStopO, CgRecord } from "react-icons/cg";
import { VscCloudUpload } from "react-icons/vsc";
import PropTypes from "prop-types";
import styled from "styled-components";

import { createDiary } from "../api/axios";
import recordingStart from "../assets/audios/recordingStart.mp3";
import recordingStop from "../assets/audios/recordingStop.mp3";
import { EFFECT_MODE, SCRIPT_MODE } from "../constants";
import SuccessModal from "./common/SuccessModal";
import ErrorModal from "./common/ErrorModal";
import StyledButton from "./shared/StyledButton";

const SUCCESS_MODAL_HEADING = "Great!";
const SUCCESS_MODAL_MESSAGE = "Your diary is uploaded successfully!";

const RECORDING_TIME_LIMIT = 5 * 60 * 1000;

function Voice({ mode }) {
  const navigate = useNavigate();

  const [script, setScript] = useState();

  const [isRecording, setIsRecording] = useState(false);
  const [isRecorded, setIsRecorded] = useState(false);

  const [isUploaded, setIsUploaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const canvasRef = useRef(null);
  const canvasContextRef = useRef(null);

  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const sourceRef = useRef(null);
  const analyzerRef = useRef(null);
  const audioURLRef = useRef(null);
  const recognitionRef = useRef(null);
  const animationFrameRef = useRef(null);
  const timeLimitRef = useRef(null);

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

      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (timeLimitRef.current) {
        clearTimeout(timeLimitRef.current);
      }
    };
  }, [
    streamRef.current,
    mediaRecorderRef.current,
    recognitionRef.current,
    animationFrameRef.current,
    timeLimitRef.current,
  ]);

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

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    new Audio(recordingStart).play();
    startSpeechRecognition();

    function draw(stream) {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      const analyzer = audioContext.createAnalyser();
      analyzer.fftSize = 256;

      source.connect(analyzer);

      const bufferLength = analyzer.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      canvasRef.current.width = 800;
      canvasRef.current.height = 400;

      const barWidth = canvasRef.current.width / bufferLength;
      let barHeight;
      let x = 0;

      canvasContextRef.current = canvasRef.current.getContext("2d");

      function animate() {
        x = 0;
        clearCanvas();
        analyzer.getByteFrequencyData(dataArray);

        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i];
          const red = (i * barHeight) / 20;
          const green = i * 2;
          const blue = barHeight / 2;

          canvasContextRef.current.fillStyle = `rgb(${red}, ${green}, ${blue})`;
          canvasContextRef.current.fillRect(
            x,
            canvasRef.current.height - barHeight,
            barWidth,
            barHeight
          );
          x += barWidth;
        }

        animationFrameRef.current = requestAnimationFrame(animate);
      }

      animate();

      sourceRef.current = source;
      analyzerRef.current = analyzer;
    }

    draw(stream);

    mediaRecorder.start();

    streamRef.current = stream;
    mediaRecorderRef.current = mediaRecorder;

    timeLimitRef.current = setTimeout(stopRecording, RECORDING_TIME_LIMIT);

    setIsRecording(true);
    setIsRecorded(false);
  }

  function clearCanvas() {
    canvasContextRef.current.clearRect(
      0,
      0,
      canvasRef.current?.width,
      canvasRef.current?.height
    );
  }

  function stopRecording() {
    mediaRecorderRef.current.ondataavailable = (e) => {
      audioURLRef.current = e.data;
    };

    streamRef.current.getAudioTracks().forEach((track) => {
      track.stop();
    });

    new Audio(recordingStop).play();

    clearCanvas();
    cancelAnimationFrame(animationFrameRef.current);

    stopSpeechRecognition();
    sourceRef.current.disconnect();
    analyzerRef.current.disconnect();
    mediaRecorderRef.current.stop();

    setIsRecorded(true);
    setIsRecording(false);
  }

  async function saveRecording() {
    try {
      const recorded = new File([audioURLRef.current], "mpeg", {
        lastModified: new Date().getTime(),
        type: "audio/mpeg",
      });

      const formData = new FormData();

      formData.append("script", script);
      formData.append("audio", recorded);

      await createDiary(formData);

      setIsUploaded(true);
      clearTimeout(timeLimitRef.current);
    } catch (err) {
      setErrorMessage(err.message);
    }
  }

  return (
    <>
      {isUploaded && (
        <SuccessModal
          heading={SUCCESS_MODAL_HEADING}
          message={SUCCESS_MODAL_MESSAGE}
        >
          <ModalButtonWrapper>
            <StyledButton onClick={() => navigate("/", { replace: true })}>
              Back Home
            </StyledButton>
          </ModalButtonWrapper>
        </SuccessModal>
      )}
      {errorMessage && (
        <ErrorModal message={errorMessage} onClick={setErrorMessage} />
      )}
      <Container>
        <ContentWrapper>
          <Canvas
            ref={canvasRef}
            mode={mode === EFFECT_MODE ? "block" : "none"}
          />
          <Script mode={mode === SCRIPT_MODE ? "block" : "none"}>
            {script}
          </Script>
        </ContentWrapper>
        <ControllerWrapper>
          {isRecording ? (
            <CgPlayStopO className="stop-icon" onClick={stopRecording} />
          ) : (
            <CgRecord className="start-icon" onClick={startRecording} />
          )}
          {isRecorded && (
            <VscCloudUpload className="save-icon" onClick={saveRecording} />
          )}
        </ControllerWrapper>
      </Container>
    </>
  );
}

const Container = styled.section`
  min-height: 60rem;
`;

const ContentWrapper = styled.div`
  width: 50%;
  padding: 2.5rem;
  margin: 0 auto;
  margin-top: 3rem;
  border: 1px solid white;
  box-shadow: 1px 1px 5px 0.5px rgba(0, 0, 0, 0.2);

  @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}) {
    width: 80%;
  }
`;

const Canvas = styled.canvas`
  display: ${({ mode }) => mode};
  width: 100%;
  height: 50rem;

  @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}) {
    height: 40rem;
  }
`;

const Script = styled.div`
  display: ${({ mode }) => mode};
  width: 100%;
  height: 50rem;
  overflow-y: scroll;
  font-family: "Waiting for the Sunrise", cursive;
  font-size: 2.5rem;

  @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}) {
    height: 40rem;
    font-size: 1.5rem;
  }
`;

const ControllerWrapper = styled.div`
  width: 50%;
  padding: 2.5rem;
  margin: 0 auto;
  margin-top: 3rem;
  text-align: center;
  box-shadow: 1px 1px 5px 0.5px rgba(0, 0, 0, 0.2);

  .start-icon,
  .stop-icon,
  .save-icon {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.orange};
    font-size: 5rem;
    cursor: pointer;
  }

  @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}) {
    width: 80%;
    height: 70%;
  }
`;

const ModalButtonWrapper = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

Voice.propTypes = {
  mode: PropTypes.string,
};

export default Voice;
