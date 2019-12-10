import React from 'react'
import AuthService from '../../../services/AuthService'

export default class Signup extends React.Component {
    constructor(props){
        super(props)
        this.authService = new AuthService();

        this.state = {
            username : "",
            password : ""
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({...this.state, [name]: value})
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        const { history, setUser } = this.props
        this.authService.signup(this.state)
        .then(
          (user) => {
            setUser(user);

            // todo This should redirect me to the admin panel
            history.push(`/panel/${user.username}`)
          },
          (error) => {
            console.error(error)
          }
        )
      }
    

    render() {
        const { username, password } = this.state;
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" value={username} onChange={this.handleChange}/>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" value={password} onChange={this.handleChange}/>

                    <input type="submit" value="Create account"/>
                </form>
            </div>
        )
    }
}
