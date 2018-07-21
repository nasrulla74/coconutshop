const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const BookingsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  guest_name: {
    type: String,
    required: true,
    max: 40
  },
  hotel_name: {
    type: String,
    required: true
  },
  arr_date: {
    type: Date,
    required: true
  },
  dep_date: {
    type: Date,
    required: true
  },
  arr_flight: {
    type: String
  },
  dep_flight: {
    type: String
  },
  arr_trfby: {
    type: String
  },
  dep_trfby: {
    type: String
  },
  adults: {
    type: String,
    default: 1
  },
  childs: {
    type: String,
    default: 0
  },
  infants: {
    type: String,
    default: 0
  },

  booking_status: {
    type: String,
    default: "Confirmed"
  },

  ispayment_received: {
    type: String
  },

  ishotel_paid: {
    type: String
  },

  meal_plan: {
    type: String
  },

  booking_remarks: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Bookings = mongoose.model("bookings", BookingsSchema);
