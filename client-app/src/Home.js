import React from 'react';
import {Link} from 'react-router-dom';


function Home() {
  return (
    <div className="App">
      <h1>Iron profile</h1>
      <Link to="/signup"><button>Signup</button></Link>
      <Link to="/login"><button>Login</button></Link>

    </div>
  );
}

export default Home;
