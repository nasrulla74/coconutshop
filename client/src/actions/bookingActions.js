import axios from "axios";
import {
  GET_BOOKINGS,
  GET_BOOKING,
  BOOKING_LOADING,
  GET_ERRORS,
  GET_BOOKINGS_DEP
} from "./types";
//get current profile

// Create Booking
export const createBooking = (bookingData, history) => dispatch => {
  axios
    .post("/api/bookings", bookingData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Create Booking
export const editBooking = (bookingData, id, history) => dispatch => {
  axios
    .post(`/api/bookings/edit/${id}`, bookingData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get All Bookings
export const getBookings = () => dispatch => {
  dispatch(setBookingLoading());
  axios
    .get("/api/bookings")
    .then(res =>
      dispatch({
        type: GET_BOOKINGS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_BOOKINGS,
        payload: null
      })
    );
};

// Get All Bookings by customer and by arrival date
export const getBookingsByCustomer = (pid, sData) => dispatch => {
  dispatch(setBookingLoading());
  axios
    .post(`/api/bookings/by-customer/${pid}`, sData)
    .then(res =>
      dispatch({
        type: GET_BOOKINGS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_BOOKINGS,
        payload: null
      })
    );
};

//Get all booking by Customer and by departure date

export const getBookingsByCustomerDep = (pid, sData) => dispatch => {
  dispatch(setBookingLoading());
  axios
    .post(`/api/bookings/by-customer-dep/${pid}`, sData)
    .then(res =>
      dispatch({
        type: GET_BOOKINGS_DEP,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_BOOKINGS_DEP,
        payload: null
      })
    );
};

//Get booking by Id

export const getBookingById = id => dispatch => {
  dispatch(setBookingLoading());
  axios
    .get(`/api/bookings/${id}`)
    .then(res =>
      dispatch({
        type: GET_BOOKING,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_BOOKING,
        payload: null
      })
    );
};

//Delete Booking
export const deleteBooking = (id, history) => dispatch => {
  if (window.confirm("Are your sure? This can NOT be undone! ")) {
    axios
      .delete(`/api/bookings/${id}`)
      .then(res => history.push("/dashboard"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

//profile loading
export const setBookingLoading = () => {
  return {
    type: BOOKING_LOADING
  };
};
