import { useState } from "react";
import styled from "styled-components";

import { EFFECT_MODE, SCRIPT_MODE } from "../../constants/diary";
import StyledButton from "../shared/StyledButton";
import WriteVoice from "./WriteVoice";

function Write() {
  const [mode, setMode] = useState(EFFECT_MODE);

  return (
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
      <WriteVoice mode={mode} />
    </Container>
  );
}

const Container = styled.div`
  padding-top: 5rem;
  margin-bottom: 3rem;
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

export default Write;
