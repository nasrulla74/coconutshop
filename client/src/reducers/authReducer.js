import isEmpty from "../validation/is-Empty";
import { SET_CURRENT_USER, GET_TEAM_MEMBERS } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    case GET_TEAM_MEMBERS:
      return {
        ...state,
        team_members: action.payload
      };

    default:
      return state;
  }
}
