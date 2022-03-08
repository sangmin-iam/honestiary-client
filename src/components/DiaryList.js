import { useState, useEffect } from "react";
import { subDays, lightFormat } from "date-fns";
import styled from "styled-components";

import axios from "../config/axios";
import { DATE_FORMAT, SENTIMENT } from "../constants";
import noResultImage from "../assets/images/no-result.png";
import StyledLoadingSpinner from "./shared/StyledLoadingSpinner";
import ErrorModal from "./common/ErrorModal";
import Pagination from "./common/Pagination";
import DiaryListEntry from "./DiaryListEntry";
import Search from "./Search";

function DiaryList() {
  const [diaries, setDiaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchOptions, setSearchOptions] = useState({
    startDate: lightFormat(subDays(new Date(), 14), DATE_FORMAT.YYYY_MM_DD),
    endDate: lightFormat(new Date(), DATE_FORMAT.YYYY_MM_DD),
    sentiment: SENTIMENT.ALL,
  });

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    setDiaries([]);
  }, [page]);

  useEffect(() => {
    (async () => {
      try {
        const { startDate, endDate, sentiment } = searchOptions;

        const { data } = await axios.get(
          `/diaries?startDate=${startDate}&endDate=${endDate}&sentiment=${sentiment}&page=${page}&limit=12`
        );

        const { diaries, pages: totalPages } = data.data;

        setPages(totalPages);
        setDiaries(diaries);
        setIsLoading(false);
      } catch (err) {
        setErrorMessage(err.response.data.message);
        setIsLoading(false);
      }
    })();
  }, [page, searchOptions]);

  return (
    <>
      <Search setSearchOptions={setSearchOptions} />
      {isLoading && (
        <LoadingWrapper>
          <StyledLoadingSpinner />
        </LoadingWrapper>
      )}
      {!isLoading && !diaries.length && (
        <NoResultImageWrapper>
          <img src={noResultImage} alt={"no-result"} />
        </NoResultImageWrapper>
      )}
      {!isLoading && errorMessage && (
        <ErrorModal message={errorMessage} onClick={setErrorMessage} />
      )}
      <ListWrapper>
        {diaries.map(({ script, createdAt, _id }) => {
          return (
            <DiaryListEntry
              script={script}
              createdAt={createdAt}
              id={_id}
              key={_id}
            />
          );
        })}
      </ListWrapper>
      <Pagination
        page={page}
        pages={pages}
        changePage={setPage}
        setIsLoading={setIsLoading}
      />
    </>
  );
}

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(25rem, 1fr));
  grid-gap: 3rem;
  width: 80%;
  margin: 0 auto;
  margin-top: 3rem;

  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopM}) {
    grid-template-columns: repeat(3, minmax(20rem, 1fr));
  }

  @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}) {
    display: flex;
    flex-direction: column;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const NoResultImageWrapper = styled.div`
  width: 80rem;
  margin: 0 auto;

  @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}) {
    width: 80%;
  }
`;

export default DiaryList;
