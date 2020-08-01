import { Color as VariantType } from "@material-ui/lab/Alert";
import { setDialog, setSnackbar } from "../slices/utils";

export const openDialog = (
  title: string,
  body: JSX.Element | string,
  buttonText = "",
  fullscreen = false,
) =>
  setDialog({
    title,
    body,
    buttonText,
    fullscreen,
    isOpen: true,
  });

export const closeDialog = () =>
  setDialog({
    title: "",
    body: "",
    buttonText: "",
    fullscreen: false,
    isOpen: false,
  });

export const openSnackbar = (msg: string | JSX.Element, variant: VariantType) =>
  setSnackbar({
    msg,
    variant,
    isOpen: true,
  });

// passing variant on close to keep same color
export const closeSnackbar = (variant: VariantType) =>
  setSnackbar({ msg: "", variant });
