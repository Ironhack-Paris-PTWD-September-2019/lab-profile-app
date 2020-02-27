// auth/Signup.js

import React, { Component } from 'react';
import AuthService from './auth-service';
import {Redirect} from 'react-router-dom'

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
  }

  // handleChange() and handleSubmit() will be added here
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service.signup(username, password)
    .then( response => {
      // reset form
      this.setState({
        username: "", 
        password: "",
      });
      
      this.props.getUser(response)
      
    })
    .catch( error => console.log(error) )
  }

  // 👇
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render(){
    console.log(this.props)
    if(this.state.username === true) {
      return (
      <Redirect to='/profile' />
      )
    }
    else{
    return(
        <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>

          <label>Password:</label>
          <textarea name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />

          <input type="submit" value="Signup" />
        </form>

        <p>
          Already have account? 
          
        </p>

      </div>
      // more code will be added here
    )
    }
  }
}

export default Signup;