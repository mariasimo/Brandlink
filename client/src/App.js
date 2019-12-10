import React from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';
// import AuthService from './services/AuthService'
import Signup from './components/auth/Signup/Signup';
import ProjectList from './components/project/ProjectList';

export default class App extends React.Component {
  constructor(props) {
    super(props);
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

  render () {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" user={this.state.user} component={ProjectList}/>
          <Route exact path="/signup" render={(match) => <Signup {...match} setUser={this.setUser} />} />
        </Switch>
      </div>
    );
  }
}

