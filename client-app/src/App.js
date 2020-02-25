import React from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/login" component={Login}/>
      </Switch>


      </Router>
    </div>
  );
}

export default App;
