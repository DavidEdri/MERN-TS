import * as Yup from "yup";
import { concatObjects } from "../../../functions";
import { requiredField, email, passwordConfirm } from "../../inputs";

export const loginFields = concatObjects(
  requiredField("name"),
  email,
  passwordConfirm
);

export const login = Yup.object().shape(loginFields);
