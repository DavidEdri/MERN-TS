import React from "react";
import { Route, Redirect } from "react-router-dom";
import { functions } from "@project/common";
import { RootState, useTypedSelector } from "../../../redux";

type Props = {
  component: any;
  [key: string]: any;
};

const LoggedinRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const auth = useTypedSelector((state) => state.auth);

  const navigate = (authState: RootState["auth"], props: any) => {
    if (!authState.isLoggedin) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              lastPath: window.location.pathname,
            },
          }}
        />
      );
    }
    if (!functions.isActive(auth.user)) {
      return <Redirect to="/activate" />;
    }

    return <Component {...props} />;
  };

  return <Route {...rest} render={(props) => navigate(auth, props)} />;
};

export default LoggedinRoute;
