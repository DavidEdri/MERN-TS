import { pick } from "lodash";
// eslint-disable-next-line import/no-cycle
import { UserDocument } from "../../models/User";
import { BaseUser } from "../../models/User/DocumentType";

type User = UserDocument | BaseUser;

export const userToApi = (user: User) =>
  pick(user, ["_id", "name", "email", "rank", "active"]);
