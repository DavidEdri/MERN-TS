import { UserFields } from "@project/types";
import { Document } from "mongoose";
import { pick } from "lodash";
// eslint-disable-next-line import/no-cycle
import { UserDocument } from "../../models/User";

type JsonUser = Omit<UserFields, "createdAt" | "updatedAt" | "_id"> & {
  _id: string | Document["_id"];
};

type User = UserDocument | JsonUser;

export const userToApi = (user: User) =>
  pick(user, ["_id", "name", "email", "rank", "active"]);
