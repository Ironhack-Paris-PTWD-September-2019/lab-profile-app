import React from "react";
import { Link } from "react-router-dom";
import AuthServices from "./auth-service";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: ""
    };
    this.service = new AuthServices();
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submitForm = () => {
    const { username, password } = this.state;
    this.service
      .login(username, password)
      .then(response => {
        // reset form
        this.setState({
          username: "",
          password: ""
        });

        this.props.getUser(response);
        this.props.history.push("/profile");
      })
      .catch(error => {
        this.setState({ error: error.response.data.message });
        console.log(error.response.data.message);
      });
  };

  render() {
    return (
      <div className="main-container signup">
        <div className="left signup-form">
          <h1>Log In</h1>
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
            <p style={{ color: "red" }}>{this.state.error}</p>
            <p className="littleText">
              If you don't have an account yet, you can create your account{" "}
              <Link to="/signup">here</Link>
            </p>
          </div>
        </div>
        <div className="right">
          <div className="text">
            <h2>Hello!!</h2>
            <p>Awesome to have an IronProfile!</p>
          </div>
          <div className="create-account">
            <p>
              If you login, you agree with all our terms and conditions where we
              can do whatever we want with the data!
            </p>
            <button onClick={this.submitForm}>Log In</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
