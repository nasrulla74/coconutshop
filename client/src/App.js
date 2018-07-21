import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/common/privateRout";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import CreateBooking from "./components/booking/CreateBooking";
import EditBooking from "./components/booking/EditBooking";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import NotFound from "./components/not-found/NotFound";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import RegisterMember from "./components/auth/RegisterMember";
/* import Register from "./components/auth/Register";
 */
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import MemberDashboard from "./components/dashboard/MemberDashboard";
import RegisterAdminUser from "./components/auth/RegisterAdminUser";

import { clearCurrentProfile } from "./actions/profileActions";
import "./App.css";
//check for token
if (localStorage.jwtToken) {
  //set auth token header auth

  setAuthToken(localStorage.jwtToken);
  // decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // check for expired token

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //log out user
    store.dispatch(logoutUser());

    store.dispatch(clearCurrentProfile());
    // redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              {/* <Route exact path="/register" component={Register} />
 */}
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/register-admin-user"
                  component={RegisterAdminUser}
                />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/memberdashboard"
                  component={MemberDashboard}
                />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/profiles" component={Profiles} />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/profile/:handle"
                  component={Profile}
                />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/register-member"
                  component={RegisterMember}
                />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/create-booking"
                  component={CreateBooking}
                />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-booking/:id"
                  component={EditBooking}
                />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
