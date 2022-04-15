import { createSlice } from "@reduxjs/toolkit";

export const querySlice = createSlice({
  name: "query",
  initialState: {
    value: ""
  },
  reducers: {
    setQuery: (state, action) => {
      state.value = action.payload;
    },
    resetQuery: (state, action) => {
      state.value = "";
    }
  }
});

export const { setQuery, resetQuery } = querySlice.actions;

export default querySlice.reducer;
