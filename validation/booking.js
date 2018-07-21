const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateBookingsInput(data) {
  let errors = {};

  data.guest_name = !isEmpty(data.guest_name) ? data.guest_name : "";
  data.arr_date = !isEmpty(data.arr_date) ? data.arr_date : "";
  data.dep_date = !isEmpty(data.dep_date) ? data.dep_date : "";
  data.hotel_name = !isEmpty(data.hotel_name) ? data.hotel_name : "";

  if (Validator.isEmpty(data.guest_name)) {
    errors.guest_name = "Guest Name field is required!";
  }

  if (Validator.isEmpty(data.arr_date)) {
    errors.arr_date = "Arrival Date field is required!";
  }

  if (Validator.isEmpty(data.dep_date)) {
    errors.dep_date = "Departure date field is required!";
  }

  if (Validator.isEmpty(data.hotel_name)) {
    errors.hotel_name = "Hotel Name field is required!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
