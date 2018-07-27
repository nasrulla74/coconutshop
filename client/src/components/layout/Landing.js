import React, { Component } from "react";

import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import topImg from "../../img/top-airport.jpg";
import servicesImg from "../../img/services.jpg";
import toursImg from "../../img/tours.jpg";
import languages from "../../img/languages.jpg";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      // this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="card mb-3">
                  <img
                    className="card-img-top"
                    src={topImg}
                    alt="customer service"
                  />
                  <div className="card-body">
                    <h3 className="card-title">
                      Welcome to Coconut Guest Service at Velana International
                      Airport
                    </h3>
                    <p className="card-text">
                      We provide guest services at Velana International Airport
                      for hotels, guest houses and safari boats. We have Airport
                      Representatives with years of experience in handling
                      customers from different nationalities to multi
                      destinations around Maldives.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-4">
                <div className="card card-height mb-3">
                  <img
                    className="card-img-top"
                    src={servicesImg}
                    alt="customer service"
                  />
                  <div className="card-body">
                    <h3 className="card-title text-center text-light bg-primary">
                      Our Services
                    </h3>
                    <ul className="card-text list-group">
                      <li className="list-group-item">
                        Welcoming the guest from airport and assisting until
                        departure to your resort
                      </li>

                      <li className="list-group-item">
                        Baggage Handling and baggage issues
                      </li>
                      <li className="list-group-item">
                        Tour Guiding / Excursions (Male’, Hulhumale, Villimale)
                      </li>
                      <li className="list-group-item">
                        Receiving the guests from airport for departure and
                        bidding farewell back to the guest’s country
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="card card-height mb-3">
                  <img
                    className="card-img-top"
                    src={toursImg}
                    alt="customer service"
                  />
                  <div className="card-body">
                    <h3 className="card-title text-center text-light bg-primary">
                      Guided Tours
                    </h3>

                    <ul className="card-text list-group text-center">
                      <li className="list-group-item">
                        Guided tour of Male’, guide through shopping, and cater
                        to other services that your guest may require. In
                        providing the tour we will be taking the guest to see
                        main landmarks, historical places in Male, provide with
                        genuine information about the visited sites, show-off
                        some of our beautiful and interesting places.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="card card-height mb-3">
                  <img
                    className="card-img-top"
                    src={languages}
                    alt="customer service"
                  />
                  <div className="card-body">
                    <h3 className="card-title text-center text-light bg-primary">
                      Spoken Languages
                    </h3>
                    <ul className="list-group">
                      <li className="list-group-item">
                        <i className="flag-icon flag-icon-gb" />
                        <span className="pl-3">English</span>
                      </li>
                      <li className="list-group-item">
                        <i className="flag-icon flag-icon-it" />
                        <span className="pl-3">Italian</span>
                      </li>
                      <li className="list-group-item">
                        <i className="flag-icon flag-icon-fr" />
                        <span className="pl-3">French</span>
                      </li>
                      <li className="list-group-item">
                        <i className="flag-icon flag-icon-de" />
                        <span className="pl-3">German</span>
                      </li>
                      <li className="list-group-item">
                        <i className="flag-icon flag-icon-jp" />
                        <span className="pl-3">Japanese</span>
                      </li>
                      <li className="list-group-item">
                        <i className="flag-icon flag-icon-ru" />
                        <span className="pl-3">Russian</span>
                      </li>
                      <li className="list-group-item">
                        <i className="flag-icon flag-icon-ch" />
                        <span className="pl-3">Chinese</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card bg-light mb-3 text-center">
                  <div className="card-header">
                    <h3>Effordable Packages and Prompt Service!!</h3>
                  </div>
                  <div className="card-body">
                    <ul className="list-group">
                      <li className="list-group-item">
                        Start with us today as your guest host at Velana
                        International Airport with effordable packages and
                        prompt services.
                      </li>
                      <li className="list-group-item">
                        Contact us for more information!!.{" "}
                        <h3>+(960) 777 2081 | +(960) 980 9097</h3>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Landing);
