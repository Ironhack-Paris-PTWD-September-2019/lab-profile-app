import React from "react";
import AuthServices from "./auth-service";
import { Link } from "react-router-dom";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      campus: "",
      course: ""
    };
    this.service = new AuthServices();
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submitForm = () => {
    console.log("submitForm");
    const { username, password, campus, course } = this.state;
    this.service
      .signup(username, password, campus, course)
      .then(response => {
        // reset form
        this.setState({
          username: "",
          password: "",
          campus: "",
          course: ""
        });

        this.props.getUser(response);
        this.props.history.push("/profile");
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className="main-container signup">
        <div className="left signup-form">
          <h1>Sign Up</h1>
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
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
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
            <p className="littleText">
              If you already have an account, you can log in{" "}
              <Link to="/login">here</Link>
            </p>
          </div>
        </div>
        <div className="right">
          <div className="text">
            <h2>Hello!!</h2>
            <p>Welcome to IronProfile!</p>
          </div>

          <div className="create-account">
            <p>
              If you signup, you agree with all our terms and conditions where
              we can do whatever we want with the data!
            </p>
            <button onClick={this.submitForm}>Create the Account</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
