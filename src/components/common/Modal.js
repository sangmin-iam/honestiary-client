import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

function Modal({ onClick, width, height, children }) {
  return ReactDOM.createPortal(
    <>
      <OverlayWrapper onClick={() => onClick((prev) => !prev)} />
      <ModalWrapper width={width} height={height}>
        {children}
      </ModalWrapper>
    </>,
    document.getElementById("portal-root")
  );
}

const ModalWrapper = styled.div`
  position: fixed;
  overflow: hidden;
  z-index: 100;
  top: 50%;
  left: 50%;
  padding: 30px;
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.5);
  transform: translate(-50%, -50%);
  font-size: 1.7rem;
  font-weight: bold;
`;

const OverlayWrapper = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.25);
`;

Modal.propTypes = {
  onClick: PropTypes.func,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default Modal;
