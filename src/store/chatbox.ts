import { client } from "@/pages/_app";
import { room } from "@/types/Room";
import { gql } from "@apollo/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type joinRoomInformation = {
  payload: room;
  type: string;
};

const initialState: room[] = [];

const chatboxSlice = createSlice({
  name: "chatbox",
  initialState,
  reducers: {
    joinRoom(state, action: joinRoomInformation) {
      let hasJoinedRoom = false;
      state.forEach((room) => {
        if (room.roomId === action.payload.roomId) {
          hasJoinedRoom = true;
        }
      });
      if (!hasJoinedRoom)
        state.push({
          roomId: action.payload.roomId,
          user: action.payload.user,
          history: action.payload.history,
        });
      return state;
    },
    exitRoom(state, action: { payload: { roomId: string } }) {
      return state.filter((room) => room.roomId !== action.payload.roomId);
    },
  },
});

export const chatboxActions = chatboxSlice.actions;

export default chatboxSlice;
