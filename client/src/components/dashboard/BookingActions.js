import React from "react";
import { Link } from "react-router-dom";

export const BookingActions = () => {
  return (
    <div>
      <div className="btn-group mb-2 mr-2 mt-2" role="group">
        <Link to="/create-booking" className="btn btn-primary btn-sm">
          <i className="fas fa-plus-square text-light mr-1" />
          Add Booking
        </Link>
      </div>
      <div className="btn-group mb-2 mr-2 mt-2" role="group">
        <Link to="/register-admin-user" className="btn btn-primary btn-sm">
          <i className="fas fa-plus-square text-light mr-1" />
          Add Customer
        </Link>
      </div>
      <div className="btn-group mb-2 mr-2 mt-2" role="group">
        <Link to="/register-member" className="btn btn-primary btn-sm">
          <i className="fas fa-plus-square text-light mr-1" />
          Add Member
        </Link>
      </div>

      <div className="btn-group mb-2 mr-2 mt-2" role="group">
        <Link to="/memberdashboard" className="btn btn-primary btn-sm">
          <i className="fas fa-plus-square text-light mr-1" />
          View Arrivals/Departures
        </Link>
      </div>
    </div>
  );
};

export default BookingActions;
