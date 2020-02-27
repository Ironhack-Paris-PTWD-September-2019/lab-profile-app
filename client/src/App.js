import React, { Component } from 'react';
import './App.css';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login'
import EditProfile from './components/EditProfile'
import {Switch , Route} from 'react-router-dom'
import Profile from './components/Profile'
import AuthService from './components/auth/auth-service';

class App extends Component {

  state = { 
    loggedInUser: null 
  }
  service = new AuthService();

  fetchUser() {
    if (this.state.loggedInUser === null){
      this.service.loggedin()
        .then(response => {
          this.setState({loggedInUser: response})
        })
        .catch(err => {
          this.setState({loggedInUser: false}) 
        })
    }
  }
  
  // 👇
  componentDidMount() {
    this.fetchUser();
  }

  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }
 
  render(){
  return (
    <div className="App">
      {/* <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser}/> */}
      <Switch>
        <Route exact path='/' render={() => <Login getUser={this.getTheUser}/>} />
        <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>} />
        <Route exact path='/edit' render={() => <EditProfile getUser={this.getTheUser}/>} />
        <Route exact path='/profile' render={()=> <Profile userInSession={this.state.loggedInUser} getUser={this.getTheUser}/>}/>
      </Switch>
      
    </div>
  );
}
}

export default App;
