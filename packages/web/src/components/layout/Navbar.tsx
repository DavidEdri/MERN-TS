import React from "react";
import NavbarAbstract from "../common/NavbarAbstract";
import { GuestsRoutes, UsersRoutes, AdminsRoutes } from "../../routes";
import { RouteType } from "../../routes/RouteType";

type LinksArr = RouteType[];

const guestLinks: LinksArr = GuestsRoutes.filter((r) => r.linkText);
const userLinks: LinksArr = UsersRoutes.filter((r) => r.linkText).map((r) => ({
  ...r,
  restriction: "loggedIn",
}));
const adminLinks: LinksArr = AdminsRoutes.filter((r) => r.linkText).map(
  (r) => ({
    ...r,
    restriction: "admin",
  }),
);

const links = [...guestLinks, ...userLinks, ...adminLinks];

export default function Navbar() {
  return <NavbarAbstract links={links} />;
}
