import { GrPrevious, GrNext } from "react-icons/gr";
import PropTypes from "prop-types";
import styled from "styled-components";

function Pagination({ page, pages, setPage }) {
  let middlePagination;

  if (pages <= 5) {
    middlePagination = [...Array(pages)].map((_, index) => (
      <PageNumberBtn
        key={index + 1}
        onClick={() => setPage(index + 1)}
        disabled={page === index + 1}
      >
        {index + 1}
      </PageNumberBtn>
    ));
  } else {
    const startValue = Math.floor((page - 1) / 5) * 5;

    middlePagination = (
      <>
        {[...Array(5)].map((_, index) => (
          <PageNumberBtn
            key={startValue + index + 1}
            disabled={page === startValue + index + 1}
            onClick={() => setPage(startValue + index + 1)}
          >
            {startValue + index + 1}
          </PageNumberBtn>
        ))}
        <PageNumberBtn>...</PageNumberBtn>
        <PageNumberBtn onClick={() => setPage(pages)}>{pages}</PageNumberBtn>
      </>
    );

    if (page > 5) {
      if (pages - page >= 5) {
        middlePagination = (
          <>
            <PageNumberBtn onClick={() => setPage(1)}>1</PageNumberBtn>
            <PageNumberBtn>...</PageNumberBtn>
            <PageNumberBtn onClick={() => setPage(startValue)}>
              {startValue}
            </PageNumberBtn>
            {[...Array(5)].map((_, index) => (
              <PageNumberBtn
                key={startValue + index + 1}
                disabled={page === startValue + index + 1}
                onClick={() => setPage(startValue + index + 1)}
              >
                {startValue + index + 1}
              </PageNumberBtn>
            ))}
            <PageNumberBtn>...</PageNumberBtn>
            <PageNumberBtn onClick={() => setPage(pages)}>
              {pages}
            </PageNumberBtn>
          </>
        );
      } else {
        let amountLeft = pages - page + 5;
        middlePagination = (
          <>
            <PageNumberBtn onClick={() => setPage(1)}>1</PageNumberBtn>
            <PageNumberBtn>...</PageNumberBtn>
            <PageNumberBtn onClick={() => setPage(startValue)}>
              {startValue}
            </PageNumberBtn>
            {[...Array(amountLeft)].map((_, index) => (
              <PageNumberBtn
                key={startValue + index + 1}
                style={
                  pages < startValue + index + 1 ? { display: "none" } : null
                }
                disabled={page === startValue + index + 1}
                onClick={() => setPage(startValue + index + 1)}
              >
                {startValue + index + 1}
              </PageNumberBtn>
            ))}
            <PageNumberBtn onClick={() => setPage(pages)}>
              {pages}
            </PageNumberBtn>
          </>
        );
      }
    }
  }

  return (
    pages > 1 && (
      <Container>
        <PrevButton
          onClick={() => setPage((prev) => parseInt(prev) - 1)}
          disabled={page === 1}
        >
          <GrPrevious />
        </PrevButton>
        {middlePagination}
        <NextButton
          onClick={() => setPage((prev) => parseInt(prev) + 1)}
          disabled={page === pages}
        >
          <GrNext />
        </NextButton>
      </Container>
    )
  );
}

const Container = styled.div`
  margin-top: 5rem;
  margin-bottom: 3rem;
  text-align: center;

  button {
    border-radius: 0.5rem;
  }
`;

const PageNumberBtn = styled.button`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.blueGreen};
  background-color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;

  &:disabled {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.blueGreen};
  }
`;

const PrevButton = styled.button`
  padding: 0.75rem;
  margin-right: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.blueGreen};
  background-color: ${({ theme }) => theme.colors.white};

  &:disabled {
    cursor: not-allowed;
  }
`;

const NextButton = styled.button`
  padding: 0.75rem;
  margin-left: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.blueGreen};
  background-color: ${({ theme }) => theme.colors.white};

  &:disabled {
    cursor: not-allowed;
  }
`;

Pagination.propTypes = {
  page: PropTypes.any,
  pages: PropTypes.number,
  setPage: PropTypes.func,
};

export default Pagination;
