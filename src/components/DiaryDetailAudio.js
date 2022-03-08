import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { EFFECT_MODE, SCRIPT_MODE } from "../constants";
import ErrorModal from "./common/ErrorModal";
import CustomAudioController from "./CustomAudioController";

function DiaryDetailAudio({ mode, diary }) {
  const [script, setScript] = useState();

  const [errorMessage, setErrorMessage] = useState("");

  const canvas = useRef();
  const audioElementRef = useRef();
  const audioContextRef = useRef();
  const audioSourceRef = useRef();
  const audioAnalyzerRef = useRef();
  const ctx = useRef();

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
  }, [audioElementRef.current, diary]);

  function startPlayingAudio() {
    const audio = audioElementRef.current;

    const audioCtx =
      audioContextRef.current ||
      new (window.AudioContext || window.webkitAudioContext)();

    audioContextRef.current && audioCtx.resume();

    const source =
      audioSourceRef.current || audioCtx.createMediaElementSource(audio);

    const analyzer = audioAnalyzerRef.current || audioCtx.createAnalyser();

    analyzer.fftSize = 256;

    source.connect(analyzer);
    analyzer.connect(audioCtx.destination);

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    canvas.current.width = 600;
    canvas.current.height = 300;

    const barWidth = canvas.current.width / bufferLength;
    let barHeight;
    let x = 0;

    ctx.current = canvas.current.getContext("2d");

    function animate() {
      x = 0;
      ctx.current.clearRect(
        0,
        0,
        canvas.current?.width,
        canvas.current?.height
      );
      analyzer.getByteFrequencyData(dataArray);

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        const red = (i * barHeight) / 20;
        const green = i * 2;
        const blue = barHeight / 2;

        ctx.current.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        ctx.current.fillRect(
          x,
          canvas.current.height - barHeight,
          barWidth,
          barHeight
        );
        x += barWidth;
      }
      requestAnimationFrame(animate);
    }

    animate();

    audioContextRef.current = audioCtx;
    audioAnalyzerRef.current = analyzer;
    audioSourceRef.current = source;
  }

  function stopPlayingAudio() {
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
          <Canvas ref={canvas} mode={mode === EFFECT_MODE ? "block" : "none"} />
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
