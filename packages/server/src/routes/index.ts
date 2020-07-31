import adminsRoutes from "./mapping/adminsRoutes";
import guestsRoutes from "./mapping/guestsRoutes";
import usersRoutes from "./mapping/usersRoutes";
import { isAdmin, isActive } from "../middleware";

export default (app: any, passportMiddleware: any) => {
  // open to all
  app.use("/guests", guestsRoutes);
  // loggedin and active
  app.use("/users", passportMiddleware, isActive, usersRoutes);
  // admin
  app.use("/admins", passportMiddleware, isAdmin, adminsRoutes);
};
