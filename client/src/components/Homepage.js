import React from 'react';
import {Link} from 'react-router-dom';
class Homepage extends React.Component{
    render(){
        return(
            <div className="Homepage">
                <h2>IronProfile</h2>
                <p>Today we will create an app with authorisation, adding some cool styles</p>
                <div className="button"><Link to="/signup"><button>Sign up</button></Link></div>
                <div className="button"><Link to="/login"><button>Log in</button></Link></div>
                <div className="button"><Link to="/profile"><button>Your Profile</button></Link></div>           
            </div>
        )
    }
}
export default Homepage;