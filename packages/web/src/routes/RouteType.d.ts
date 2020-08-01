export type RouteType = {
  path: string;
  component: React.ComponentType<any>;
  /**
   * if provided link will be visible on drawer
   */
  linkText?: string;
  /**
   * if provided link will get extra restriction
   */
  restriction?: "loggedOut" | "loggedIn" | "admin";
};
