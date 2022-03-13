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

  return (
    <Container>
      <HeaderWrapper>
        <h1>Get Started</h1>
      </HeaderWrapper>
      <ContentContainer>
        <ContentWrapper>
          <NumberWrapper>1</NumberWrapper>
          <ImageWrapper>
            <img src={voiceImage} />
          </ImageWrapper>
          <Paragraph>Write your diary with your voice.</Paragraph>
        </ContentWrapper>
        <ContentWrapper>
          <NumberWrapper>2</NumberWrapper>
          <ImageWrapper>
            <img src={analysisImage} />
          </ImageWrapper>
          <Paragraph>
            Your diary will be scored by sentiment analysis.
          </Paragraph>
        </ContentWrapper>
        <ContentWrapper>
          <NumberWrapper>3</NumberWrapper>
          <ImageWrapper>
            <img src={graphImage} />
          </ImageWrapper>
          <Paragraph>Check out your diary in timeline graph.</Paragraph>
        </ContentWrapper>
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
`;

const HeaderWrapper = styled.div`
  margin-top: 10vh;
  font-family: "Wingsong";
  text-align: center;

  h1 {
    font-size: 3.5rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 8vh;
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 28%;
  min-width: 27rem;
  padding-top: max(28%, 27rem);
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
  top: 45px;
`;

const Paragraph = styled.p`
  position: absolute;
  bottom: 7%;
  font-size: 1.8rem;
  text-align: center;
  width: 100%;
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
