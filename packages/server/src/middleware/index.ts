import { functions } from "@project/common";
import { NextFunction, Response, Request } from "express";

type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export const isActive: MiddlewareFunction = (req, res, next) => {
  if (functions.isActive(req.user)) {
    next();
  } else {
    res.status(400).json({ msg: "Activate your account" });
  }
};

export const isAdmin: MiddlewareFunction = (req, res, next) => {
  if (functions.isAdmin(req.user)) {
    next();
  } else {
    res.status(401).json({ msg: "Unauthorized" });
  }
};
