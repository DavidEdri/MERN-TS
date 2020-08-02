import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { useHistory, RouteComponentProps } from "react-router-dom";
import {
  Grid,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { logoutUser } from "../../../redux/actions/authActions";
import text from "../../../helpers/text";
import { useTypedSelector } from "../../../redux";

const ValidateToken: React.FC<RouteComponentProps<{ token: string }>> = ({
  match: { params },
}) => {
  const [content, setContent] = useState(<CircularProgress />);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useTypedSelector((state) => state.auth.user);
  const { token } = params;

  if (user?.active) {
    history.push("/dashboard");
  }

  useEffect(() => {
    const handleRedirect = () => {
      if (user) {
        dispatch(logoutUser());
      }
      history.push("/login");
    };

    const fetch = async () => {
      try {
        await Axios.post(`/guests/auth/activate/${token}`);
        setContent(
          <>
            <Typography
              variant="h5"
              color="primary"
              align="center"
              gutterBottom
            >
              {text.accActivated}
            </Typography>

            <Typography
              align="center"
              variant="subtitle1"
              paragraph
              gutterBottom
            >
              {text.redirectingToLogin}
            </Typography>

            <Box display="flex" alignItems="center" justifyContent="center">
              <Button color="primary" onClick={handleRedirect}>
                {text.clickHere}
              </Button>
              <Typography align="center" variant="subtitle1">
                {text.notRedirected}
              </Typography>
            </Box>
          </>,
        );
        setTimeout(handleRedirect, 5000);
      } catch (error) {
        setContent(
          <Typography align="center" variant="subtitle1" color="error">
            {text.activateInvalid}
          </Typography>,
        );
      }
    };

    fetch();
  }, [dispatch, history, token, user]);

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ minHeight: "400px" }}
    >
      <Grid item xs={12}>
        {content}
      </Grid>
    </Grid>
  );
};

export default ValidateToken;
