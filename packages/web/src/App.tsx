import React from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { Container } from "@material-ui/core";
import { setCaptchaKey } from "ez-formikui";
import axiosConfig from "./helpers/axiosConfig";
import loadLocalStorage from "./helpers/loadLocalStorage";

import "./App.css";
import store from "./redux";
import LoggedinRoute from "./components/common/protectRoutes/LoggedinRoute";
import AdminRoute from "./components/common/protectRoutes/AdminRoute";
import { AdminsRoutes, UsersRoutes, GuestsRoutes } from "./routes";
import AppProvider from "./AppProvider";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Utils from "./components/utils";
import PageNotFound from "./components/404";

const captchaKey = process.env.REACT_APP_CAPTCHA_KEY || "";

axiosConfig();
loadLocalStorage();
setCaptchaKey(captchaKey);

export default function App() {
  return (
    <Provider store={store}>
      <AppProvider>
        <Route path="/" component={Navbar} />
        <Container maxWidth={false} style={{ minHeight: "82vh" }}>
          <Switch>
            {GuestsRoutes.map((r) => (
              <Route exact path={r.path} component={r.component} key={r.path} />
            ))}

            {UsersRoutes.map((r) => (
              <LoggedinRoute
                exact
                path={r.path}
                component={r.component}
                key={r.path}
              />
            ))}

            {AdminsRoutes.map((r) => (
              <AdminRoute
                exact
                path={r.path}
                component={r.component}
                key={r.path}
              />
            ))}

            <Route component={PageNotFound} />
          </Switch>
        </Container>
        <Footer />
        <Utils />
      </AppProvider>
    </Provider>
  );
}
