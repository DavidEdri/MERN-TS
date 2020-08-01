import { createSlice } from "@reduxjs/toolkit";
// TODO add payload type
type State = {
  isLoggedin: boolean;
  user: {
    [key: string]: any;
  };
};

const initialState: State = {
  isLoggedin: false,
  user: {},
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
