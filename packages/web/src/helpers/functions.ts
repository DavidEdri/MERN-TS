import axios from "axios";

export const setAuthToken = (token: string | false) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const isProduction = () => process.env.NODE_ENV === "production";
