import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //delte auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
