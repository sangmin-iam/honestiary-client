import styled from "styled-components";

const StyledLoadingSpinner = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: 1rem solid #f3f3f3;
  border-top: 0.8rem solid #0e0f0f21;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

StyledLoadingSpinner.defaultProps = {
  width: "6rem",
  height: "6rem",
};

export default StyledLoadingSpinner;
