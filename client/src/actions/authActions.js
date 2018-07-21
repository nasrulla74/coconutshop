import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, GET_TEAM_MEMBERS } from "./types";

//register

export const registerUser = (userData, history) => dispatch => {
  axios

    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//register member

export const registerMember = (userData, history) => dispatch => {
  axios

    .post("/api/users/register-member", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// registerAdminUser
export const registerAdminUser = (userData, history) => dispatch => {
  axios

    .post("/api/users/register-admin", userData)
    .then(res => history.push("/login-admin"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //save to local storage
      const { token } = res.data;
      //set token to LS
      localStorage.setItem("jwtToken", token);
      //set token to auth header
      setAuthToken(token);
      // decode token to get user datat
      const decoded = jwt_decode(token);
      // set currenct user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//delete team-member

// set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Get Team Members

export const getTeamMembers = id => dispatch => {
  //dispatch(setBookingLoading());
  axios
    .get(`/api/users/team-member/${id}`)
    .then(res =>
      dispatch({
        type: GET_TEAM_MEMBERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TEAM_MEMBERS,
        payload: null
      })
    );
};

//log user out

export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
