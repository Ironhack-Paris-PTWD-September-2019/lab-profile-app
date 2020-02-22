import React from "react";

class Profile extends React.Component {
  render() {
    return !this.props.loggedInUser ? (
      <div>Loading ...</div>
    ) : (
      <div>Hello {this.props.loggedInUser.username}</div>
    );
  }
}

export default Profile;
