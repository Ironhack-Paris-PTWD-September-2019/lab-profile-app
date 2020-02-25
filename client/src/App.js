import React, {Component} from 'react';
import './App.css';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import AuthService from './components/auth/auth-service';
import { Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage.js'

class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null }; // savoir si on est déjà connecté
    this.service = new AuthService()
  }

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
  
  
  componentDidMount() {
    this.fetchUser();
  }


  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  logoutUser = () => {
    this.service.logout()
    .then(() => {
      this.getTheUser(null);  
    })
  }

  render() {
    return (
      <div className="App">
      
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path='/auth/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
          <Route exact path="/auth/login" render={() => <Login getUser={this.getTheUser}/>}/>
          <Route exact path="/auth/logout" render={() => this.logoutUser()}/>}/>

          {/* <Route exact path="/auth/edit" component={UserUpdate} />
          <Route exact path="/auth/logout" component={Logout} /> */}
          
        </Switch>
      </div>
    );
  }
}

export default App;
