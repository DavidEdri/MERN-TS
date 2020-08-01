import jwtDecode from "jwt-decode";
import { UserPayload } from "@project/types";
import { setAuthToken } from "./functions";
import { logoutUser, setCurrentUser } from "../redux/actions/authActions";
import store from "../redux";

const loadLocalStorage = () => {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded: UserPayload = jwtDecode(localStorage.jwtToken);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
      window.location.href = "/login";
    } else {
      store.dispatch(setCurrentUser(decoded));
    }
  }
};

export default loadLocalStorage;
