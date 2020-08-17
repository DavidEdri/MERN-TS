import { UserFields } from "./models";

export type UserPayload = Pick<
  UserFields,
  "_id" | "name" | "rank" | "email" | "active"
> & {
  iat: number;
  exp: number;
};
