import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { format } from "date-fns";
import styled from "styled-components";

import { deleteDiary } from "../api/axios";
import { DATE_FORMAT } from "../constants";
import DeleteModal from "./common/DeleteModal";
import StyledButton from "./shared/StyledButton";

const HEADING = "Your are about to delete a diary";
const MESSAGE = "Are you sure you want to delete it?";

function DiaryListEntry({
  script,
  createdAt,
  id,
  setDiaries,
  setErrorMessage,
}) {
  const navigate = useNavigate();

  const [isDeleteModalOn, setIsDeleteModalOn] = useState(false);

  async function handleDelete(id) {
    try {
      await deleteDiary(id);

      setDiaries((diaries) => diaries.filter((diary) => diary._id !== id));
    } catch (err) {
      setErrorMessage(err.message);
    }
  }

  return (
    <>
      {isDeleteModalOn && (
        <DeleteModal heading={HEADING} message={MESSAGE}>
          <ModalButtonWrapper>
            <StyledButton onClick={() => setIsDeleteModalOn(false)}>
              Cancel
            </StyledButton>
            <StyledButton primary onClick={() => handleDelete(id)}>
              Delete
            </StyledButton>
          </ModalButtonWrapper>
        </DeleteModal>
      )}
      <Container id={id} onClick={() => navigate(`/entries/${id}`)}>
        <DeleteWrapper
          onClick={(e) => {
            e.stopPropagation();
            setIsDeleteModalOn(true);
          }}
        >
          X
        </DeleteWrapper>
        <ScriptWrapper>{script}</ScriptWrapper>
        <TimeWrapper>{format(new Date(createdAt), "p E")}</TimeWrapper>
        <DateWrapper>
          {format(new Date(createdAt), DATE_FORMAT.YYYY_MM_DD)}
        </DateWrapper>
      </Container>
    </>
  );
}

const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  button {
    margin-left: 2rem;
    margin-right: 2rem;
    margin-bottom: 3rem;
  }
`;

const Container = styled.div`
  position: relative;
  height: 20rem;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 1px 1px 5px 0.5px rgba(0, 0, 0, 0.2);
  font-size: 2rem;
  cursor: pointer;
`;

const ScriptWrapper = styled.div`
  display: -webkit-box;
  padding-top: 1rem;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const DateWrapper = styled.div`
  position: absolute;
  color: ${({ theme }) => theme.colors.gray};
  font-size: 1.5rem;
  font-weight: 100;
  right: 1rem;
  bottom: 3rem;
`;

const TimeWrapper = styled(DateWrapper)`
  bottom: 1rem;
`;

const DeleteWrapper = styled.div`
  position: absolute;
  padding: 0.2em 0.6em;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.gray};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;
  right: -10px;
  top: -10px;
`;

DiaryListEntry.propTypes = {
  script: PropTypes.string,
  createdAt: PropTypes.string,
  id: PropTypes.string,
  setDiaries: PropTypes.func,
  setErrorMessage: PropTypes.func,
};

export default DiaryListEntry;
