import * as Yup from "yup";
import { requiredField } from "../../inputs";

const name = requiredField("name");

export const editInfo = Yup.object().shape(name);
