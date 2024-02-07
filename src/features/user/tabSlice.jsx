import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
};

const tabSlice = createSlice({
  name: "tab",
  initialState: initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});
export const { setCurrentPage } = tabSlice.actions;

export default tabSlice.reducer;
