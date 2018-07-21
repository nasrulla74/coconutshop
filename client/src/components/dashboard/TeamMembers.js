import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteBooking } from "../../actions/bookingActions";

//import { deleteTeamMember } from "../../actions/bookingActions";

class TeamMembers extends Component {
  onDeleteClick(id) {
    alert("to be implemented");
    //this.props.deleteTeamMember(id, this.props.history);
  }

  render() {
    const team_members = this.props.auth.team_members;

    let teamD;
    if (team_members) {
      teamD = team_members.map(usr => (
        <tr key={usr._id}>
          <td>{usr.name}</td>
          <td>{usr.email}</td>
          <td>{usr.usertype}</td>
          <td>
            <button
              onClick={this.onDeleteClick.bind(this, usr._id)}
              className="btn btn-danger mr-1"
            >
              <i className="fa fa-times" />
            </button>
          </td>
        </tr>
      ));
    }

    return (
      <div>
        <div className="card bg-light mb-3">
          <div className="card-header">Team Members</div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Member Name</th>
                  <th>Member Email</th>
                  <th>Member Type</th>
                  <th>Actions</th>
                  <th />
                </tr>
                {teamD}
              </thead>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
TeamMembers.propTypes = {
  deleteBooking: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteBooking }
)(withRouter(TeamMembers));
