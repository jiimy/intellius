import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";

const makeStore = () => {
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
  });

  return store;
};

const store = makeStore();

export default store;

export type RootState = ReturnType<typeof store.getState>;
