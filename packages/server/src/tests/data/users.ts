import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { constants } from "@project/common";
import User from "../../models/User";
import { userToApi } from "../../utils/functions";

export const firstUser = {
  _id: new mongoose.Types.ObjectId(),
  name: "david",
  email: "David1@dummyMail.com",
  password: "a123456b",
  activateToken: "Token",
};

export const adminUser = {
  _id: new mongoose.Types.ObjectId(),
  name: "david",
  email: "admin@dummyMail.com",
  rank: constants.adminRank,
  password: "a123456b",
  activateToken: "Token",
};

const secret = process.env.JWT_SECRET || "defaultSecret";

export const loggedinToken = jwt.sign(userToApi(firstUser), secret, {
  expiresIn: process.env.JWT_EXPIRE,
});

export const adminToken = jwt.sign(userToApi(adminUser), secret, {
  expiresIn: process.env.JWT_EXPIRE,
});

export const newUser = {
  name: "david2",
  email: "David2@dummyMail.com",
  password: "a123456b",
  password2: "a123456b",
};

export const existingUser = {
  name: "david",
  email: "David1@dummyMail.com",
  password: "a123456b",
  password2: "a123456b",
};

export const tearup = async (active = false) => {
  await User.deleteMany({});
  await new User({ ...firstUser, active }).save();
  await new User(adminUser).save();
};
