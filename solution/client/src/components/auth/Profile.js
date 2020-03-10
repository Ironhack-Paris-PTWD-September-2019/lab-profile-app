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

  handleUpload = (event) => {
    let formData = new FormData();
    formData.append('photo', event.target.files[0]);

    authService.upload(formData)
      .then(response => {
        this.props.updateUser(response);
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
              <form>
                <label>
                  <img className="avatar" src={this.props.user.image || "https://material.io/tools/icons/static/icons/baseline-person-24px.svg"} />
                  <input type="file" name="image" onChange={this.handleUpload} />
                </label>
              </form>
    
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