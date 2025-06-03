import { createSlice } from "@reduxjs/toolkit";

// Define Redux Toolkit slices
const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: null,
    selectedUserMessages: null,
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setSelectedUserMessages: (state, action) => {
      state.selectedUserMessages = action.payload;
    },
  },
});
export const { setMessages, setSelectedUserMessages } = messagesSlice.actions;
export default messagesSlice.reducer;