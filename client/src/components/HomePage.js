import React from "react";
import { Link } from 'react-router-dom'; 


class HomePage extends React.Component{
    render(){
        return(
            <div className="Home">
            <button><Link to= "/signup">Sign Up</Link></button>
            <button><Link to ="/login">Login</Link></button>
            </div>
        )
    }
}
export default HomePage;