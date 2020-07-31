import * as Yup from "yup";
import { concatObjects } from "../../../functions";
import { requiredField, email, passwordConfirm } from "../../inputs";

export const registerFields = concatObjects(
  requiredField("name"),
  email,
  passwordConfirm
);

export const register = Yup.object().shape(registerFields);
