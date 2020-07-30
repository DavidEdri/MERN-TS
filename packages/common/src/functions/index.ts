import { adminRank } from "../constants";

type Obj = Record<string, unknown>;
type PickExcludeFunc = (obj: Obj, keys: string[]) => Obj;

export const pick: PickExcludeFunc = (obj, keys) => {
  const res: Obj = {};

  keys.forEach((k) => {
    try {
      if (k in obj) res[k] = obj[k];
      else if (process.env.NODE_ENV !== "test")
        console.log(
          `pick function: cannot find key ${k} in object ${JSON.stringify(obj)}`
        );
    } catch (error) {
      console.log(`pick function: error:${error}`);
    }
  });

  return res;
};

export const exclude: PickExcludeFunc = (obj, keys) => {
  const res: Obj = {};

  try {
    Object.keys(obj).forEach((k) => {
      if (!keys.includes(k)) res[k] = obj[k];
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "test") {
      console.log(`ignore error: ${error}`);
    }
  }

  return res;
};

export const concatObjects = (...objects: { [x: string]: any }[]) =>
  objects.reduce((a, b) => ({ ...a, ...b }), {});

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
