import { createSlice } from "@reduxjs/toolkit";
import { UserPayload } from "@project/types";

type State = {
  isLoggedin: boolean;
  user?: UserPayload;
};

const initialState: State = {
  isLoggedin: false,
  user: undefined,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (_, { payload }) => ({
      isLoggedin: Object.keys(payload).length !== 0,
      user: payload,
    }),
  },
});

export const { setUser } = slice.actions;

export default slice;
