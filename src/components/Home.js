import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import landing from "../assets/images/landing.png";
import StyledButton from "./shared/StyledButton";

const paragraph = "When all else fades, your voice remains";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <ParagraphWrapper>
          <Paragraph>{paragraph}</Paragraph>
        </ParagraphWrapper>
        <ButtonWrapper>
          <Button primary onClick={() => navigate("/getting-started")}>
            Getting Started
          </Button>
        </ButtonWrapper>
        <ImageWrapper>
          <img src={landing} />
        </ImageWrapper>
      </Container>
    </>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 90vh;
`;

const ParagraphWrapper = styled.div`
  padding-top: 25vh;

  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopM}) {
    padding-top: 22.5vh;
  }

  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopS}) {
    padding-top: 17.5vh;
  }

  @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}) {
    padding-top: 0;
  }
`;

const Paragraph = styled.p`
  font-family: "Windsong", "cursive";
  font-size: 7.5rem;
  text-align: center;

  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopM}) {
    font-size: 5rem;
  }

  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopS}) {
    font-size: 4rem;
  }

  @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}) {
    font-size: 3rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const Button = styled(StyledButton)`
  padding: 1em 1.5em;
  font-size: 1.8rem;

  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopM}) {
    font-size: 1.6rem;
  }

  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopS}) {
    font-size: 1.5rem;
  }

  @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}) {
    font-size: 1.25rem;
  }
`;

const ImageWrapper = styled.div`
  img {
    width: 100%;
  }
`;

export default Home;
