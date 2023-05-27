import { client } from "@/pages/_app";
import { gql } from "@apollo/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type loginInformation = {
  payload: {
    token: string;
    userId: string;
    avatar: string;
    email: string;
    username: string;
  };
  type: string;
};

// export const checkSessionStorageData = createAsyncThunk(
//   "sessionStorageData/check",
//   async () => {
//     console.log("HELLo");
//     const response = await client.query({
//       query: QUERY_CHECK_USER,
//       variables: { input: sessionStorage.getItem("token") },
//     });
//     console.log(response);
//     return response.data;
//   }
// );

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    userId: "",
    avatar: "",
    email: "",
    username: "",
  },
  reducers: {
    login(state, action: loginInformation) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.avatar = action.payload.avatar;
      state.email = action.payload.email;
      state.username = action.payload.username;
    },
    logout(state) {
      state.token = "";
      state.userId = "";
    },
  },
  // extraReducers(builder) {
  //   builder.addCase(checkSessionStorageData.fulfilled, (state, action) => {
  //     state.token = action.payload.token;
  //     state.userId = action.payload.userId;
  //   });
  //   builder.addCase(checkSessionStorageData.rejected, (state, action) => {
  //     state.token = "";
  //     state.userId = "";
  //     sessionStorage.removeItem("token");
  //     sessionStorage.removeItem("userid");
  //   });
  // },
});

export const authActions = authSlice.actions;

export default authSlice;
