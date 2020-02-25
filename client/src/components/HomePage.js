import React, { Component } from "react";
import { Link } from "react-router-dom";


class HomePage extends Component {
    render() {
      return (
        <div className="Homepage">
            <div className="Homepage">
            <h1>IronProfile</h1>
            <p>Today we will create an app with authoritation, adding some cool styles!</p>
            </div>
            <div className="HP">
              <Link to="/signup" className="Signup">
              <button className="button" type="button">Sign up</button>
              </Link>
            </div>
            <div className="HP">
              <Link to="/login" className="Login">
              <button className="button" type="button">Log in</button>
              </Link>
            </div>           
        </div>
);
}
}

export default HomePage;