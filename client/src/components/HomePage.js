import React, {Component} from 'react'

class HomePage extends Component {
    render() {
        return (
            <div className="HomePage">
                <h1>IronProfile</h1>
                <p>Today we will create an app with authorisation, adding some cool styles !</p>

                <a href="/auth/signup">Sign Up</a>
                <a href="/auth/login">Login</a>


            </div>
        )
    }
}

export default HomePage;