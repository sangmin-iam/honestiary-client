import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import { AiOutlineSearch } from "react-icons/ai";
import { addMonths, subDays, subMonths, lightFormat } from "date-fns";
import PropTypes from "prop-types";
import styled from "styled-components";

import { DATE_FORMAT, SENTIMENT } from "../../constants";
import StyledButton from "../shared/StyledButton";
import StyledSelect from "../shared/StyledSelect";
import "react-datepicker/dist/react-datepicker.css";

function Search({ setSearchOptions }) {
  const [sentiment, setSentiment] = useState("all");
  const [startDate, setStartDate] = useState(subDays(new Date(), 14));
  const [endDate, setEndDate] = useState(new Date());

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <DateButton onClick={onClick} ref={ref} primary>
      {lightFormat(new Date(value), DATE_FORMAT.YYYY_MM_DD)}
    </DateButton>
  ));

  CustomInput.displayName = "CustomInput";

  function handleSearch() {
    setSearchOptions({
      sentiment,
      startDate: lightFormat(startDate, DATE_FORMAT.YYYY_MM_DD),
      endDate: lightFormat(endDate, DATE_FORMAT.YYYY_MM_DD),
    });
  }

  return (
    <Container>
      <DatePicker
        selectsStart
        startDate={startDate}
        endDate={endDate}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        customInput={<CustomInput />}
        minDate={subMonths(new Date(), 12)}
      />
      <DatePicker
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        customInput={<CustomInput />}
        minDate={startDate}
        maxDate={addMonths(new Date(startDate), 3)}
      />
      <ScoreButton
        onChange={(e) => setSentiment(e.target.value)}
        value={sentiment}
      >
        <option value={SENTIMENT.ALL}>ALL</option>
        <option value={SENTIMENT.POSITIVE}>Positive</option>
        <option value={SENTIMENT.NEGATIVE}>Negative</option>
      </ScoreButton>
      <SearchIconWrapper onClick={handleSearch}>
        <AiOutlineSearch />
      </SearchIconWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 90%;

  .react-datepicker-wrapper {
    width: auto;
  }

  @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}) {
    justify-content: center;
    margin: 0 auto;
  }
`;

const DateButton = styled(StyledButton)`
  width: 12rem;
  margin-right: 2rem;

  @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}) {
    width: auto;
    margin-right: 1rem;
    font-size: 1.3rem;
  }
`;

const ScoreButton = styled(StyledSelect)`
  width: 12rem;
  margin-right: 2rem;

  @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}) {
    width: auto;
    margin-right: 1rem;
    font-size: 1.3rem;
  }
`;

const SearchIconWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 2.5rem;
  cursor: pointer;

  @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}) {
    width: auto;
  }
`;

Search.propTypes = {
  setSearchOptions: PropTypes.func,
  onClick: PropTypes.func,
  value: PropTypes.string,
};

export default Search;
