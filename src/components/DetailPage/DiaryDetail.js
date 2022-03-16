import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getDiary } from "../../api/axios";
import { EFFECT_MODE, SCRIPT_MODE } from "../../constants/diary";
import StyledLoadingSpinner from "../shared/StyledLoadingSpinner";
import StyledButton from "../shared/StyledButton";
import ErrorModal from "../common/ErrorModal";
import DiaryDetailAudio from "./DiaryDetailAudio";

function DiaryDetail() {
  const { diary_id } = useParams();

  const [mode, setMode] = useState(EFFECT_MODE);
  const [diary, setDiary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const diary = await getDiary(diary_id);

        setDiary(diary);
        setIsLoading(false);
      } catch (err) {
        setErrorMessage(err.message);
      }
    })();
  }, []);

  return (
    <>
      {errorMessage && (
        <ErrorModal message={errorMessage} onClick={setErrorMessage} />
      )}
      <Container>
        <ModeWrapper>
          <EffectModeBtn
            primary={mode === EFFECT_MODE}
            onClick={() => setMode(EFFECT_MODE)}
          >
            Effect Mode
          </EffectModeBtn>
          <ScriptModeBtn
            primary={mode === SCRIPT_MODE}
            onClick={() => setMode(SCRIPT_MODE)}
          >
            Script Mode
          </ScriptModeBtn>
        </ModeWrapper>
        {isLoading && (
          <LoadingWrapper>
            <StyledLoadingSpinner />
          </LoadingWrapper>
        )}
        {!isLoading && <DiaryDetailAudio mode={mode} diary={diary} />}
      </Container>
    </>
  );
}

const Container = styled.div`
  padding-top: 5rem;
`;

const ModeWrapper = styled.div`
  text-align: center;
`;

const ModeButtons = styled(StyledButton)`
  padding: 1em 2em;
  font-size: 1.5rem;

  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopM}) {
    font-size: 1.4rem;
  }

  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopS}) {
    font-size: 1.3rem;
  }

  @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}) {
    font-size: 1.2rem;
  }
`;

const EffectModeBtn = styled(ModeButtons)`
  margin-right: 1.2em;
`;

const ScriptModeBtn = styled(ModeButtons)`
  margin-left: 1.2em;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

export default DiaryDetail;
