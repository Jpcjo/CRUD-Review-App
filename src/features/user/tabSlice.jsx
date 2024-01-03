import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // reviewData: {
  //   starRating: 0,
  //   reviewText: "",
  //   deliveryMethod: "",
  //   meal: "",
  //   priceRange: "",
  //   selectedTopics: [],
  // },
  currentPage: 1,
};

const tabSlice = createSlice({
  name: "tab",
  initialState: initialState,
  reducers: {
    // activeTabNum: (state, action) => {
    //   state.activeTab = action.payload;
    // },
    // isStarHovered: (state, action) => {
    //   state.hoveredStar = action.payload;
    //   localStorage.setItem("stars", JSON.stringify(action.payload));
    // },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});
export const { setCurrentPage } = tabSlice.actions;

export default tabSlice.reducer;
