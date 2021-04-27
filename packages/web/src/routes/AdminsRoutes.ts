import { constants } from "@project/common";
import AdminHome from "../components/admin/Home";
import Users from "../components/admin/tables/Users";
import { RouteType } from "./RouteType";

const { text } = constants;

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
