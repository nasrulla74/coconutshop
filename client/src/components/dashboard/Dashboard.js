import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import {
  getBookings,
  getBookingsByCustomer
} from "../../actions/bookingActions";
import Spinner from "../common/spinner";
import BookingActions from "./BookingActions";
import BookingDetails from "./BookingDetails";
import DatePicker from "react-datepicker";
import moment from "moment";
import TeamMembers from "./TeamMembers";
import { getTeamMembers } from "../../actions/authActions";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dt_from: moment(),
      dt_to: moment()
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleFromDateChange = this.handleFromDateChange.bind(this);
    this.handleToDateChange = this.handleToDateChange.bind(this);
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
    this.props.getTeamMembers(this.props.auth.user.id);
  }
  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  handleFromDateChange(date) {
    this.setState({
      dt_from: date
    });
  }

  handleToDateChange(date) {
    this.setState({
      dt_to: date
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const fDate1 = new Date(this.state.dt_from);
    moment(fDate1.setHours(0));
    moment(fDate1.setMinutes(0));
    moment(fDate1.setSeconds(0));
    moment(fDate1.setMilliseconds(0));

    const fDate2 = new Date(this.state.dt_to);
    moment(fDate2.setHours(23));
    moment(fDate2.setMinutes(59));
    moment(fDate2.setSeconds(59));

    const sData = {
      dt_from: moment(fDate1),

      dt_to: moment(fDate2)
    };

    this.props.getBookingsByCustomer(this.props.auth.user.id, sData);
  }
  render() {
    const { user, team_members } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { bookings } = this.props.booking;

    let dashboardContent;
    let bookingContent;
    let teamContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <span className="text-muted">
              ADMIN - Dashboard /
              <Link to={`/profile/${profile.handle}`}> {user.name}</Link>
            </span>
            <BookingActions />
          </div>
        );

        if (bookings) {
          bookingContent = (
            <div>
              <BookingDetails bookings={bookings} />
            </div>
          );
        }

        if (team_members) {
          teamContent = (
            <div>
              <TeamMembers team_members={team_members} />
            </div>
          );
        }
      } else {
        //user is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="text-muted">DASHBOARD {user.name}</p>
            <p>you have not yet setup profile, please add some info </p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="card bg-light mb-3">
          <div className="card-header bg-white">
            <div className="row">
              <div className="col-12 col-md-6">{dashboardContent}</div>
              <div className="col-12 col-md-6">
                <form className="form-inline" onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="form-group">
                      <span>Date From / To :</span>
                    </div>

                    <div className="form-group mt-3">
                      <DatePicker
                        dateFormat="DD/MM/YYYY"
                        selected={this.state.dt_from}
                        onChange={this.handleFromDateChange}
                      />
                    </div>

                    <div className="form-group mt-3">
                      <DatePicker
                        dateFormat="DD/MM/YYYY"
                        selected={this.state.dt_to}
                        onChange={this.handleToDateChange}
                      />
                    </div>
                    <div className="form-group">
                      <div align="center">
                        <input
                          type="submit"
                          value="Filter"
                          className="btn btn-primary btn-sm"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">{bookingContent}</div>
        </div>
        <div className="row">
          <div className="col-md-12">{teamContent}</div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getTeamMembers: PropTypes.func.isRequired,
  getBookingsByCustomer: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getBookings: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
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
    deleteAccount,
    getBookings,
    getBookingsByCustomer,
    getTeamMembers
  }
)(Dashboard);
