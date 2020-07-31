import axios from "axios";
import jwtDecode from "jwt-decode";
import { Dispatch } from "react";
import { setUser } from "../slices/auth";
import { setAuthToken } from "../../helpers/functions";

export const loginUser = (token: string) => {
  localStorage.setItem("jwtToken", token);
  setAuthToken(token);

  const decoded = jwtDecode(token);

  return setUser(decoded);
};
// TODO add decoded jwt type
export const setCurrentUser = (decoded: { [x: string]: any }) =>
  setUser(decoded);

export const refreshJwt = async (dispatch: Dispatch<any>) => {
  const res = await axios.get("/users/userActions/refreshJWT");
  const { token } = res.data;

  dispatch(loginUser(token));
};

export const logoutUser = () => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  return setUser({});
};
