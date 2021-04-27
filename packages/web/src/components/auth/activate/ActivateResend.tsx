import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { Grid, Typography, Button, Box } from "@material-ui/core";
import { constants } from "@project/common";
import { useTypedSelector } from "../../../redux";

const { text } = constants;

export default function ActivateAccount() {
  const [clickable, setClickable] = useState(true);
  const [intervalNum, setIntervalNum] = useState<NodeJS.Timeout | undefined>(
    undefined,
  );
  const history = useHistory();
  const user = useTypedSelector((state) => state.auth.user);
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

    setIntervalNum(timer);
    try {
      await Axios.post(`/guests/auth/resendActivateMail/${userID}`);
    } catch (error) {}
  };

  useEffect(
    () => () => {
      if (intervalNum) clearInterval(intervalNum);
    },
    [intervalNum],
  );

  if (user?.active) {
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
          {text.pleaseActivate}
        </Typography>
        <Typography align="center" variant="subtitle1" gutterBottom>
          {text.didntReceiveMail(user?.email || "")}
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
