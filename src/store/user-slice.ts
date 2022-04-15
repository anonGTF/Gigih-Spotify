import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    token: ""
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    resetUser: (state, action) => {
        state.id = ""
        state.token = ""
    }
  }
});

export const { setId, setToken, resetUser } = userSlice.actions;

export default userSlice.reducer;
