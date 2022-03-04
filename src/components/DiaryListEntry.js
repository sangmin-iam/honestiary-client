import PropTypes from "prop-types";
import { format } from "date-fns";
import styled from "styled-components";

function DiaryListEntry({ script, createdAt, id }) {
  return (
    <Container id={id}>
      <ScriptWrapper>{script}</ScriptWrapper>
      <TimeWrapper>{format(new Date(createdAt), "p E")}</TimeWrapper>
      <DateWrapper>{format(new Date(createdAt), "yyyy-MM-dd")}</DateWrapper>
    </Container>
  );
}

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

DiaryListEntry.propTypes = {
  script: PropTypes.string,
  createdAt: PropTypes.string,
  id: PropTypes.string,
};

export default DiaryListEntry;
