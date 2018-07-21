import React, { Component } from "react";
import moment from "moment";

class ArrivalList extends Component {
  render() {
    let bookingD;

    if (this.props.bookings.length > 0) {
      bookingD = this.props.bookings.map(bkn => (
        <li key={bkn._id} className="list-group-item">
          Arr.Date : {moment(bkn.arr_date).format("DD/MMM/YYYY")} | Name :{" "}
          {bkn.guest_name} | Hotel : {bkn.hotel_name} | Arr.Flight :{" "}
          {bkn.arr_flight} | Arr.Transfer.By : {bkn.arr_trfby} | Adults :{" "}
          {bkn.adults} | Childs : {bkn.childs} | Infants : {bkn.infants} |
          Remarks :
          {bkn.booking_remarks}
        </li>
      ));
    } else {
      bookingD = <li className="list-group-item text-center">No Arrivals </li>;
    }

    return (
      <div>
        <div className="card bg-light mb-3">
          <div className="card-header">Arrival List</div>
          <div className="card-body">
            <ul className="list-group">{bookingD}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ArrivalList;
