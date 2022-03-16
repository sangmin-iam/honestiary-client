import { AiOutlineCloseCircle } from "react-icons/ai";
import PropTypes from "prop-types";
import styled from "styled-components";

import Modal from "./Modal";

const DEFAULT_HEADING = "Error!";
const DEFAULT_MESSAGE = "Something went wrong.";

function ErrorModal({ onClick, heading, message, children }) {
  return (
    <Modal width="35rem" padding="0" onClick={onClick}>
      <Error>
        <AiOutlineCloseCircle className="error-icon" />
      </Error>
      <ErrorHeader>{heading || DEFAULT_HEADING}</ErrorHeader>
      <ErrorMessage>{message || DEFAULT_MESSAGE}</ErrorMessage>
      {children}
    </Modal>
  );
}

const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20rem;
  background-color: #e85e6c;

  .error-icon {
    color: ${({ theme }) => theme.colors.white};
    font-size: 8rem;
  }
`;

const ErrorHeader = styled.h2`
  text-align: center;
  margin-top: 3rem;
`;

const ErrorMessage = styled.p`
  padding-bottom: 2rem;
  margin-top: 1rem;
  font-family: "Waiting for the Sunrise", cursive;
  font-size: 2rem;
  text-align: center;
`;

ErrorModal.defaultProps = {
  onClick: () => {},
};

ErrorModal.propTypes = {
  onClick: PropTypes.func,
  heading: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.any,
};

export default ErrorModal;
