import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RiErrorWarningLine } from "react-icons/ri";

import Modal from "./common/Modal";
import StyledButton from "./shared/StyledButton";

function ProtectedRoute() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(({ user }) => user.isLoggedIn);

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Modal width="30rem">
      <Container>
        <IconWrapper>
          <RiErrorWarningLine />
        </IconWrapper>
        <MessageWrapper>Login Required</MessageWrapper>
        <div>
          <ConfirmButton onClick={() => navigate("/login", { replace: true })}>
            Confrim
          </ConfirmButton>
        </div>
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: center;
  text-align: center;
`;

const IconWrapper = styled.div`
  margin-bottom: 1em;
`;

const MessageWrapper = styled.div`
  margin-bottom: 2em;
`;

const ConfirmButton = styled(StyledButton)`
  width: 10em;
`;

export default ProtectedRoute;
