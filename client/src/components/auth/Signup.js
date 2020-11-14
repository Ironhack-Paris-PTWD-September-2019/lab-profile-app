import React, { Component } from 'react';
import AuthService from './auth-service';


class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '', campus:'', course:'' };
    this.service = new AuthService();
  }

  // handleChange() and handleSubmit() will be added here
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const campus = this.state.campus;
    const course = this.state.course;

    this.service.signup(username, password, campus, course)
    .then( response => {
      // reset form
      this.setState({
        username: "", 
        password: "",
        campus:"",
        course:"",
      });
      
      this.props.getUser(response)
    })
    .catch( error => console.log(error) )
  }

  // 👇
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render(){
    return(
 
    <div>
          <div className="partieHaute">
              <h1>Sign Up</h1>
              <div className="partieHauteDroite">
              <h2>Hello!!!</h2>
              <h3>Welcome to IronProfile</h3>
              </div>
          </div>
           
          <form onSubmit={this.handleFormSubmit}>
            <div className="formGauche">
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>

          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />

          <label>Campus:   
           <select type="text" name="campus" value={this.state.campus} onChange={ e => this.handleChange(e)}>
              <option value=""> -- Choisi ton campus --</option>
              <option value="Madrid">Madrid</option>
              <option value="Barcelona">Barcelona</option>
              <option value="Miami">Miami</option>
              <option value="Paris">Paris</option>
              <option value="Berlin">Berlin</option>
              <option value="Amsterdam">Amsterdam</option>
              <option value="México">México</option>
              <option value="Sao Paulo">Sao Paulo</option>
           </select>
           </label>
         
        

          <label>Course:
           <select type="text" name="course" value={this.state.course} onChange={ e => this.handleChange(e)}>
              <option value=""> -- Choisi ton cours --</option>
              <option value="WebDev">WebDev</option>
              <option value="UX/UI">UX/UI</option>
              <option value="Data Analytics">Data Analytics</option>
             
           </select>
          </label>
        
          </div>
          <div className="formDroite">
            <p>if you signup, you are agree with all our terms and conditions where we can do whatever we want with the sata !</p>
        <input type="submit" value="Create the Account" />
        </div>
      </form>
       
      </div>   


    )
  }
  
}

export default Signup;