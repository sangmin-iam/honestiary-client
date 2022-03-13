import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { EFFECT_MODE, SCRIPT_MODE } from "../../constants";
import ErrorModal from "../common/ErrorModal";
import CustomAudioController from "./CustomAudioController";
import useAudioVisualization from "./useAudioVisualization";

function DiaryDetailAudio({ mode, diary }) {
  const { canvasRef, audioElementRef, startDrawingAudio, stopDrawingAudio } =
    useAudioVisualization({ audioURL: diary?.audio });

  const [script, setScript] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  console.log(diary);

  useEffect(() => {
    if (mode === SCRIPT_MODE) {
      setScript(diary.script);
    }
  }, [mode]);

  return (
    <>
      {errorMessage && (
        <ErrorModal message={errorMessage} onClick={setErrorMessage} />
      )}
      <section>
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
            onStart={startDrawingAudio}
            onStop={stopDrawingAudio}
          />
        </ControllerWrapper>
      </section>
    </>
  );
}

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

  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopM}) {
    height: 40rem;
  }

  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopS}) {
    height: 35rem;
  }

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

  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopM}) {
    font-size: 2.25rem;
    height: 40rem;
  }

  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopS}) {
    font-size: 2rem;
    height: 35rem;
  }

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
  diary: PropTypes.shape({
    audio: PropTypes.string,
    createdAt: PropTypes.string,
    createdBy: PropTypes.string,
    script: PropTypes.string,
    sentiment: PropTypes.number,
    _id: PropTypes.string,
  }),
};

export default DiaryDetailAudio;
