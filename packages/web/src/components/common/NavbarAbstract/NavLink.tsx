import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  textCenter: {
    textAlign: "center",
  },
}));

type Props = {
  to: string;
  text: string;
  closeMenu: () => void;
};

const NavLink: React.FC<Props> = ({ to, text, closeMenu }) => {
  const classes = useStyles();

  return (
    <ListItem
      alignItems="center"
      onClick={closeMenu}
      button
      component={Link}
      to={to}
    >
      <ListItemText className={classes.textCenter} primary={text} />
    </ListItem>
  );
};

export default NavLink;
