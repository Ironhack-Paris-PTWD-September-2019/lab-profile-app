import React from 'react';
import {Link} from 'react-router-dom';
import AuthService from './auth/auth-service.js'
class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            logout:false
        }
        this.service=new AuthService()
    }
    logoutUser=()=>{
        this.service.logout()
        .then(()=>{
            this.props.getUser(null)
            this.setState({
                logout:true
            })
        })
    }
    render(){
        return(
            <div>
                {this.props.userInSession?
                    <div>
                        <h2>Profile</h2>
                        <div className="field">
                            <div className="field-name">Username</div>
                            <div>{this.props.userInSession.username}</div>
                        </div>
                        <div className="field">
                            <div className="field-name">Campus</div>
                            <div>{this.props.userInSession.campus}</div>
                        </div>
                        <div className="field">
                            <div className="field-name">Course</div>
                            <div>{this.props.userInSession.course}</div>
                        </div>
                        <button onClick={()=>this.logoutUser()}>Logout</button>
                    </div>
                    :
                    <div>
                        {this.state.logout ? <p>You have successfully logged out</p>:<p></p>}
                        Please <Link to="/login">Log In</Link> to see your account
                    </div> 
                }
                
                
                <Link to="/">Home</Link>       
            </div>
        )
    }
}
export default Profile;