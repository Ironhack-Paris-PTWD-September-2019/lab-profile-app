import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service.login(username, password)
    .then( response => {
        this.setState({ username: "", password: "" });
        this.props.getUser(response)
    })
    .catch( error => console.log(error) )
  }
    
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    
  render(){
    return(
      <div>
           <div className="partieHaute">
              <h1>Log In</h1>
              <div className="partieHauteDroite">
              <h2>Hello!!!</h2>
              <h3>Awesome to have at IronProfile again !</h3>
              </div>
          </div>
        <form onSubmit={this.handleFormSubmit}>
            <div className="formGauche">
                <label>Username:</label>
                <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
                <label>Password:</label>
                <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
            </div>
            <div className="formDroite">
            <p>if you signup, you are agree with all our terms and conditions where we can do whatever we want with the sata !</p>
                <input type="submit" value="Login" />
            </div>
        </form>
        <p>Don't have account? 
            <Link to={"/signup"}> SignUp</Link>
        </p>
      </div>
    )
  }
}

export default Login;