import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { EFFECT_MODE, SCRIPT_MODE } from "../../constants";
import ErrorModal from "../common/ErrorModal";
import CustomAudioController from "./CustomAudioController";

function DiaryDetailAudio({ mode, diary }) {
  const [script, setScript] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const canvasRef = useRef(null);
  const canvasContextRef = useRef(null);
  const animationFrameRef = useRef(null);

  const audioElementRef = useRef(null);
  const audioContextRef = useRef(null);
  const audioSourceRef = useRef(null);
  const audioAnalyzerRef = useRef(null);

  useEffect(() => {
    if (mode === SCRIPT_MODE) {
      setScript(diary.script);
    }
  }, [mode]);

  useEffect(() => {
    if (!audioElementRef.current) {
      return;
    }

    audioElementRef.current.src = diary?.audio;

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [audioElementRef.current, diary, animationFrameRef.current]);

  function startPlayingAudio() {
    const audio = audioElementRef.current;

    const audioContext =
      audioContextRef.current ||
      new (window.AudioContext || window.webkitAudioContext)();

    audioContextRef.current && audioContext.resume();

    const source =
      audioSourceRef.current || audioContext.createMediaElementSource(audio);

    const analyzer = audioAnalyzerRef.current || audioContext.createAnalyser();

    analyzer.fftSize = 256;

    source.connect(analyzer);
    analyzer.connect(audioContext.destination);

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    canvasRef.current.width = 600;
    canvasRef.current.height = 300;

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

    audioContextRef.current = audioContext;
    audioAnalyzerRef.current = analyzer;
    audioSourceRef.current = source;
  }

  function clearCanvas() {
    canvasContextRef?.current.clearRect(
      0,
      0,
      canvasRef?.current.width,
      canvasRef?.current.height
    );
  }

  function stopPlayingAudio() {
    clearCanvas();
    cancelAnimationFrame(animationFrameRef.current);
    audioContextRef.current.suspend();
    audioSourceRef.current.disconnect();
    audioAnalyzerRef.current.disconnect();
  }

  return (
    <>
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
          <CustomAudioController
            audioElementRef={audioElementRef}
            onStart={startPlayingAudio}
            onStop={stopPlayingAudio}
          />
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
  display: flex;
  justify-content: center;
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

DiaryDetailAudio.propTypes = {
  mode: PropTypes.string,
  diary: PropTypes.object,
};

export default DiaryDetailAudio;
