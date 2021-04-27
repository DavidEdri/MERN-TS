import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { constants } from "@project/common";
import Svg from "./svg";

const { text } = constants;

const useStyles = makeStyles(() => ({
  btn: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function PageNotFound() {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12} sm={8}>
        <Svg />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" color="primary" gutterBottom align="center">
          {text._404main}
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.btn}>
        <Button variant="contained" color="primary" component={Link} to="/">
          {text._404sub}
        </Button>
      </Grid>
    </Grid>
  );
}
