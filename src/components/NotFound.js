import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import notFoundImage from "../assets/images/notFound.svg";
import StyledButton from "./shared/StyledButton";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container>
      <ImageWrapper>
        <img src={notFoundImage} />
      </ImageWrapper>
      <ParagraphWrapper>
        <p>
          Ooops! We can&apos;t seem to find the page you&apos;re looking for.
        </p>
      </ParagraphWrapper>
      <BackHomeButton primary onClick={() => navigate("/")}>
        Back to Home Page
      </BackHomeButton>
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
  width: max(40%, 300px);

  img {
    width: 100%;
  }
`;

const ParagraphWrapper = styled.div`
  margin-top: 4rem;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 3rem;

  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopM}) {
    font-size: 2.75rem;
  }
  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopS}) {
    font-size: 2.5rem;
  }
  @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}) {
    font-size: 2.25rem;
  }
`;

const BackHomeButton = styled(StyledButton)`
  font-size: 1.5rem;

  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopM}) {
    font-size: 1.4rem;
  }
  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopS}) {
    font-size: 1.3rem;
  }
  @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}) {
    font-size: 1.15rem;
  }
`;

export default NotFound;
