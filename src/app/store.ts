import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/userSlice";
import callReducer from "../features/callSlice";
import { userApiSlice } from "../services/userApi";

export const rootReducers = combineReducers({
    user: userReducer,
    call: callReducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  });

export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(
            { serializableCheck: false }
        ).concat(userApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;