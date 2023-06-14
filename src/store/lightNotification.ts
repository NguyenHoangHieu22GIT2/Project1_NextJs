import { createSlice } from "@reduxjs/toolkit";

type state = {
  status:  "sucess"  | "error" | "warning" | string;
  title: string;
};

const initialState: state = {
  status: "",
  title: "",
};

type action = {
  payload: state;
};

const lightNotificationSlice = createSlice({
  name: "lightNotification",
  initialState,
  reducers: {
    createNotification(state, action: action) {
      state.status = action.payload.status;
      state.title = action.payload.title;
    },
    deleteNotification(state, action) {
      state.status = "";
      state.title = "";
    },
  },
});

export const lightNotificationActions = lightNotificationSlice.actions;

export default lightNotificationSlice;
