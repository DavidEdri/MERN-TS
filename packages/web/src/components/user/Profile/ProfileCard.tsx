/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Grid,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Button,
  Typography,
  Collapse,
} from "@material-ui/core";
import ShowMoreIcon from "@material-ui/icons/ExpandMore";
import ShowLessIcon from "@material-ui/icons/ExpandLess";
import EmailIcon from "@material-ui/icons/Email";
import text from "../../../helpers/text";
import { useGuaranteedUserSelector } from "../../../redux";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    marginBottom: "15px",
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    fontSize: "72px",
    margin: 10,
    width: 120,
    height: 120,
  },
  card: {
    width: "100%",
    position: "relative",
    paddingTop: "15px",
  },
  cardContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  cardActions: {
    justifyContent: "center",
  },
  cardHeader: {
    padding: 0,
    paddingRight: "10px",
    color: theme.palette.primary.main,
    "& svg": {
      fontSize: "2rem",
    },
  },
}));

type Props = {
  showCollapse: boolean;
};

const ProfileInfo: React.FC<Props> = ({ showCollapse }) => {
  const classes = useStyles();
  const user = useGuaranteedUserSelector();
  const [showInfo, setShowInfo] = useState(showCollapse);

  const toggleShow = () => setShowInfo((old) => !old);

  const ActionEl = () => (
    <div onClick={toggleShow} role="button" tabIndex={0}>
      {showInfo ? <ShowLessIcon /> : <ShowMoreIcon />}
    </div>
  );

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item md={6} xs>
        <Card className={classes.card}>
          <CardHeader className={classes.cardHeader} action={<ActionEl />} />

          <Collapse in={showInfo}>
            <CardContent className={classes.cardContent}>
              <Avatar className={classes.avatar}>
                {user.name[0].toUpperCase()}
              </Avatar>
              <Typography variant="h4">{user.name}</Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={user.email} />
                </ListItem>
              </List>
            </CardContent>
          </Collapse>

          <CardActions className={classes.cardActions}>
            <Button
              color="primary"
              size="small"
              component={Link}
              onClick={() => setShowInfo(false)}
              to="/dashboard/profile/info"
            >
              {text.editProfileInfo}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfileInfo;
