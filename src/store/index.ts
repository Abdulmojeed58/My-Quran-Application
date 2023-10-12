import { configureStore } from "@reduxjs/toolkit";
import quranReducer from "./quranSlice";
import ipAddressReducer from "./ipAddressSlice";
// ...

export const store = configureStore({
  reducer: { quran: quranReducer, ipAddress: ipAddressReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
