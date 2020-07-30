import * as Yup from "yup";
import { concatObjects } from "../../../functions";
import { registerFields } from "../register";
import { requiredField, rank, boolField } from "../../inputs";

const activeField = boolField("active");

export const adminAddUser = Yup.object().shape(
  concatObjects(registerFields, rank, activeField)
);

export const adminEditUser = Yup.object().shape(
  concatObjects(requiredField("name"), rank, activeField)
);
