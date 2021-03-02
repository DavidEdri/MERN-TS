import { UserFields } from "@project/types";
import { pick } from "lodash";

export const userToApi = <T extends UserFields>(user: T) =>
  pick(user, ["_id", "name", "email", "rank", "active"]);
