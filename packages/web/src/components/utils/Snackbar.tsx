import React from "react";
import { useDispatch } from "react-redux";
import MUISnackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { closeSnackbar } from "../../redux/actions/utilsActions";
import { useTypedSelector } from "../../redux";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Snackbar() {
  const dispatch = useDispatch();
  const snackbarState = useTypedSelector((state) => state.utils.snackbar);
  const { msg, variant, isOpen } = snackbarState;

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(closeSnackbar(variant));
  };

  return (
    <MUISnackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={variant}>
        {msg}
      </Alert>
    </MUISnackbar>
  );
}
