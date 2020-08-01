import { UserFields } from "./models";

export type UserPayload = {
  _id: UserFields["_id"];
  name: UserFields["name"];
  email: UserFields["email"];
  rank: UserFields["rank"];
  active: UserFields["active"];
  iat: number;
  exp: number;
};
