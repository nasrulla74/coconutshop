import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "../actions/authActions";
import store from "../store";
import { clearCurrentProfile } from "../actions/profileActions";

const isLoggedIn = () => {
  if (localStorage.jwtToken) {
    //set auth token header auth

    setAuthToken(localStorage.jwtToken);
    // decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    //set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    // check for expired token

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      //log out user

      store.dispatch(logoutUser());

      store.dispatch(clearCurrentProfile());
      // redirect to login
      window.location.href = "/login";
      return false;
    } else {
      return true;
    }
  }
};
export default isLoggedIn;
