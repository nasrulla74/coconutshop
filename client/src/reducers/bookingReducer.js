import {
  GET_BOOKINGS,
  GET_BOOKING,
  BOOKING_LOADING,
  DELETE_BOOKING,
  GET_BOOKINGS_DEP
} from "../actions/types";

const initialState = {
  booking: null,
  bookings: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BOOKING_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_BOOKINGS:
      return {
        ...state,
        bookings: action.payload,
        loading: false
      };

    case GET_BOOKING:
      return {
        ...state,
        booking: action.payload,
        loading: false
      };

    case GET_BOOKINGS_DEP:
      return {
        ...state,
        depbookings: action.payload,
        loading: false
      };

    case DELETE_BOOKING:
      return {
        ...state,
        booking: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
