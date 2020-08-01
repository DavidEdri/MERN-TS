import { Request } from "express";
import { pick } from "lodash";
import { functions, UserPayload } from "@project/common";
import { logError } from "./logger";
import returnText from "../controllers/_text";
import { UserDocument } from "../models/User";

export const errorHandler = (error: any, req: Request) => {
  let json;
  let status;

  if (functions.isYupObj(error)) {
    json = functions.yupErrorsToObj(error);
    status = 400;

    return { json, status };
  }

  logError(error, req);

  json = { msg: returnText.serverError };
  status = 500;

  return { json, status };
};

export const userToApi = (
  user: UserDocument | { [key: string]: any },
): UserPayload => pick(user, ["_id", "name", "email", "rank", "active"]);
