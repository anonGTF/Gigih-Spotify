import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./user-slice";
import QueryReducer from "./query-slice";

const store = configureStore({
  reducer: {
    query: QueryReducer,
    user: UserReducer
  }
});

export type RootState = ReturnType<typeof store.getState>

export default store;