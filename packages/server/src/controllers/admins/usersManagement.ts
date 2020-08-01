import { validation } from "@project/common";
import { pick, omit } from "lodash";
import { RequestHandler } from "express";
import User from "../../models/User";
import returnText from "../_text";
import { functions as utilsFunctions } from "../../utils";

const { userToApi, errorHandler } = utilsFunctions;

const get: RequestHandler = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    const result = users.map((u) => userToApi(u));

    return res.status(200).json(result);
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
};

const post: RequestHandler = async (req, res) => {
  const data = pick(req.body, [
    "name",
    "email",
    "rank",
    "password",
    "password2",
    "active",
  ]);

  const errors: { [key: string]: string } = {};
  try {
    await validation.forms.admins.adminAddUser.validate(data, {
      abortEarly: false,
    });
    const user = await User.findOne({ email: data.email });

    if (user) {
      errors.general = returnText.emailExist;
      return res.status(400).json(errors);
    }
    const newUser = new User(omit(data, ["password2"]));

    await newUser.save();

    return res.status(200).json(userToApi(newUser));
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
};

const del: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).json({ msg: returnText.serverError });
    }

    return res.status(200).json("success");
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
};

const put: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const data = pick(req.body, ["name", "rank", "active"]);

  try {
    await validation.forms.admins.adminEditUser.validate(data, {
      abortEarly: false,
    });

    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ msg: returnText.serverError });
    }

    user.name = data.name;
    user.rank = data.rank;
    user.active = data.active;

    await user.save();

    return res.status(200).json(userToApi(user));
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
};

const changePass: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const data = pick(req.body, ["password", "password2"]);

  try {
    await validation.forms.auth.changePassword.validate(data, {
      abortEarly: false,
    });

    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ msg: returnText.serverError });
    }

    user.password = data.password;
    await user.save();

    return res.status(200).json("success");
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
};

export default {
  get,
  post,
  del,
  put,
  changePass,
};
