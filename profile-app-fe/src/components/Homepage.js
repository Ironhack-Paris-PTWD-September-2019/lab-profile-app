import React from "react";
import { Link } from "react-router-dom";

class Homepage extends React.Component {
  render() {
    return (
      <div className="main-container">
        <div className="left">
          <div className="text">
            <h1>IronProfile</h1>
            <p>
              Today we will create an app with authorization, adding some cool
              styles !
            </p>
          </div>

          <div className="home-controls">
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
            <Link to="/login">
              <button>Log In</button>
            </Link>
          </div>
        </div>
        <div className="right"></div>
      </div>
    );
  }
}

export default Homepage;
