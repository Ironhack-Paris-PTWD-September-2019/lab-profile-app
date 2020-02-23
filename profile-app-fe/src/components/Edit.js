import React from "react";
import AuthServices from "./auth/auth-service";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.loggedInUser.username || "",
      campus: this.props.loggedInUser.campus || "",
      course: this.props.loggedInUser.course || ""
    };
    this.service = new AuthServices();
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submitForm = () => {
    console.log("submitForm");
    const { username, campus, course } = this.state;
    this.service
      .edit(username, campus, course)
      .then(response => {
        console.log(response);
        this.props.getUser(response);
        this.props.history.push("/profile");
      })
      .catch(error => console.log(error));
  };

  render() {
    return !this.props.loggedInUser ? (
      <div className="main-container signup">
        <div className="left signup-form">Loading ...</div>
      </div>
    ) : (
      <div className="main-container signup">
        <div className="left signup-form">
          <h1>Edit Profile</h1>
          <div className="form">
            <div className="form-input">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={e => this.handleChange(e)}
              />
            </div>

            <div className="form-input">
              <label>Campus</label>
              <select
                name="campus"
                value={this.state.campus}
                onChange={e => this.handleChange(e)}
              >
                <option value=""></option>
                <option value="Madrid">Madrid</option>
                <option value="Barcelona">Barcelona</option>
                <option value="Miami">Miami</option>
                <option value="Paris">Paris</option>
                <option value="Berlin">Berlin</option>
                <option value="Amsterdam">Amsterdam</option>
                <option value="México">México</option>
                <option value="Sao Paulo">Sao Paulo</option>
              </select>
            </div>

            <div className="form-input">
              <label>Course</label>
              <select
                name="course"
                value={this.state.course}
                onChange={e => this.handleChange(e)}
              >
                <option value=""></option>
                <option value="WebDev">WebDev</option>
                <option value="UX/UI">UX/UI</option>
                <option value="Data Analytics">Data Analytics</option>
              </select>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="avatar">
            <img src={this.props.loggedInUser.image || "/default-avatar.jpg"} />

            <button onClick={this.submitForm}>Submit Changes</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
