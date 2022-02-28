import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import googleSignInBtn from "../assets/images/googleSignInBtn.png";
import { login } from "../features/userSlice";
import Modal from "./common/Modal";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector(({ user }) => user);
  const [isModalOn, setIsModalOn] = useState(true);

  function handleLogin() {
    dispatch(login());
  }

  useEffect(() => {
    if (status === "success") {
      navigate("/");
    }
  }, [status]);

  return (
    <Container>
      {isModalOn && errorMessage && (
        <Modal width="25rem" onClick={setIsModalOn}>
          <MessageWrapper>
            <p>{errorMessage}</p>
          </MessageWrapper>
        </Modal>
      )}
      <ImageWrapper>
        <img src={googleSignInBtn} onClick={handleLogin} />
      </ImageWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const ImageWrapper = styled.div`
  width: 20rem;

  img {
    cursor: pointer;
  }
`;

const MessageWrapper = styled.div`
  font-weight: 300;
  text-align: center;
`;

export default Login;
