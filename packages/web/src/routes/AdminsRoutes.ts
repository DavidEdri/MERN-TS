import AdminHome from "../components/admin/Home";
import Users from "../components/admin/tables/Users";
import text from "../helpers/text";
import { RouteType } from "./RouteType";

const routes: RouteType[] = [
  {
    path: "/admin",
    component: AdminHome,
    linkText: text.adminLink,
  },
  {
    path: "/admin/users",
    component: Users,
    linkText: text.adminUsersLink,
  },
];

export default routes;
