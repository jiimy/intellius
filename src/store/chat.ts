import { createSlice } from "@reduxjs/toolkit";

type Chat = {
  chatlist: { question: string; answer: string }[];
};

const initialState: Chat = {
  chatlist: [],
};

export const chatSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_CHAT: (state, action) => {
      const { question, answer } = action.payload;
      state.chatlist = [...state.chatlist, { question: question, answer: answer }];
    },
    DELETE_CHAT: (state, action) => {
      state.chatlist = [];
    },
  },
});

export const { SET_CHAT, DELETE_CHAT } = chatSlice.actions;
export default chatSlice.reducer;
