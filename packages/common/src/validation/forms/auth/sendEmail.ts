import * as Yup from "yup";
import { email } from "../../inputs";

export const sendEmail = Yup.object().shape(email);
