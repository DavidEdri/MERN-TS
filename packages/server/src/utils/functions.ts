import { Request } from "express";
import { functions } from "@project/common";
import { logError } from "./logger";
import returnText from "../controllers/_text";
import { UserDocument } from "../models/User";

const { pick } = functions;

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

export const userToApi = (user: UserDocument | { [key: string]: any }) =>
  pick(user, ["_id", "name", "email", "rank", "active"]);
