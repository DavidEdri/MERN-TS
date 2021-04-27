import React from "react";
import EZFormikUI, { Fields } from "ez-formikui";
import { useHistory } from "react-router-dom";
import { constants, validation } from "@project/common";
import { Grid, Typography, Box } from "@material-ui/core";
import { isProduction } from "../../../helpers/functions";
import { useTypedSelector } from "../../../redux";

const { text } = constants;

const fields: Fields = [
  {
    fieldName: "email",
    label: text.emailLabel,
    type: "text",
    options: "email",
    initialValue: "",
  },
];

export default function SendPwdToken() {
  const history = useHistory();
  const isLoggedin = useTypedSelector((state) => state.auth.isLoggedin);
  const [sent, setSent] = React.useState(false);

  const afterDefaultSubmit = () => {
    setSent(true);
  };

  if (isLoggedin) {
    history.push("/dashboard");
  }

  return (
    <Grid container justify="center">
      {!sent ? (
        <Grid item md={6} xs={12}>
          <EZFormikUI
            fields={fields}
            title="Password Reset"
            paragraph="Enter your email"
            onSubmit="/guests/auth/passwordReset"
            afterDefaultSubmit={afterDefaultSubmit}
            validationSchema={validation.auth.sendEmail}
            useCaptcha={isProduction()}
          />
        </Grid>
      ) : (
        <Box display="flex" flexDirection="column">
          <Typography align="center" variant="h4">
            {text.success}
          </Typography>
          <Typography align="center" gutterBottom variant="subtitle1">
            {text.followMail}
          </Typography>
        </Box>
      )}
    </Grid>
  );
}
