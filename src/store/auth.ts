import { createSlice } from "@reduxjs/toolkit";

type loginInformation = {
  payload: { token: string; userId: string };
  type: string;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    userId: "",
  },
  reducers: {
    login(state, action: loginInformation) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    logout(state, action) {
      state.token = "";
      state.userId = "";
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
