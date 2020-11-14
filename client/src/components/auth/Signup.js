import React from 'react';
import AuthService from './auth-service';
import {Link, withRouter} from 'react-router-dom';
class Signup extends React.Component{

    constructor(props){
        super(props);
        this.state={
            username:"",
            password:"",
            campus:"Madrid",
            course:"WebDev",
            image:""
        };
        this.service=new AuthService()
    }

    handleFormSubmit=(event)=>{
        event.preventDefault();
        
        const username=this.state.username;
        const password=this.state.password;
        const campus=this.state.campus;
        const course=this.state.course;
        const image=this.state.image;

        console.log("campus",campus,"course",course,"image",image)
        this.service.signup(username,password,campus,course,image)
        .then(response=>{
            this.setState({
                username:"",
                password:"",
                campus:"",
                course:"",
                image:""
            })
            this.props.getUser(response);
            console.log("response sign up",response)
            this.props.history.push("/profile");
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
                    <h2>Hello Welcome at IronProfile</h2>
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username" value={this.state.username} onChange={e=>this.handleChange(e)}/>
                    </div>

                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" value={this.state.password} onChange={e=>this.handleChange(e)}/>
                    </div>

                    <div>
                        <label>Campus:</label>
                        <select name="campus" value={this.state.campus} onChange={e=>this.handleChange(e)}>
                            <option value="Madrid">Madrid</option>
                            <option value="Barcelona">Barcelona</option>
                            <option value="Miami">Miami</option>
                            <option value="Paris">Paris</option>
                            <option value="Berlin">Berlin</option>
                            <option value="Amsterdam">Amsterdam</option>
                            <option value="México">México</option>
                            <option value="Sao Paulo">Sao Paulo</option>
                        </select>
                    </div>

                    <div>
                        <label>Course:</label>
                        <select name="course" value={this.state.course} onChange={e=>this.handleChange(e)}>
                            <option value="WebDev'">WebDev</option>
                            <option value="UX/UI">UX/UI</option>
                            <option value="Data Analytics">Data Analytics</option>
                        </select>
                    </div>

                    <button>Create the account</button>
                </form>
                <p>
                    Already have account ?
                    <Link to={"/login"}>Log In</Link>
                </p>
                <Link to={"/"}>Home</Link>
            </div>
        )
    }
}
export default withRouter(Signup);