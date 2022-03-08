import { useState, useEffect } from "react";
import { subDays, lightFormat } from "date-fns";
import styled from "styled-components";

import axios from "../config/axios";
import noResultImage from "../assets/images/no-result.png";
import StyledLoadingSpinner from "./shared/StyledLoadingSpinner";
import ErrorModal from "./common/ErrorModal";
import { DATE_FORMAT, SENTIMENT } from "../constants";
import Search from "./Search";
import Graph from "./Graph";

function DiaryGraph() {
  const [diaries, setDiaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchOptions, setSearchOptions] = useState({
    startDate: lightFormat(subDays(new Date(), 14), DATE_FORMAT.YYYY_MM_DD),
    endDate: lightFormat(new Date(), DATE_FORMAT.YYYY_MM_DD),
    sentiment: SENTIMENT.ALL,
  });

  useEffect(() => {
    (async () => {
      try {
        const { startDate, endDate, sentiment } = searchOptions;

        const { data } = await axios.get(
          `/diaries?startDate=${startDate}&endDate=${endDate}&sentiment=${sentiment}`
        );

        const { diaries } = data.data;

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
