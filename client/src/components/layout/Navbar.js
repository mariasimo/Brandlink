import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../../services/AuthService'

export default class Navbar extends Component {
    constructor(props){
        super(props)
        this.authService = new AuthService();
    }

    logout = () => {
        this.authService.logout()
        .then(payload =>  {
            console.log(payload);
        })
        .catch(err => console.log(err))
    }

    render() {
        const user = this.props.user;

        return (
            <nav>
                <h1><img arc="" alt="BrandLink Logo"></img></h1>
                {(!user) && (
                    <React.Fragment>
                        <Link to="/signup">Signup</Link>
                        <Link to="/login">Login</Link>
                    </React.Fragment>
                )}
                {(user) && (
                    <React.Fragment>
                        <Link to="/profile">Hi, {user.username}</Link>
                        <Link to="/" onClick={this.logout}>Logout</Link>
                    </React.Fragment>
                )}
            </nav>
        )
    }
}
