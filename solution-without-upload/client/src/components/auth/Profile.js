import React from 'react';

import Popin from '../Popin.js';
import authService from './auth-service.js';
import { Redirect } from 'react-router-dom';

export default class extends React.Component {

  logout = (event) => {
    authService.logout()
      .then(response => {
        this.props.updateUser(false);
      })
    ;
  }

  render() {
    return (
      <>
        {!this.props.user._id ? (
          <Redirect to="/" />
        ) : (
          <Popin one={(
            <>
              <h1>Profile</h1>
              
              <p>
                <em>Username</em>
                <span>{this.props.user.username}</span>
              </p>
              <p>
                <em>Campus</em>
                <span>{this.props.user.campus}</span>
              </p>
              <p>
                <em>Course</em>
                <span>{this.props.user.course}</span>
              </p>
    
              <div className="cta">
                <button className="btn logout" onClick={this.logout}>Logout</button>
              </div>
            </>
          )} two={(
            <>
              <img className="avatar" src="https://material.io/tools/icons/static/icons/baseline-person-24px.svg" />
    
              <p>
                <small>The user is able to upload a new profile photo, using NodeJS and Multer uploader.</small>
              </p>
            </>
          )} />
        )}
      </>
    );
  }
}