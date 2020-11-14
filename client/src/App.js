import React from 'react';
import './App.css';
import Homepage from './components/Homepage.js';
import Signup from './components/auth/Signup.js';
import Login from './components/auth/Login.js';
import Profile from './components/Profile.js'
import {Switch,Route} from 'react-router-dom';
import AuthService from './components/auth/auth-service';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={loggedInUser:null};
    this.service=new AuthService()
  }
  fetchUser(){
    if(this.state.loggedInUser===null){
      this.service.loggedin()
      .then(response=>{
        this.setState({loggedInUser:response})
      })
      .catch(err=>{this.setState({loggedInUser:false})})
    }
  }
  componentDidMount(){
    this.fetchUser()
  }
  getTheUser=(userObj)=>{
    this.setState({
      loggedInUser:userObj
    })
  }
  render(){
    //console.log("this.service",this.service.signup())
    return (
      <div className="App">
      <Switch>
        <Route exact path="/profile" render={()=><Profile getUser={this.getTheUser} userInSession={this.state.loggedInUser}/>}/>
        <Route exact path="/" component={Homepage}/>
        <Route exact path="/signup" render={()=><Signup getUser={this.getTheUser}/>}/>
        <Route exact path="/login" render={()=><Login getUser={this.getTheUser}/>}/>
      </Switch>
      </div>
    );
  }
  
}

export default App;
