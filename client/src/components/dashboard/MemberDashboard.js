import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import {
  getBookingsByCustomerDep,
  getBookingsByCustomer
} from "../../actions/bookingActions";
import Spinner from "../common/spinner";
import ArrivalList from "./ArrivalList";
import DepartureList from "./DepartureList";
import moment from "moment";
import { getTeamMembers } from "../../actions/authActions";

class MemberDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dt_from: moment(),
      dt_to: moment()
    };
    this.onClickToday = this.onClickToday.bind(this);
    this.onClickTomorrow = this.onClickTomorrow.bind(this);
  }

  componentDidMount() {
    const fDate1 = new Date();
    moment(fDate1.setHours(0));
    moment(fDate1.setMinutes(0));
    moment(fDate1.setSeconds(0));
    moment(fDate1.setMilliseconds(0));

    const fDate2 = new Date();
    moment(fDate2.setHours(23));
    moment(fDate2.setMinutes(59));
    moment(fDate2.setSeconds(59));

    const sData = {
      dt_from: moment(fDate1),

      dt_to: moment(fDate2)
    };

    this.props.getCurrentProfile();
    this.props.getBookingsByCustomer(this.props.auth.user.id, sData);
    this.props.getBookingsByCustomerDep(this.props.auth.user.id, sData);
  }

  onClickToday() {
    const fDate1 = new Date();
    moment(fDate1.setHours(0));
    moment(fDate1.setMinutes(0));
    moment(fDate1.setSeconds(0));
    moment(fDate1.setMilliseconds(0));

    const fDate2 = new Date();
    moment(fDate2.setHours(23));
    moment(fDate2.setMinutes(59));
    moment(fDate2.setSeconds(59));

    const sData = {
      dt_from: moment(fDate1),

      dt_to: moment(fDate2)
    };

    this.props.getBookingsByCustomer(this.props.auth.user.id, sData);
    this.props.getBookingsByCustomerDep(this.props.auth.user.id, sData);
  }

  onClickTomorrow() {
    const fDate1 = moment(new Date());
    fDate1.add(1, "days");
    moment(fDate1._d.setHours(0));
    moment(fDate1._d.setMinutes(0));
    moment(fDate1._d.setSeconds(0));
    moment(fDate1._d.setMilliseconds(0));

    const fDate2 = moment(new Date());

    fDate2.add(1, "days");
    moment(fDate2._d.setHours(23));
    moment(fDate2._d.setMinutes(59));
    moment(fDate2._d.setSeconds(59));

    const sData = {
      dt_from: moment(fDate1._d),

      dt_to: moment(fDate2._d)
    };

    this.props.getBookingsByCustomer(this.props.auth.user.id, sData);
    this.props.getBookingsByCustomerDep(this.props.auth.user.id, sData);
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { bookings, depbookings } = this.props.booking;

    let dashboardContent;
    let bookingContent;
    let depbookingContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <span className="text-muted">
              TEAM MEMBER - Dashboard /
              <Link to={`/profile/${profile.handle}`}> {user.name}</Link>
            </span>
            <div className="row">
              <div className="col-sm">
                <span className="text-muted text-center">
                  Today : {moment().format("DD/MM/YYYY")}
                </span>
              </div>
            </div>
          </div>
        );

        if (bookings) {
          bookingContent = (
            <div>
              <ArrivalList bookings={bookings} />
            </div>
          );
        }

        if (depbookings) {
          depbookingContent = (
            <div>
              <DepartureList depbookings={depbookings} />
            </div>
          );
        }
      } else {
        //user is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="text-muted">DASHBOARD {user.name}</p>
            <Link to="/login" className="btn btn-lg btn-info">
              Login
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="card bg-light mb-3">
          <div className="card-header bg-white">
            <div className="row justify-content-center">
              <div className="col-12 text-center">{dashboardContent}</div>
            </div>

            <div className="row justify-content-center">
              <div className="col-12">
                <div className="text-center">
                  <button
                    className="btn btn-info btn-sm mr-2 mb-2"
                    onClick={this.onClickToday}
                  >
                    Today Arrivals / Departures
                  </button>
                  <button
                    className="btn btn-info btn-sm mr-2 mb-2"
                    onClick={this.onClickTomorrow}
                  >
                    Tomorrow Arrivals / Departures
                  </button>
                </div>
              </div>
              <div className="text-center" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">{bookingContent}</div>
        </div>
        <div className="row">
          <div className="col-md-12">{depbookingContent}</div>
        </div>
      </div>
    );
  }
}

MemberDashboard.propTypes = {
  getBookingsByCustomer: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getBookingsByCustomerDep: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  booking: state.booking,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    getBookingsByCustomerDep,
    getBookingsByCustomer,
    getTeamMembers
  }
)(MemberDashboard);
