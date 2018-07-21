import React, { Component } from "react";
import moment from "moment";

class DepartureList extends Component {
  render() {
    let depbooking;
    if (this.props.depbookings.length > 0) {
      depbooking = this.props.depbookings.map(bkn => (
        <li key={bkn._id} className="list-group-item">
          Dep.Date : {moment(bkn.dep_date).format("DD/MMM/YYYY")} | Name :{" "}
          {bkn.guest_name} | Hotel : {bkn.hotel_name} | Dep.Flight :{" "}
          {bkn.dep_flight} | Dep.Transfer.By : {bkn.dep_trfby} | Adults :{" "}
          {bkn.adults} | Childs : {bkn.childs} | Infants : {bkn.infants} |
          Remarks :
          {bkn.booking_remarks}
        </li>
      ));
    } else {
      depbooking = (
        <li className="list-group-item text-center">No Departures </li>
      );
    }

    return (
      <div>
        <div className="card bg-light mb-3">
          <div className="card-header">Departure List</div>
          <div className="card-body">
            <ul className="list-group">{depbooking}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default DepartureList;
