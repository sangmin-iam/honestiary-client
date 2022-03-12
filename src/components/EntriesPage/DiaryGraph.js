import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import noResultImage from "../../assets/images/noResult.png";
import { getDiaries } from "../../api/axios";
import StyledLoadingSpinner from "../shared/StyledLoadingSpinner";
import ErrorModal from "../common/ErrorModal";
import DiarySearch from "./DiarySearch";
import Graph from "./Graph";

function DiaryGraph() {
  const searchOptions = useSelector(({ diary }) => diary.searchOptions);

  const [diaries, setDiaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { startDate, endDate, sentiment } = searchOptions;

        const params = {
          startDate,
          endDate,
          sentiment,
        };

        const { diaries } = await getDiaries(params);

        setDiaries(diaries);
        setIsLoading(false);
      } catch (err) {
        setErrorMessage(err.response.data.message);
        setIsLoading(false);
      }
    })();
  }, [searchOptions]);

  return (
    <>
      <DiarySearch />
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
      {!isLoading && diaries.length ? (
        <Graph searchOptions={searchOptions} diaries={diaries} />
      ) : null}
    </>
  );
}

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

export default DiaryGraph;
