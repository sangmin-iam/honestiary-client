import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import userReducer from "./userSlice";
import diaryReducer from "./diarySlice";

const reducers = combineReducers({
  user: userReducer,
  diary: diaryReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["diary"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
