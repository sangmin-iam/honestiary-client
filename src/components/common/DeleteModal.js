import { RiDeleteBin5Line } from "react-icons/ri";
import PropTypes from "prop-types";
import styled from "styled-components";

import Modal from "./Modal";

function DeleteModal({ onClick, heading, message, children }) {
  return (
    <Modal width="40rem" padding="0" onClick={onClick}>
      <DeleteIconWrapper>
        <RiDeleteBin5Line className="delete-icon" />
      </DeleteIconWrapper>
      <DeleteHeader>{heading}</DeleteHeader>
      <DeleteMessage>{message}</DeleteMessage>
      {children}
    </Modal>
  );
}

const DeleteIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15rem;
  background-color: #e85e6c;

  .delete-icon {
    color: ${({ theme }) => theme.colors.white};
    font-size: 8rem;
  }
`;

const DeleteHeader = styled.h2`
  text-align: center;
  margin-top: 3rem;
`;

const DeleteMessage = styled.p`
  font-family: "Waiting for the Sunrise", cursive;
  text-align: center;
  font-size: 2rem;
  margin-top: 1rem;
  padding-bottom: 2rem;
`;

DeleteModal.defaultProps = {
  onClick: () => {},
};

DeleteModal.propTypes = {
  onClick: PropTypes.func,
  heading: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.any,
};

export default DeleteModal;
