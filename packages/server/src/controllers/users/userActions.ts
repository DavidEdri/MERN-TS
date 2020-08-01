import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { functions, validation } from "@project/common";
import User from "../../models/User";
import returnText from "../_text";
import { functions as utilsFunctions } from "../../utils";

const { userToApi, errorHandler } = utilsFunctions;

const refreshJWT: RequestHandler = async (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const user = await User.findById(req.user!._id);
    if (!user) throw new Error("no user");

    const payload = userToApi(user);
    const secret = process.env.JWT_SECRET;

    if (!secret) throw new Error("no secret provided to .env");

    const token = jwt.sign(payload, secret, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    return res.status(200).json({ success: true, token: `Bearer ${token}` });
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
};

const editInfo: RequestHandler = async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { email } = req.user!;
  const { name, passwords } = req.body;
  const { password, password2 } = passwords;

  try {
    await validation.forms.users.editInfo.validate(
      { name },
      { abortEarly: false },
    );

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(500).json({ msg: returnText.serverError });
    }

    if (password !== "" || password2 !== "") {
      try {
        await validation.forms.auth.changePassword.validate(
          { password, password2 },
          { abortEarly: false },
        );
      } catch (error) {
        return res
          .status(400)
          .json({ passwords: functions.yupErrorsToObj(error) });
      }

      user.password = password;
    }

    user.name = name;
    await user.save();

    return res.status(200).json("success");
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
};

export default { editInfo, refreshJWT };
