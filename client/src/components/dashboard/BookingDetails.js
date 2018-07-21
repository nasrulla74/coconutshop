import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteBooking } from "../../actions/bookingActions";

class BookingDetails extends Component {
  onDeleteClick(id) {
    this.props.deleteBooking(id, this.props.history);
  }

  onEditClick(id) {
    this.props.history.push("/edit-booking/" + id);
  }

  render() {
    const bookingD = this.props.bookings.map(bkn => (
      <tr key={bkn._id}>
        <td>{bkn.guest_name}</td>
        <td>{bkn.hotel_name}</td>
        <td>
          <Moment format="DD/MM/YYYY">{bkn.arr_date}</Moment> -
          {bkn.dep_date === null ? (
            " To Date"
          ) : (
            <Moment format="DD/MM/YYYY">{bkn.dep_date}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onEditClick.bind(this, bkn._id)}
            className="btn btn-primary mr-1"
          >
            <i className="fa fa-edit" />
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <div className="card bg-light mb-3">
          <div className="card-header">Booking Details</div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Guest Name</th>
                  <th>Hotel/Reosort</th>
                  <th>Arr/Dep Date</th>
                  <th>Actions</th>
                  <th />
                </tr>
                {bookingD}
              </thead>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

BookingDetails.propTypes = {
  deleteBooking: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteBooking }
)(withRouter(BookingDetails));
