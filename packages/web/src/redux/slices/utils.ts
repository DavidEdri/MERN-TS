import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dialog: {
    title: "",
    body: "",
    buttonText: "",
    fullscreen: false,
    isOpen: false,
  },
  snackbar: {
    msg: "",
    variant: "warning",
    isOpen: false,
  },
};

const slice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    setDialog: (state, { payload }) => {
      state.dialog = payload;
    },
    setSnackbar: (state, { payload }) => {
      state.snackbar = payload;
    },
  },
});

export const { setDialog, setSnackbar } = slice.actions;

export default slice;
