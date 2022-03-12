import { createSlice } from "@reduxjs/toolkit";
import { subDays, lightFormat } from "date-fns";

import { DATE_FORMAT, SENTIMENT } from "../constants";

const initialStartDate = lightFormat(
  subDays(new Date(), 14),
  DATE_FORMAT.YYYY_MM_DD
);
const initialendDate = lightFormat(new Date(), DATE_FORMAT.YYYY_MM_DD);

const initialState = {
  searchOptions: {
    startDate: initialStartDate,
    endDate: initialendDate,
    sentiment: SENTIMENT.ALL,
  },
};

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    search: (state, { payload }) => {
      state.searchOptions = {
        startDate: payload.startDate,
        endDate: payload.endDate,
        sentiment: payload.sentiment,
      };
    },
  },
});

export const { search } = diarySlice.actions;
export default diarySlice.reducer;
