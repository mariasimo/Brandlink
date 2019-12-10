import React from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';
import AuthService from './services/AuthService'
import Signup from './components/auth/Signup/Signup';
import ProjectList from './components/project/ProjectList';
import PrivateRoute from './guards/PrivateRoute';
import { LandingPage } from './components/landingPage/LandingPage';
import Navbar from './components/navbar/Navbar';
import Login from './components/auth/Login/Login';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
    this.state = {
      user: null
    }
  }

  setUser = (user) => {
    this.setState({...this.state, user})
  }

  fetchUser = () => {
    if (this.state.user === null) {
      this.authService.loggedInUser()
        .then(
          (user) => {
            this.setUser(user)
            console.log({message: "User set", user})
          },
          (error) => {
            this.setUser(false)
            console.log({message: "User set error", error})
          }
        )
        .catch((error) => {
          this.setUser(false)
          console.log({message: "User set error", error})

        })
    }
  }


  componentDidMount() {
    this.fetchUser()
  }

  render () {
    this.fetchUser()
    const { user } = this.state;

    return (
      <div className="App">
        {/* The navbar has to pass the username to the profile menu link */}
        {/* I need to pass match (the props) so I cant redirect to home after logout*/}
        <Navbar user={user} ></Navbar>

        <Switch>
          <Route exact path="/login" render={(match) => <Login {...match} setUser={this.setUser} />} />
          <Route exact path="/signup" render={(match) => <Signup {...match} setUser={this.setUser} />} />
          <Route exact path="/" component={LandingPage} />

          {/* This is a private route, as you have to be loggedin to access your admin panel */}
          <PrivateRoute exact path="/panel/:username" user={user} redirectPath="/" component={ProjectList} />
        </Switch>
        
      </div>
    );
  }
}

