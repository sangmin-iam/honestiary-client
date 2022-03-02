import PropTypes from "prop-types";
import styled from "styled-components";
import { AiOutlineCheckCircle } from "react-icons/ai";

import Modal from "./Modal";

function SuccessModal({ onClick, heading, message, children }) {
  return (
    <Modal onClick={onClick} width="35rem" padding="0">
      <Success>
        <AiOutlineCheckCircle className="success-icon" />
      </Success>
      <SuccessHeader>{heading}</SuccessHeader>
      <SuccessMessage>{message}</SuccessMessage>
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
  font-family: "Waiting for the Sunrise", cursive;
  text-align: center;
  font-size: 2rem;
  margin-top: 1rem;
  padding-bottom: 2rem;
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
