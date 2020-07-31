import { setDialog, setSnackbar } from "../slices/utils";

export const openDialog = (
  title: string,
  body: React.FC | string,
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

export type SnackbarVariant = "error" | "info" | "success" | "warning";

export const openSnackbar = (msg: string, variant: SnackbarVariant) =>
  setSnackbar({
    msg,
    variant,
    isOpen: true,
  });

// passing variant on close to keep same color
export const closeSnackbar = (variant: SnackbarVariant) =>
  setSnackbar({ msg: "", variant });
