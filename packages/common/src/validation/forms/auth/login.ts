import * as Yup from "yup";
import { concatObjects } from "../../../functions";
import { requiredField, email } from "../../inputs";

export const loginFields = concatObjects(requiredField("password"), email);

export const login = Yup.object().shape(loginFields);
