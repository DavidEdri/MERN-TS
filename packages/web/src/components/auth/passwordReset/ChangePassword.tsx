import React, { useEffect, useState } from "react";
import Axios from "axios";
import EZFormikUI, { Fields } from "ez-formikui";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { validation } from "@project/common";
import { useSelector } from "react-redux";
import { Grid, Typography, Box } from "@material-ui/core";
import { isProduction } from "../../../helpers/functions";
import Loading from "../../common/Loading";
import text from "../../../helpers/text";
import { RootState } from "../../../redux/State";

const fields: Fields = [
  {
    fieldName: "password",
    label: text.passLabel,
    type: "text",
    options: "password",
    initialValue: "",
  },
  {
    fieldName: "password2",
    label: text.passConfirmLabel,
    type: "text",
    options: "password",
    initialValue: "",
  },
];

const ChangePassword: React.FC<RouteComponentProps<{ token: string }>> = ({
  match: { params },
}) => {
  const history = useHistory();
  const isLoggedin = useSelector((state: RootState) => state.auth.isLoggedin);
  const [validToken, setValidToken] = useState(false);
  const [userInfo, setUserInfo] = useState<{ name?: string; email?: string }>(
    {},
  );
  const [loading, setLoading] = useState(false);
  const { token } = params;

  const afterDefaultSubmit = () => {
    history.push("/login");
  };

  if (isLoggedin) {
    history.push("/dashboard");
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await Axios.post("/guests/auth/validateResetToken", {
          token,
        });
        setUserInfo({ name: res.data.name, email: res.data.email });
        setValidToken(true);
      } catch (error) {}
      setLoading(false);
    };

    fetch();
  }, [token]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid container justify="center" alignItems="center" direction="column">
      <Grid item md={6} xs={12}>
        <Typography align="center" gutterBottom variant="h3">
          {text.changePassword}
        </Typography>
        {validToken && (
          <>
            <Typography align="center" gutterBottom variant="h5" paragraph>
              {text.rstPwdFor}
            </Typography>
            <Typography align="center" variant="subtitle2" paragraph>
              {userInfo.name}
            </Typography>
            <Typography align="center" variant="subtitle2" paragraph>
              {userInfo.email}
            </Typography>
          </>
        )}

        {validToken ? (
          <EZFormikUI
            fields={fields}
            onSubmit={`/guests/auth/passwordReset/${token}`}
            afterDefaultSubmit={afterDefaultSubmit}
            validationSchema={validation.inputs.passwordConfirm}
            useCaptcha={isProduction()}
          />
        ) : (
          <Box display="flex" flexDirection="column">
            <Typography align="center" variant="h4">
              {text.error}
            </Typography>
            <Typography
              align="center"
              gutterBottom
              variant="subtitle1"
              color="error"
            >
              {text.activateInvalid}
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
