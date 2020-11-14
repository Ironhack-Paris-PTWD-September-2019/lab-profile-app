import React, { Component } from 'react';
import './App.css';
import HomePage from './components/HomePage.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js'
import { Switch, Route } from 'react-router-dom';


class App extends Component {

  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    //this.service = new AuthService();
  }

  // fetchUser() {
  //   if (this.state.loggedInUser === null){
  //     this.service.loggedin()
  //       .then(response => {
  //         this.setState({loggedInUser: response})
  //       })
  //       .catch(err => {
  //         this.setState({loggedInUser: false}) 
  //       })
  //   }
  // }
  
  // componentDidMount() {
  //   this.fetchUser();
  // }

  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
  return (
    <div className="App">
        <Switch> {/* 👈 rend 1 seule des 2 routes */}
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>}/>
          <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
        </Switch>
    </div>
  );
}
}

export default App;
