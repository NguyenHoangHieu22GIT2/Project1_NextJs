import { createSlice } from "@reduxjs/toolkit";

type state = {
  status: string;
  title: string;
  description: string;
};

const initialState: state = {
  status: "",
  title: "",
  description: "",
};

type action = {
  payload: state;
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action: action) {
      state.status = action.payload.status;
      state.title = action.payload.title;
      state.description = action.payload.description;
    },
    deleteNotification(state, action) {
      state.status = "";
      state.title = "";
      state.description = "";
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
