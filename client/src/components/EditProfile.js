import React from 'react'
import AuthService from './auth/auth-service'

class EditProfile extends React.Component{
    state = {
        username : "",
        campus : "",
        course : ""
    };
    service = new AuthService();

    handleFormSubmit =(event)=>{
        console.log('oooooookkkkkkk',this.props.username)
        event.preventDefault();
        const username = this.props.username;
        const campus = this.state.campus;
        const course = this.state.course;
        this.service.edit(username , campus , course)
            .then(response=>{
                this.setState({
                    username : "",
                    campus : "",
                    course:""
                })
                this.props.getUser(response)
            })
            .catch(err=>console.log(err))
    }
    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
      }

    render(){
        return(
            <div>
                <form onSubmit={this.handleFormSubmit}>
                <label>Username:</label>
                <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>

                <label>Campus:</label>
                <textarea name="campus" value={this.state.campus} onChange={ e => this.handleChange(e)} />

                <label>Course:</label>
                <textarea name="course" value={this.state.course} onChange={ e => this.handleChange(e)} />

                <input type="submit" value="Edit" />
                </form>
            </div>
        )
    }
}

export default EditProfile