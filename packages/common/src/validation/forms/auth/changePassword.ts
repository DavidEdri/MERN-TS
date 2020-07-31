import * as Yup from "yup";
import { passwordConfirm } from "../../inputs";

export const changePassword = Yup.object().shape(passwordConfirm);
