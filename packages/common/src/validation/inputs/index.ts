import * as Yup from "yup";
import { ranks } from "../../constants";
import text from "../text";

export const requiredField = (fieldName: string) => ({
  [`${fieldName}`]: Yup.string().required(text.requiredField),
});

export const boolField = (fieldName: string) => ({
  [`${fieldName}`]: Yup.boolean().required(text.requiredField),
});

export const email = {
  email: Yup.string().required(text.requiredField).email(text.invalidEmail),
};

export const passwordConfirm = {
  password: Yup.string()
    .required(text.requiredField)
    .matches(
      /^(?:(?=.*[a-z])|(?=.*[A-Z])(?:(?=.*[A-Z])(?=.*[\d])|(?=.*\d))|(?=.*[A-Z])(?=.*[a-z])(?=.*\d)).{8,16}$/,
      text.weakPassword
    ),
  password2: Yup.string()
    .required(text.requiredField)
    .oneOf([Yup.ref("password"), ""], text.passwordsDontMatch),
};

export const rank = {
  rank: Yup.number()
    .typeError(text.rankInteger)
    .required(text.requiredField)
    .integer(text.rankInteger)
    .min(ranks[0].value, text.rankOutOfRange)
    .max(ranks[ranks.length - 1].value, text.rankOutOfRange),
};

// file example
/*
 Yup.object().shape({
  upload: Yup.mixed()
    .required("A file is required")
    .test("fileFormat", "PDF only", (value) => {
      console.log(value);
      return value && ["text/plain"].includes(value.type);
    }),
})
*/
