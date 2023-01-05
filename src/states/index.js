import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";
import { authReducer } from "./auth/reducer";
import { leaderboardsReducer } from "./leaderboards/reducer";
import { isPreloadReducer } from "./preload/reducer";
import { threadsReducer } from "./threads/reducer";
import { categoryReducer } from "./threadsCategory/reducer";
import { threadDetailReducer } from "./threadsDetail/reducer";
import { usersReducer } from "./users/reducer";

export const store = configureStore({
  reducer: {
    authUser: authReducer,
    category: categoryReducer,
    preload: isPreloadReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer,
    users: usersReducer,
    loadingBar: loadingBarReducer,
  },
});
