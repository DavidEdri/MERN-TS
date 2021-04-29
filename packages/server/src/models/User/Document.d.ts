import { Document, Model } from "mongoose";
import type { UserFields } from "@project/types";

export type BaseUser = Document & UserFields;
export type UserDocument = BaseUser & {
  generateJWT: () => string;
  matchPassword: (candidate: string) => boolean;
  userToJSON: () => Pick<
    BaseUser,
    "_id" | "name" | "email" | "rank" | "active"
  >;
};
export type Statics = Model<UserDocument> & {
  checkDuplicates: (email: string, id?: string) => Promise<boolean>;
};
