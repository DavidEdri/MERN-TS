import { Color as VariantType } from "@material-ui/lab/Alert";
import { setDialog, setSnackbar, Dialog, Snackbar } from "../slices/utils";

export const openDialog = ({
  body,
  fullscreen = false,
  title,
  buttonText,
}: Omit<Dialog, "isOpen">) =>
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

export const openSnackbar = ({ msg, variant }: Omit<Snackbar, "isOpen">) =>
  setSnackbar({
    msg,
    variant,
    isOpen: true,
  });

// passing variant on close to keep same color
export const closeSnackbar = (variant: VariantType) =>
  setSnackbar({ msg: "", variant, isOpen: false });
