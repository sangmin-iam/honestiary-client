import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import voiceImage from "../../assets/images/voice.svg";
import analysisImage from "../../assets/images/analysis.svg";
import graphImage from "../../assets/images/graph.svg";
import StyledButton from "../shared/StyledButton";

function GettingStarted() {
  const navigate = useNavigate();

  const isLoggedIn = useSelector(({ user }) => user.isLoggedIn);

  function handleClick() {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    navigate("/write");
  }

  function renderStepCard(num, image, paragraph) {
    return (
      <ContentWrapper>
        <NumberWrapper>{num}</NumberWrapper>
        <ImageWrapper>
          <img src={image} />
        </ImageWrapper>
        <Paragraph>{paragraph}</Paragraph>
      </ContentWrapper>
    );
  }

  return (
    <Container>
      <HeaderWrapper>
        <h2>Get Started</h2>
      </HeaderWrapper>
      <ContentContainer>
        {renderStepCard(1, voiceImage, "Write your diary with your voice.")}
        {renderStepCard(
          2,
          analysisImage,
          "Your diary will be scored by sentiment analysis."
        )}
        {renderStepCard(
          3,
          graphImage,
          "Check out your diary in timeline graph."
        )}
      </ContentContainer>
      <ButtonWrapper>
        <StyledButton primary onClick={handleClick}>
          Let&apos;s go
        </StyledButton>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 60%;
  min-width: 100rem;
  margin: 0 auto;

  @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}) {
    width: 100%;
    min-width: 0;
    margin-bottom: 3rem;
  }
`;

const HeaderWrapper = styled.div`
  margin-top: 10vh;
  text-align: center;

  @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}) {
    margin-top: 5vh;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 8vh;

  @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}) {
    flex-direction: column;
    align-items: center;
    gap: 5rem;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 28%;
  min-width: 31.5rem;
  padding-top: max(28%, 31.5rem);
  border-radius: 5px;
  box-shadow: 1px 1px 5px 0.5px rgba(0, 0, 0, 0.2);
`;

const NumberWrapper = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.orange};
  color: #fff;
  text-align: center;
  font-size: 3rem;
`;

const ImageWrapper = styled.div`
  position: absolute;
  margin-bottom: 2rem;
  top: 4rem;
`;

const Paragraph = styled.p`
  position: absolute;
  left: 50%;
  bottom: 7%;
  transform: translateX(-50%);
  text-align: center;
  width: 90%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5vh;

  button {
    width: 10rem;
    font-size: 1.6rem;
  }
`;

export default GettingStarted;
