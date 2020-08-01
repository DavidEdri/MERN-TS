import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { UserPayload } from "@project/types";
import { Grid, Typography, Button, Box } from "@material-ui/core";
import text from "../../../helpers/text";
import { RootState } from "../../../redux/State";

export default function ActivateAccount() {
  const [clickable, setClickable] = useState(true);
  const history = useHistory();
  // TODO fix useSelector
  const user = useSelector((state: RootState): UserPayload => state.auth.user!);
  const userID = user?._id;

  const handleClick = async () => {
    setClickable(false);
    let waitTime = 60;

    const timer = setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      document.getElementById("timer")!.innerHTML = waitTime.toString();
      waitTime--;
      if (waitTime < 0) {
        clearInterval(timer);
        setClickable(true);
      }
    }, 1000);

    try {
      await Axios.post(`/guests/auth/resendActivateMail/${userID}`);
    } catch (error) {}
  };

  if (user.active) {
    history.push("/dashboard");
  }

  if (!userID) {
    return (
      <Typography variant="h5" color="primary" align="center" gutterBottom>
        {text.activateInvalid}
      </Typography>
    );
  }

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Typography variant="h5" color="primary" align="center" gutterBottom>
          {text.pleaseActivte}
        </Typography>
        <Typography align="center" variant="subtitle1" gutterBottom>
          {text.didntReciveMain(user.email)}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Button color="primary" disabled={!clickable} onClick={handleClick}>
            {text.clickHere}
            {!clickable && <span id="timer" style={{ margin: "0 5px" }} />}
          </Button>
          <Typography align="center" variant="subtitle1">
            {text.resendActivation}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
