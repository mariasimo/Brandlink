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
          },
          (error) => {
            this.setUser(false)
          }
        )
        .catch(() => {
          this.setUser(false)
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
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/login" render={(match) => <Login {...match} setUser={this.setUser} />} />
          <Route exact path="/signup" render={(match) => <Signup {...match} setUser={this.setUser} />} />
          <Route exact path="/" component={LandingPage} />

          {/* This is a private route, as you have to be loggedin to access your admin panel */}
          {/* Should this path contain the user username? How can i achieve this?*/}
          {/* <Route exact path="/" render={() => <ProjectList user={this.state.user}></ProjectList>}/> */}
          {/* <PrivateRoute exact path="" user={this.state.user} component={ProjectList} /> */}

          <PrivateRoute exact path="/panel/:username" user={this.state.user} component={ProjectList} />
        </Switch>
      </div>
    );
  }
}

