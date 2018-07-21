import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/textFieldGroup";
import TextAreaFieldGroup from "../common/textAreaFieldGroup";
import SelectListGroup from "../common/selectListGroup";
import {
  editBooking,
  getBookingById,
  deleteBooking
} from "../../actions/bookingActions";
import isLoggedIn from "../../utils/isLoggedIn";
import DatePicker from "react-datepicker";
import moment from "moment";
import isEmpty from "../../validation/is-Empty";
import "react-datepicker/dist/react-datepicker.css";

class EditBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bk_id: "",
      guest_name: "",
      hotel_name: "",
      arr_date: moment(),
      dep_date: moment(),
      arr_flight: "",
      dep_flight: "",
      arr_trfby: "",
      dep_trfby: "",
      adults: "1",
      childs: "0",
      infants: "0",
      booking_status: "Pending",
      ispayment_received: "Not Received",
      ishotel_paid: "Not Paid",
      meal_plan: "Bed & Breakfast",
      booking_remarks: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleArrDateChange = this.handleArrDateChange.bind(this);
    this.handleDepDateChange = this.handleDepDateChange.bind(this);
  }

  componentDidMount() {
    //console.log(this.props.match.params.id);
    this.props.getBookingById(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    //console.log(this.props);
    if (nextProps.m_bookings.booking) {
      const booking = nextProps.m_bookings.booking;

      booking.guest_name = !isEmpty(booking.guest_name)
        ? booking.guest_name
        : "";
      booking.hotel_name = !isEmpty(booking.hotel_name)
        ? booking.hotel_name
        : "";

      booking.arr_flight = !isEmpty(booking.arr_flight)
        ? booking.arr_flight
        : "";
      booking.dep_flight = !isEmpty(booking.dep_flight)
        ? booking.dep_flight
        : "";
      booking.arr_trfby = !isEmpty(booking.arr_trfby) ? booking.arr_trfby : "";
      booking.dep_trfby = !isEmpty(booking.dep_trfby) ? booking.dep_trfby : "";
      booking.adults = !isEmpty(booking.adults) ? booking.adults : "1";
      booking.childs = !isEmpty(booking.childs) ? booking.childs : "";
      booking.infants = !isEmpty(booking.infants) ? booking.infants : "";
      booking.meal_plan = !isEmpty(booking.meal_plan) ? booking.meal_plan : "";
      booking.booking_remarks = !isEmpty(booking.booking_remarks)
        ? booking.booking_remarks
        : "";

      // Set component fields state
      this.setState({
        guest_name: booking.guest_name,
        hotel_name: booking.hotel_name,
        arr_date: moment(booking.arr_date),
        dep_date: moment(booking.dep_date),
        arr_flight: booking.arr_flight,
        dep_flight: booking.dep_flight,
        arr_trfby: booking.arr_trfby,
        dep_trfby: booking.dep_trfby,
        adults: booking.adults,
        childs: booking.childs,
        infants: booking.infants,
        booking_status: booking.booking_status,
        ispayment_received: booking.ispayment_received,
        ishotel_paid: booking.ishotel_paid,
        meal_plan: booking.meal_plan,
        booking_remarks: booking.booking_remarks,
        bk_id: booking._id
      });
    }
  }

  handleArrDateChange(date) {
    this.setState({
      arr_date: date
    });
  }

  handleDepDateChange(date) {
    this.setState({
      dep_date: date
    });
  }

  deleteClick(id) {
    this.props.deleteBooking(id, this.props.history);
  }

  onSubmit(e) {
    e.preventDefault();
    if (isLoggedIn) {
      const bookingData = {
        guest_name: this.state.guest_name,
        hotel_name: this.state.hotel_name,
        arr_date: this.state.arr_date,
        dep_date: this.state.dep_date,
        arr_flight: this.state.arr_flight,
        dep_flight: this.state.dep_flight,
        arr_trfby: this.state.arr_trfby,
        dep_trfby: this.state.dep_trfby,
        adults: this.state.adults,
        childs: this.state.childs,
        infants: this.state.infants,
        booking_status: this.state.booking_status,
        ispayment_received: this.state.ispayment_received,
        ishotel_paid: this.state.ishotel_paid,
        meal_plan: this.state.meal_plan,
        booking_remarks: this.state.booking_remarks
      };
      console.log(this.props.match.params.id);

      this.props.editBooking(
        bookingData,
        this.props.match.params.id,
        this.props.history
      );
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    const options_booking_status = [
      { label: "Pending", value: "Pending" },
      { label: "Confirmed", value: "Confirmed" }
    ];

    const options_ispayment_received = [
      { label: "Not Received", value: "Not Received" },
      { label: "Received", value: "Received" }
    ];

    const options_ishotel_paid = [
      { label: "Not Paid", value: "Not Paid" },
      { label: "Paid", value: "Paid" }
    ];

    const options_meal_plan = [
      { label: "Room Only", value: "Room Only" },
      { label: "Bed & Breakfast", value: "Bed & Breakfast" },
      { label: "Half Board", value: "Half Board" },
      { label: "Full Board", value: "Full Board" },
      { label: "All Inclusive", value: "All Inclusive" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <div className="card bg-light mb-3">
                <div className="card-header">Edit Booking</div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                      placeholder="* Guest Name"
                      name="guest_name"
                      value={this.state.guest_name}
                      onChange={this.onChange}
                      error={errors.guest_name}
                      info="* Guest Name"
                    />

                    <TextFieldGroup
                      placeholder="* Hotel/Resort Name"
                      name="hotel_name"
                      value={this.state.hotel_name}
                      onChange={this.onChange}
                      error={errors.hotel_name}
                      info="* Hotel/Resort Name"
                    />

                    <div className="row">
                      <div className="col-3 form-text text-muted">
                        Arrival Date
                      </div>
                      <div className="col-9">
                        <DatePicker
                          dateFormat="DD/MM/YYYY"
                          selected={this.state.arr_date}
                          onChange={this.handleArrDateChange}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-3 form-text text-muted">
                        Departure Date
                      </div>
                      <div className="col-9">
                        <DatePicker
                          dateFormat="DD/MM/YYYY"
                          selected={this.state.dep_date}
                          onChange={this.handleDepDateChange}
                        />
                      </div>
                    </div>

                    <SelectListGroup
                      placeholder="Meal Plan"
                      name="meal_plan"
                      value={this.state.meal_plan}
                      onChange={this.onChange}
                      options={options_meal_plan}
                      error={errors.meal_plan}
                      info="Meal Plan"
                    />

                    <TextFieldGroup
                      placeholder="Adults"
                      name="adults"
                      value={this.state.adults}
                      onChange={this.onChange}
                      error={errors.adults}
                      info="# Adults"
                    />

                    <TextFieldGroup
                      placeholder="Childs"
                      name="childs"
                      value={this.state.childs}
                      onChange={this.onChange}
                      error={errors.childs}
                      info="# Childs"
                    />

                    <TextFieldGroup
                      placeholder="Infants"
                      name="infants"
                      value={this.state.infants}
                      onChange={this.onChange}
                      error={errors.infants}
                      info="# Infants"
                    />

                    <TextFieldGroup
                      placeholder="Arrival Flight"
                      name="arr_flight"
                      value={this.state.arr_flight}
                      onChange={this.onChange}
                      error={errors.arr_flight}
                      info="Arrival Flight"
                    />

                    <TextFieldGroup
                      placeholder="Departure Flight"
                      name="dep_flight"
                      value={this.state.dep_flight}
                      onChange={this.onChange}
                      error={errors.dep_flight}
                      info="Departre Flight"
                    />

                    <TextFieldGroup
                      placeholder="Arrival Transfer By"
                      name="arr_trfby"
                      value={this.state.arr_trfby}
                      onChange={this.onChange}
                      error={errors.arr_trfby}
                      info="Arrival Transfer By"
                    />

                    <TextFieldGroup
                      placeholder="Departure Transfer By"
                      name="dep_trfby"
                      value={this.state.dep_trfby}
                      onChange={this.onChange}
                      error={errors.dep_trfby}
                      info="Departure Transfer By"
                    />

                    <TextAreaFieldGroup
                      placeholder="Booking Remarks"
                      name="booking_remarks"
                      value={this.state.booking_remarks}
                      onChange={this.onChange}
                      error={errors.booking_remarks}
                    />

                    <SelectListGroup
                      placeholder="Booking Status"
                      name="booking_status"
                      value={this.state.booking_status}
                      onChange={this.onChange}
                      options={options_booking_status}
                      error={errors.booking_status}
                      info="Booking Status"
                    />

                    <SelectListGroup
                      placeholder="Is Payment Received"
                      name="ispayment_received"
                      value={this.state.ispayment_received}
                      onChange={this.onChange}
                      options={options_ispayment_received}
                      error={errors.ispayment_received}
                      info="Is Payment Received"
                    />

                    <SelectListGroup
                      placeholder="Is Hotel Paid"
                      name="ishotel_paid"
                      value={this.state.ishotel_paid}
                      onChange={this.onChange}
                      options={options_ishotel_paid}
                      error={errors.ishotel_paid}
                      info="Is Hotel Paid"
                    />

                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-primary btn-block mt-4"
                    />
                    <button
                      onClick={this.deleteClick.bind(this, this.state.bk_id)}
                      type="button"
                      className="btn btn-block btn-danger mt-1"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditBooking.propTypes = {
  deleteBooking: PropTypes.func.isRequired,
  editBooking: PropTypes.func.isRequired,
  getBookingById: PropTypes.func.isRequired,
  m_bookings: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  m_bookings: state.booking,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editBooking, getBookingById, deleteBooking }
)(withRouter(EditBooking));
