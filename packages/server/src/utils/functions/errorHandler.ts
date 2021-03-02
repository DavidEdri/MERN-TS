import { Request } from "express";
import { functions } from "@project/common";
import { logError } from "../logger";
import returnText from "../../controllers/_text";

export const errorHandler = (error: any, req: Request) => {
  let json;
  let status;

  if (functions.isYupObj(error)) {
    json = functions.yupErrorsToObj(error);
    status = 400;

    if (json) return { json, status };
  }

  logError(error, req);

  json = { msg: returnText.serverError };
  status = 500;

  return { json, status };
};
