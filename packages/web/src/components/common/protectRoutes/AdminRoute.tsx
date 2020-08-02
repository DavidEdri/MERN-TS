import React from "react";
import { Route, Redirect } from "react-router-dom";
import { functions } from "@project/common";
import { useTypedSelector } from "../../../redux";

const { isAdmin } = functions;

type Props = {
  component: any;
  [key: string]: any;
};

const AdminRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const auth = useTypedSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      // eslint-disable-next-line no-confusing-arrow
      render={(props) =>
        auth.isLoggedin === true && isAdmin(auth.user) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/unauthorized" />
        )
      }
    />
  );
};

export default AdminRoute;
