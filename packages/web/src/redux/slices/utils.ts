import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Color as VariantType } from "@material-ui/lab/Alert";

type State = {
  dialog: {
    title: string;
    body: JSX.Element | string;
    buttonText?: string;
    fullscreen?: boolean;
    isOpen: boolean;
  };
  snackbar: {
    msg: JSX.Element | string;
    variant: VariantType;
    isOpen: boolean;
  };
};

export type Dialog = State["dialog"];
export type Snackbar = State["snackbar"];

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
    setDialog: (state, { payload }: PayloadAction<Dialog>) => {
      state.dialog = payload;
    },
    setSnackbar: (state, { payload }: PayloadAction<Snackbar>) => {
      state.snackbar = payload;
    },
  },
});

export const { setDialog, setSnackbar } = slice.actions;

export default slice;
