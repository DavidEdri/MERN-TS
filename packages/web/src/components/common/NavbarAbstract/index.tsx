import React, { useState, useEffect, useRef } from "react";
import clsx from "classnames";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import UserIcon from "@material-ui/icons/Person";
import { functions } from "@project/common";
import { logoutUser } from "../../../redux/actions/authActions";
import { isRTL } from "../../../helpers/constants";
import text from "../../../helpers/text";
import SelectMenu from "../SelectMenu";
import useStyles from "./style";
import NavLink from "./NavLink";
import { RouteType } from "../../../routes/RouteType";
import { useTypedSelector } from "../../../redux";

type LinksArray = RouteType[];

type Props = {
  links: LinksArray;
  adminLinks?: LinksArray;
};

const NavbarAbstract: React.FC<Props> = ({ links, adminLinks }) => {
  const history = useHistory();
  const auth = useTypedSelector((state) => state.auth);
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>();
  const [open, setOpen] = useState(false);
  const [margin, setMargin] = useState(0);
  const classes = useStyles({ margin });
  const { isLoggedin } = auth;
  const isAdmin = isLoggedin && functions.isAdmin(auth.user);

  const typeToState = (type?: "admin" | "loggedIn" | "loggedOut") => {
    switch (type) {
      case "admin":
        return isAdmin;
      case "loggedIn":
        return isLoggedin;
      case "loggedOut":
        return !isLoggedin;
      default:
        return true;
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const renderLinks = (linksArr: LinksArray) =>
    linksArr.map((link, i) => (
      <React.Fragment key={i}>
        {typeToState(link.restriction) && (
          <NavLink
            to={link.path}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            text={link.linkText!}
            closeMenu={handleDrawerClose}
          />
        )}
      </React.Fragment>
    ));

  const logout = () => {
    dispatch(logoutUser());
    history.push("/");
  };

  useEffect(() => {
    const resizeListener = () => {
      const newMargin = ref.current?.clientHeight;
      setMargin(newMargin || 80);
    };

    resizeListener();

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(
          classes.appBar,
          open && classes.appBarShift,
          classes.tabtopcolor,
        )}
        ref={ref}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden,
            )}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
            component={Link}
            to="/"
          >
            {text.logo}
          </Typography>

          {isLoggedin && (
            <SelectMenu
              buttonText={<UserIcon color="inherit" />}
              links={[
                {
                  text: text.profile,
                  to: "/dashboard/profile/home",
                },
                {
                  text: text.logout,
                  to: logout,
                },
              ]}
            />
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {text.menu}
          </Typography>

          <IconButton onClick={handleDrawerClose}>
            {isRTL ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {renderLinks(links)}
          {adminLinks && isAdmin && (
            <>
              <Divider />
              <ListSubheader className={classes.textCenter}>
                Admin
              </ListSubheader>
              {renderLinks(adminLinks)}
            </>
          )}
        </List>
      </Drawer>
    </div>
  );
};

export default NavbarAbstract;
