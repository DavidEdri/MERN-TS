import GuestHome from "../components/guest/Home";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import ActivateAccount from "../components/auth/activate/ActivateResend";
import ValidateToken from "../components/auth/activate/ValidateToken";
import SendPwdToken from "../components/auth/passwordReset/SendPwdToken";
import ChangePassword from "../components/auth/passwordReset/ChangePassword";
import text from "../helpers/text";
import { RouteType } from "./RouteType";

const routes: RouteType[] = [
  {
    path: "/",
    component: GuestHome,
    linkText: text.homeLink,
  },
  {
    path: "/login",
    component: Login,
    linkText: text.loginLink,
    restriction: "loggedOut",
  },
  {
    path: "/register",
    component: Register,
    linkText: text.registerLink,
    restriction: "loggedOut",
  },
  {
    path: "/activate",
    component: ActivateAccount,
  },
  {
    path: "/activate/:token",
    component: ValidateToken,
  },
  {
    path: "/forgotPassword",
    component: SendPwdToken,
  },
  {
    path: "/passwordReset/:token",
    component: ChangePassword,
  },
];

export default routes;
