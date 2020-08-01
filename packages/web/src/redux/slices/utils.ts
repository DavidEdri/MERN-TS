import { createSlice } from "@reduxjs/toolkit";
import { Color as VariantType } from "@material-ui/lab/Alert";

type State = {
  dialog: {
    title: string;
    body: string;
    buttonText?: string;
    fullscreen: boolean;
    isOpen: boolean;
  };
  snackbar: {
    msg: string;
    variant: VariantType;
    isOpen: boolean;
  };
};

const initialState: State = {
  dialog: {
    title: "",
    body: "",
    buttonText: undefined,
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
