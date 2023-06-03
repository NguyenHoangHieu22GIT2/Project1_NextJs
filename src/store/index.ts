import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSlice from "./auth";
import notificationSlice from "./notification";
import lightNotificationSlice from "./lightNotification";
import chatboxSlice from "./chatbox";
const reducer = combineReducers({
  auth: authSlice.reducer,
  notification: notificationSlice.reducer,
  lightNotification: lightNotificationSlice.reducer,
  chatbox: chatboxSlice.reducer,
});

const store = configureStore({
  reducer,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
