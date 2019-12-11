import React from 'react';
import './App.scss';


import { Switch, Route } from 'react-router-dom';
import AuthService from './services/AuthService'
import Signup from './components/auth/Signup/Signup';
import ProjectList from './components/project/ProjectList';
import PrivateRoute from './guards/PrivateRoute';
import { LandingPage } from './components/landingPage/LandingPage';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login/Login';
import Profile from './components/auth/profile/Profile';
import CreateNewProject from './components/project/CreateNewProject';


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
        .catch((error) => {
          this.setUser(false)
        })
    }
  }

  logout = () => {
    this.authService
      .logout()
      .then(payload => {
        this.setState({...this.state, user : null})

      })
      .catch(err => console.log(err));
  };



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
        <Navbar user={user} logout={this.logout}></Navbar>
        <div className="section is-medium">
          <Switch>
            <Route exact path="/login" render={(match) => <Login {...match} setUser={this.setUser} />} />
            <Route exact path="/signup" render={(match) => <Signup {...match} setUser={this.setUser} />} />
            <Route exact path="/" component={LandingPage} />

            {/* This is a private route, as you have to be loggedin to access your admin panel */}
            <PrivateRoute exact path="/profile/:id" user={user} redirectPath="/login" component={Profile}/>

            <PrivateRoute exact path="/panel/:username" user={user} redirectPath="/login" component={ProjectList} />
            <PrivateRoute exact path="/project/new" user={user} redirectPath="/login" component={CreateNewProject}/>

          </Switch>
        </div>
        
      </div>
    );
  }
}

