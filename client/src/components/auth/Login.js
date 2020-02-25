import React from 'react';
import AuthService from './auth-service';
import {Link,withRouter} from 'react-router-dom';
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={username:"",password:""};
        this.service=new AuthService()
    }
    handleFormSubmit=(event)=>{
        event.preventDefault();
        const username=this.state.username;
        const password=this.state.password;
        this.service.login(username,password)
        .then(response=>{
            this.setState({username:"",password:""});
            this.props.getUser(response);
            this.props.history.push("/profile")
        })
        .catch(err=>console.log(err))
    }
    handleChange=(event)=>{
        const {name,value}=event.target;
        this.setState({[name]:value})
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <h2>Welcome to Iron Profile</h2>
                    <div>
                        <label>Username</label>
                        <input type="text" name="username" value={this.state.username} onChange={e=>this.handleChange(e)}/>
                    </div>

                    <div>
                        <label>Password</label>
                        <input type="password" name="password" value={this.state.password} onChange={e=>this.handleChange(e)}/>
                    </div>
                    
                    <button>Log In</button>
                </form>
                <p>
                    Dont have account ?
                    <Link to={"/signup"}>Sign up</Link>
                </p>
                <Link to={"/"}>Home</Link>
            </div>
        )
    }
}
export default withRouter(Login);