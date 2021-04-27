import { Request } from "express";
import { constants, functions } from "@project/common";
import { logError } from "../logger";

const { text: returnText } = constants;

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
