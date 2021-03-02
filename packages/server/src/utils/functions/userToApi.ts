import { pick } from "lodash";
// eslint-disable-next-line import/no-cycle
import { UserDocument } from "../../models/User";

export const userToApi = (user: UserDocument) =>
  pick(user, ["_id", "name", "email", "rank", "active"]);
