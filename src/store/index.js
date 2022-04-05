import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./user-slice";
import QueryReducer from "./query-slice";

export default configureStore({
  reducer: {
    query: QueryReducer,
    user: UserReducer
  }
});