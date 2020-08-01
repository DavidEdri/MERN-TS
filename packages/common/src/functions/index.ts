import { adminRank } from "../constants";

type PropertyName = string | number;
type Obj = {
  [key in PropertyName]: any;
};

// TODO add types for user and yup error

export const isAdmin = (user: any) => user && user.rank >= adminRank;

export const isActive = (user: any) => user && (user.active || isAdmin(user));

export const isYupObj = (o: any) =>
  typeof o === "object" && o.name === "ValidationError";

export const yupErrorsToObj = (e: any) => {
  const errors: Obj = {};
  try {
    e.inner.forEach((err: any) => {
      errors[err.path] = err.message;
    });
  } catch (error) {
    console.log("YupErrorsToObj : conversion error");
  }
  return errors;
};

/**
 * concatObjects is no longer maintained
 */
export const concatObjects = (...objects: { [x: string]: any }[]) =>
  objects.reduce((a, b) => ({ ...a, ...b }), {});
