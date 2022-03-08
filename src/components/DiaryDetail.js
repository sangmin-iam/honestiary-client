import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { EFFECT_MODE, SCRIPT_MODE } from "../constants";
import ErrorModal from "./common/ErrorModal";
import StyledButton from "./shared/StyledButton";
import { getDiary } from "../api/axios";
import DiaryDetailAudio from "./DiaryDetailAudio";

function DiaryDetail() {
  const { diary_id } = useParams();

  const [mode, setMode] = useState(EFFECT_MODE);
  const [diary, setDiary] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const diary = await getDiary(diary_id);

        setDiary(diary);
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
        <DiaryDetailAudio mode={mode} diary={diary} />
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

const EffectModeBtn = styled(StyledButton)`
  padding: 1.5rem 3.5rem;
  margin-right: 1.5rem;
`;

const ScriptModeBtn = styled(StyledButton)`
  padding: 1.5rem 3.5rem;
  margin-left: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.orange};
`;

export default DiaryDetail;
