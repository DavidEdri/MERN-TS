import { validation, functions } from "@project/common";

const toValidate = {
  name: "asdasda",
};

validation.forms.register
  .validate(toValidate, { abortEarly: false })
  .then((a) => console.log(a))
  .catch((e) => console.log(functions.yupErrorsToObj(e)));
