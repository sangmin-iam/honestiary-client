import { useState } from "react";
import styled from "styled-components";

import { EFFECT_MODE, SCRIPT_MODE } from "../constants";
import StyledButton from "./shared/StyledButton";
import Voice from "./Voice";

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
      <Voice mode={mode} />
    </Container>
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

export default Write;
