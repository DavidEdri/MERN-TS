/* eslint-disable import/no-cycle */
import { Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { BaseUser } from "./DocumentType";
import { userToApi } from "../../utils/functions";

const checkDuplicates = async function (
  this: Model<BaseUser>,
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

const matchPassword = async function (this: BaseUser, candidate: string) {
  return bcrypt.compareSync(candidate, this.password);
};

const generateJWT = async function (this: BaseUser) {
  const payload = userToApi(this);
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret)
    throw new Error(`no jwt secret provided to .env.${process.env.NODE_ENV}`);

  return jwt.sign(payload, jwtSecret, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const UserFunctions = {
  statics: {
    checkDuplicates,
  },
  methods: {
    generateJWT,
    matchPassword,
  },
};
