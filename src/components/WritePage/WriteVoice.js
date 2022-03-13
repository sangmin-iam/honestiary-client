import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgPlayStopO, CgRecord } from "react-icons/cg";
import { VscCloudUpload } from "react-icons/vsc";
import PropTypes from "prop-types";
import styled from "styled-components";

import { EFFECT_MODE, SCRIPT_MODE } from "../../constants";
import SuccessModal from "../common/SuccessModal";
import ErrorModal from "../common/ErrorModal";
import StyledButton from "../shared/StyledButton";
import useSpeechRecognition from "./useSpeechRecognition";
import useVoiceRecording from "./useVoiceRecording";
import useVoiceVisualization from "./useVoiceVisualization";

const SUCCESS_MODAL_HEADING = "Great!";
const SUCCESS_MODAL_MESSAGE = "Your diary is uploaded successfully!";

function Voice({ mode }) {
  const navigate = useNavigate();

  const { script, startSpeechRecognition, stopSpeechRecognition } =
    useSpeechRecognition();

  const {
    isRecording,
    isRecorded,
    isUploaded,
    startRecording,
    stopRecording,
    uploadRecording,
  } = useVoiceRecording({ script });

  const { canvasRef, startDrawing, stopDrawing } = useVoiceVisualization();

  const [errorMessage, setErrorMessage] = useState("");

  async function handleStart() {
    try {
      const stream = await startRecording();
      startDrawing(stream);
      startSpeechRecognition();
    } catch (err) {
      setErrorMessage(err.message);
    }
  }

  function handleStop() {
    stopRecording();
    stopDrawing();
    stopSpeechRecognition();
  }

  async function handleUpload() {
    try {
      await uploadRecording();
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
          {isRecording ? (
            <CgPlayStopO className="stop-icon" onClick={handleStop} />
          ) : (
            <CgRecord className="start-icon" onClick={handleStart} />
          )}
          {isRecorded && (
            <VscCloudUpload className="save-icon" onClick={handleUpload} />
          )}
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
    width: 90%;
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

  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopM}) {
    .start-icon,
    .stop-icon,
    .save-icon {
      font-size: 4.5rem;
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopS}) {
    .start-icon,
    .stop-icon,
    .save-icon {
      font-size: 4.25rem;
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}) {
    width: 90%;

    .start-icon,
    .stop-icon,
    .save-icon {
      font-size: 4rem;
    }
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
