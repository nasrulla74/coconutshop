const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load validation
const validateBookingsInput = require("../../validation/booking");

// load booking model
const Bookings = require("../../models/Bookings");

// load user model
const User = require("../../models/User");

// @route GET api/booking/test
// @desc test booking route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "booking works" }));

// @route GET api/booking
// @desc get current users booking
// @access Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Bookings.find()
      .populate("user", ["name", "avatar"])
      .then(booking => {
        if (!booking) {
          errors.nobooking = "There is no booking for this user!";
          return res.status(404).json(errors);
        }
        res.json(booking);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route GET api/bookings
// @desc  booking filter by Arrival Date and customer
// @access Private
router.post(
  "/by-customer/:pid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const ardate = req.body.dt_from; //"Sun Jul 02 2018 00:00:00";
    const dpdate = req.body.dt_to; //"Thu Jul 19 2018 23:59:59";

    Bookings.find({
      user: req.params.pid,
      arr_date: { $gte: ardate, $lte: dpdate }
    })
      .sort({ arr_date: 1 })
      .populate("user", ["name", "avatar"])
      .then(booking => {
        if (!booking) {
          errors.nobooking = "There is no booking for this user!";
          return res.status(404).json(errors);
        }
        res.json(booking);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route GET api/bookings
// @desc get bookings filter by Departure Date and customer
// @access Private
router.post(
  "/by-customer-dep/:pid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const ardate = req.body.dt_from; //"Sun Jul 02 2018 00:00:00";
    const dpdate = req.body.dt_to; //"Thu Jul 19 2018 23:59:59";

    Bookings.find({
      user: req.params.pid,
      dep_date: { $gte: ardate, $lte: dpdate }
    })
      .sort({ dep_date: 1 })
      .populate("user", ["name", "avatar"])
      .then(booking => {
        if (!booking) {
          errors.nobooking = "There is no booking for this user!";
          return res.status(404).json(errors);
        }
        res.json(booking);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route GET api/booking by ID
// @desc get current users booking
// @access Private

router.get("/:id", (req, res) => {
  Bookings.findById(req.params.id)
    .sort({ arr_date: -1 })
    .then(booking => res.json(booking))
    .catch(err => res.status(404).json({ nobookingfound: "No booking found" }));
});

// @route PSOT api/booking/
// @desc Create or edit users booking
// @access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBookingsInput(req.body);

    // check validation
    if (!isValid) {
      // return any errors with 400 status
      return res.status(400).json(errors);
    }

    // get fields

    const bookingFields = {};
    bookingFields.user = req.user.id;
    if (req.body.guest_name) bookingFields.guest_name = req.body.guest_name;
    if (req.body.hotel_name) bookingFields.hotel_name = req.body.hotel_name;
    if (req.body.arr_date) bookingFields.arr_date = req.body.arr_date;
    if (req.body.dep_date) bookingFields.dep_date = req.body.dep_date;
    if (req.body.arr_flight) bookingFields.arr_flight = req.body.arr_flight;
    if (req.body.dep_flight) bookingFields.dep_flight = req.body.dep_flight;
    if (req.body.arr_trfby) bookingFields.arr_trfby = req.body.arr_trfby;
    if (req.body.dep_trfby) bookingFields.dep_trfby = req.body.dep_trfby;
    if (req.body.adults) bookingFields.adults = req.body.adults;
    if (req.body.childs) bookingFields.childs = req.body.childs;
    if (req.body.infants) bookingFields.infants = req.body.infants;
    if (req.body.booking_status)
      bookingFields.booking_status = req.body.booking_status;
    if (req.body.ispayment_received)
      bookingFields.ispayment_received = req.body.ispayment_received;
    if (req.body.ishotel_paid)
      bookingFields.ishotel_paid = req.body.ishotel_paid;
    if (req.body.meal_plan) bookingFields.meal_plan = req.body.meal_plan;
    if (req.body.booking_remarks)
      bookingFields.booking_remarks = req.body.booking_remarks;
    new Bookings(bookingFields).save().then(bookings => res.json({ bookings }));
    //res.json({ bookingFields });
  }
);

// @route DELETE api/booking/
// @desc  booking
// @access Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Bookings.findOneAndRemove({ _id: req.params.id }).then(() => {
      res.json({ success: true });
    });
  }
);

// @route PSOT api/booking/edit
// @desc Create or edit users booking
// @access Private

router.post(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBookingsInput(req.body);

    // check validation
    if (!isValid) {
      // return any errors with 400 status
      return res.status(400).json(errors);
    }

    // get fields

    const bookingFields = {};
    bookingFields.user = req.user.id;
    if (req.body.guest_name) bookingFields.guest_name = req.body.guest_name;
    if (req.body.hotel_name) bookingFields.hotel_name = req.body.hotel_name;
    if (req.body.arr_date) bookingFields.arr_date = req.body.arr_date;
    if (req.body.dep_date) bookingFields.dep_date = req.body.dep_date;
    if (req.body.arr_flight) bookingFields.arr_flight = req.body.arr_flight;
    if (req.body.dep_flight) bookingFields.dep_flight = req.body.dep_flight;
    if (req.body.arr_trfby) bookingFields.arr_trfby = req.body.arr_trfby;
    if (req.body.dep_trfby) bookingFields.dep_trfby = req.body.dep_trfby;
    if (req.body.adults) bookingFields.adults = req.body.adults;
    if (req.body.childs) bookingFields.childs = req.body.childs;
    if (req.body.infants) bookingFields.infants = req.body.infants;
    if (req.body.booking_status)
      bookingFields.booking_status = req.body.booking_status;
    if (req.body.ispayment_received)
      bookingFields.ispayment_received = req.body.ispayment_received;
    if (req.body.ishotel_paid)
      bookingFields.ishotel_paid = req.body.ishotel_paid;
    if (req.body.meal_plan) bookingFields.meal_plan = req.body.meal_plan;
    if (req.body.booking_remarks)
      bookingFields.booking_remarks = req.body.booking_remarks;

    Bookings.findOne({ _id: req.params.id }).then(booking => {
      if (booking) {
        //update
        Bookings.findOneAndUpdate(
          { _id: req.params.id },
          { $set: bookingFields },
          { new: true }
        ).then(booking => res.json(booking));
      }
    });
  }
);

module.exports = router;
