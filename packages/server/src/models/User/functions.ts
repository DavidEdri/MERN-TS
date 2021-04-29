/* eslint-disable import/no-cycle */
import { Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pick } from "lodash";
import { UserDocument } from "./Document";

const checkDuplicates = async function (
  this: Model<UserDocument>,
  email: string,
  id?: string,
) {
  const User = this;
  const user = await User.findOne({
    email,
    _id: { $ne: id },
  });

  return !!user;
};

const matchPassword = function (this: UserDocument, candidate: string) {
  return bcrypt.compareSync(candidate, this.password);
};

const userToJSON = function (this: UserDocument) {
  return pick(this, ["_id", "name", "email", "rank", "active"]);
};

const generateJWT = function (this: UserDocument) {
  const payload = this.userToJSON();
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret)
    throw new Error(`no jwt secret provided to .env.${process.env.NODE_ENV}`);

  return jwt.sign(payload, jwtSecret, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const statics = {
  checkDuplicates,
};

export const methods = {
  generateJWT,
  matchPassword,
  userToJSON,
};
