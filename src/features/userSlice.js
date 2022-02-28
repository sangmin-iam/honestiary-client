import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { firebaseGoogleLogin } from "../api/axios";
import { ACCESS_TOKEN } from "../constants";

export const login = createAsyncThunk(
  "user/login",
  async (dispatch, { rejectWithValue }) => {
    try {
      const response = await firebaseGoogleLogin();

      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  user: {
    _id: "",
    email: "",
    name: "",
  },
  status: null,
  isLoggedIn: false,
  errorMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem(ACCESS_TOKEN);
      state.isLoggedIn = false;
      state.status = null;
      state.user = {
        _id: "",
        email: "",
        name: "",
      };
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.status = "pending";
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.status = "success";
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.payload;
      localStorage.removeItem(ACCESS_TOKEN);
    },
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
