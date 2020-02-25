import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AuthServices from "./components/auth/auth-service";
import "./App.css";

import Homepage from "./components/Homepage";
import Profile from "./components/Profile";
import Edit from "./components/Edit";
import ErrorBoundary from "./components/ErrorBoundary";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthServices();
  }

  getUser = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then(response => {
          this.setState({ loggedInUser: response });
        })
        .catch(err => {
          this.setState({ loggedInUser: false });
        });
    }
  };

  render() {
    return (
      <div className="App">
        <ErrorBoundary>
          <Switch>
            <Route
              exact
              path="/"
              render={props =>
                this.state.loggedInUser ? (
                  <Profile
                    loggedInUser={this.state.loggedInUser}
                    getUser={this.getUser}
                    {...props}
                  />
                ) : (
                  <Homepage />
                )
              }
            />
            <Route
              exact
              path="/login"
              render={props => <Login getUser={this.getUser} {...props} />}
            />{" "}
            <Route
              exact
              path="/signup"
              render={props => <Signup getUser={this.getUser} {...props} />}
            />
            <Route
              exact
              path="/profile"
              render={props => (
                <Profile
                  loggedInUser={this.state.loggedInUser}
                  getUser={this.getUser}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/edit"
              render={props => (
                <Edit
                  loggedInUser={this.state.loggedInUser}
                  getUser={this.getUser}
                  fetchUser={this.fetchUser}
                  {...props}
                />
              )}
            />
          </Switch>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
