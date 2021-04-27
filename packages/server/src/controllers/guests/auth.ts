import crypto from "crypto";
import moment from "moment";
import { RequestHandler } from "express";
import { pick, omit } from "lodash";
import { constants, validation } from "@project/common";
import { mailTemplates, functions as utilsFunctions } from "../../utils";
import User from "../../models/User";
import { sendMail } from "../../utils/functions";

const { text: returnText } = constants;

const { errorHandler } = utilsFunctions;

const register: RequestHandler = async (req, res) => {
  const data = pick(req.body, ["email", "password", "password2", "name"]);
  const errors: { [key: string]: string } = {};

  try {
    await validation.auth.register.validate(data, { abortEarly: false });
    const exists = await User.checkDuplicates(data.email);

    if (exists) {
      errors.email = returnText.emailExist;
      return res.status(400).json(errors);
    }

    const newUser = new User({
      ...omit(data, ["password2"]),
      activateToken: crypto.randomBytes(20).toString("hex"),
    });

    await sendMail(
      mailTemplates.registerEmail(newUser.email, newUser.activateToken!),
    );
    await newUser.save();

    return res
      .status(200)
      .json({ msg: returnText.registerInstructions(newUser.email) });
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
};

const activate: RequestHandler = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ activateToken: token });

    if (!user) return res.status(400).json("invalid token");

    user.active = true;
    user.activateToken = undefined;
    await user.save();

    return res.status(200).json("activated user");
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
};

const login: RequestHandler = async (req, res) => {
  const data = pick(req.body, ["email", "password"]);
  const errors: { [key: string]: string } = {};

  try {
    await validation.auth.login.validate(data, { abortEarly: false });
    const user = await User.findOne({ email: data.email });

    if (!user) {
      errors.general = returnText.passOrEmailError;
      return res.status(400).json(errors);
    }

    const isMatch = await user.matchPassword(data.password);

    if (!isMatch) {
      errors.general = returnText.passOrEmailError;
      return res.status(400).json(errors);
    }

    const token = await user.generateJWT();

    return res.status(200).json({ success: true, token: `Bearer ${token}` });
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
};

const passwordReset: RequestHandler = async (req, res) => {
  const errors: { [key: string]: string } = {};
  try {
    const { email } = req.body;
    await validation.auth.sendEmail.validate({ email }, { abortEarly: false });

    const user = await User.findOne({ email });

    if (!user) {
      errors.general = returnText.emailNotFound;
      return res.status(400).json(errors);
    }

    const token = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = moment(new Date()).add(1, "day").toDate();
    await user.save();

    await sendMail(mailTemplates.resetPasswordEmail(email, token));

    return res.status(200).json({ success: true });
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
};

const validateResetToken: RequestHandler = async (req, res) => {
  const { token } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: moment().toDate() },
    });

    if (!user) {
      return res.status(400).json({ res: "invalidToken" });
    }

    return res.status(200).json({ name: user.name, email: user.email });
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
};

const passwordResetWithToken: RequestHandler = async (req, res) => {
  const errors: { [key: string]: string } = {};
  try {
    const { token } = req.params;
    const { password, password2 } = req.body;

    await validation.auth.changePassword.validate(
      { password, password2 },
      { abortEarly: false },
    );

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: moment().toDate() },
    });

    if (!user) {
      errors.general = returnText.tokenLinkError;
      return res.status(400).json(errors);
    }

    user.password = password;
    user.resetPasswordExpires = undefined;
    user.resetPasswordToken = undefined;

    await user.save();
    return res.status(200).json({ msg: returnText.passwordChanged });
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
};

const resendActivateMail: RequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(500).json({ msg: returnText.serverError });

    user.activateToken = crypto.randomBytes(20).toString("hex");
    await user.save();

    await sendMail(mailTemplates.registerEmail(user.email, user.activateToken));
    return res
      .status(200)
      .json({ msg: returnText.registerInstructions(user.email) });
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
};

export default {
  login,
  register,
  activate,
  passwordReset,
  passwordResetWithToken,
  validateResetToken,
  resendActivateMail,
};
