import { AiOutlineCheckCircle } from "react-icons/ai";
import PropTypes from "prop-types";
import styled from "styled-components";

import Modal from "./Modal";

const DEFAULT_HEADING = "Great";
const DEFAULT_MESSAGE = "Successfully Done!";

function SuccessModal({ onClick, heading, message, children }) {
  return (
    <Modal onClick={onClick} width="35rem" padding="0">
      <Success>
        <AiOutlineCheckCircle className="success-icon" />
      </Success>
      <SuccessHeader>{heading || DEFAULT_HEADING}</SuccessHeader>
      <SuccessMessage>{message || DEFAULT_MESSAGE}</SuccessMessage>
      {children}
    </Modal>
  );
}

const Success = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20rem;
  background-color: #3ec49e;

  .success-icon {
    color: ${({ theme }) => theme.colors.white};
    font-size: 8rem;
  }
`;

const SuccessHeader = styled.h2`
  text-align: center;
  margin-top: 3rem;
`;

const SuccessMessage = styled.p`
  padding-bottom: 2rem;
  margin-top: 1rem;
  font-family: "Waiting for the Sunrise", cursive;
  font-size: 2rem;
  text-align: center;
`;

SuccessModal.defaultProps = {
  onClick: () => {},
};

SuccessModal.propTypes = {
  onClick: PropTypes.func,
  heading: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.any,
};

export default SuccessModal;
