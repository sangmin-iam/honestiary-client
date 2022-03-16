import { forwardRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { AiOutlineSearch } from "react-icons/ai";
import { addMonths, subMonths, lightFormat } from "date-fns";
import PropTypes from "prop-types";
import styled from "styled-components";

import { search } from "../../features/diarySlice";
import { DATE_FORMAT, SENTIMENT } from "../../constants";
import StyledButton from "../shared/StyledButton";
import StyledSelect from "../shared/StyledSelect";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/stylesheets/react-custom-datepicker.css";

function DiarySearch() {
  const dispatch = useDispatch();
  const searchOptions = useSelector(({ diary }) => diary.searchOptions);

  const [sentiment, setSentiment] = useState(searchOptions.sentiment);
  const [startDate, setStartDate] = useState(new Date(searchOptions.startDate));
  const [endDate, setEndDate] = useState(new Date(searchOptions.endDate));

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <DateButton onClick={onClick} ref={ref} primary>
      {lightFormat(new Date(value), DATE_FORMAT.YYYY_MM_DD)}
    </DateButton>
  ));

  CustomInput.displayName = "CustomInput";

  function handleSearch() {
    const formattedStartDate = lightFormat(startDate, DATE_FORMAT.YYYY_MM_DD);
    const formattedEndDate = lightFormat(endDate, DATE_FORMAT.YYYY_MM_DD);

    dispatch(
      search({
        sentiment,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      })
    );
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
      <ScoreSelect
        onChange={(e) => setSentiment(e.target.value)}
        value={sentiment}
      >
        <option value={SENTIMENT.ALL}>ALL</option>
        <option value={SENTIMENT.POSITIVE}>Positive</option>
        <option value={SENTIMENT.NEGATIVE}>Negative</option>
      </ScoreSelect>
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
  margin-right: 2em;
  font-size: 1.4rem;

  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopM}) {
    width: 11rem;
    margin-right: 1.75em;
    font-size: 1.3rem;
  }

  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopS}) {
    width: 10rem;
    margin-right: 1.5em;
    font-size: 1.2rem;
  }

  @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}) {
    width: auto;
    margin-right: 1.5rem;
    font-size: 1.3rem;
  }
`;

const ScoreSelect = styled(StyledSelect)`
  width: 12rem;
  margin-right: 2em;
  font-size: 1.4rem;

  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopM}) {
    width: 11rem;
    font-size: 1.3rem;
  }

  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopS}) {
    width: 10rem;
    font-size: 1.2rem;
  }

  @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}) {
    width: auto;
    margin-right: 1.5em;
    font-size: 1.3rem;
  }
`;

const SearchIconWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 2.5rem;
  cursor: pointer;

  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopM}) {
    font-size: 2.3rem;
  }

  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopS}) {
    font-size: 2.1rem;
  }

  @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}) {
    font-size: 2rem;
  }
`;

DiarySearch.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
};

export default DiarySearch;
