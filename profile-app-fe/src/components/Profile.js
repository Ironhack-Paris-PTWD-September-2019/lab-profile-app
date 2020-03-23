import React from "react";
import { Link } from "react-router-dom";
import AuthServices from "./auth/auth-service";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.service = new AuthServices();
  }

  logOut = () => {
    this.service.logout().then(response => {
      this.props.getUser(null);
      this.props.history.push("/");
    });
  };
  render() {
    return !this.props.loggedInUser ? (
      <div className="main-container signup">
        <div className="left signup-form">Loading ...</div>
      </div>
    ) : (
      <div className="main-container signup">
        <div className="left signup-form">
          <h1>Profile</h1>
          <div className="form">
            <div className="form-input">
              <h4>Username</h4>
              <h3>{this.props.loggedInUser.username}</h3>
            </div>
            <div className="form-input">
              <h4>Campus</h4>
              <h3>{this.props.loggedInUser.campus}</h3>
            </div>
            <div className="form-input">
              <h4>Course</h4>
              <h3>{this.props.loggedInUser.course}</h3>
            </div>

            <p
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: "90%",
                textAlign: "center"
              }}
              onClick={this.logOut}
              style={{
                color: "red",
                fontSize: "14px",
                fontWeight: "600",
                textDecoration: "none",
                cursor: "pointer"
              }}
              to="/logout"
            >
              Logout
            </p>
          </div>
        </div>
        <div className="right">
          <div className="avatar">
            <img src={this.props.loggedInUser.image || "/default-avatar.jpg"} />
            <Link to="/edit">
              <button>Edit</button>
            </Link>
          </div>

          <div className="create-account">
            <p>The user is able to edit photo using nodeJS and multer</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
