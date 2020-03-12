// components/navbar/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

import AuthService from '../auth/auth-service';

class navbar extends React.Component {
  constructor(props){
    super(props);

    this.service = new AuthService(); 
  }
  
  logoutUser = () => {
    this.service.logout()
    .then(() => {
      this.props.getUser(null);  
    })
  }

  render() {
    if (this.props.userInSession){
      return (
        <nav className="nav-style">
          <ul>
            <li>Welcome, {this.props.userInSession.username}</li>
            <li>
              <Link to='/projects' style={{ textDecoration: 'none' }}>Projects</Link>
            </li>
            <li>
              <button onClick={() => this.logoutUser()}>Logout</button>
            </li>
          </ul>
        </nav>
      )
    } else {
      return (
        <div>
          <nav className="nav-style">
            <ul>

              <li><Link to='/' style={{ textDecoration: 'none' }}>Login</Link></li>
              <li><Link to='/signup' style={{ textDecoration: 'none' }}>Signup</Link></li>
            </ul>
          </nav>
        </div>
      )
    }
  }
}

export default navbar;