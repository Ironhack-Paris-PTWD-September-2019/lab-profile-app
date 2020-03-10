import React from 'react';
import './App.css';
import HomePage from "./components/HomePage.js"
import Signup from "./components/auth/Signup.js";
import Login from "./components/auth/Login.js"; 
import { Switch, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/Signup" component={Signup}/>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/Login" component={Login}/>
      </Switch>

    </div>
  );
}

export default App;
