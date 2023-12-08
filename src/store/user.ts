import { createSlice } from "@reduxjs/toolkit";

type User = {
  atk: string;
};

const initialState: User = {
  atk: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_TOKEN: (state, action) => {
      state.atk = action.payload.atk;
    },
    DELETE_TOKEN: (state, action) => {
      state.atk = "";
    },
  },
});

export const { SET_TOKEN, DELETE_TOKEN } = userSlice.actions;
export default userSlice.reducer;
