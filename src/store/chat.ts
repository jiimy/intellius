import { createSlice } from "@reduxjs/toolkit";

type Chat = {
  chatState: boolean;
};

const initialState: Chat = {
  chatState: false
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    SET_CHAT: (state, action) => {
      state.chatState = action.payload;
    },
    DELETE_CHAT: (state, action) => {
      state.chatState = false;
    },
  },
});

export const { SET_CHAT, DELETE_CHAT } = chatSlice.actions;
export default chatSlice.reducer;
