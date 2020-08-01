import DashboardHome from "../components/user/Home";
import Profile from "../components/user/Profile";
import text from "../helpers/text";
import { RouteType } from "./RouteType";

const routes: RouteType[] = [
  {
    path: "/dashboard",
    component: DashboardHome,
    linkText: text.dashboardLink,
  },
  {
    path: "/dashboard/profile/:field",
    component: Profile,
  },
];

export default routes;
