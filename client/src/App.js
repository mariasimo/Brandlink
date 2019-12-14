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
import NewProject from './components/project/NewProject';
import EditProject from './components/project/EditProject';
import ColorPalette from './components/brandPresets/ColorPalette';
import NewColor from './components/brandPresets/NewColor';
import TypeSet from './components/brandPresets/TypeSet';
import NewType from './components/brandPresets/NewType';
import ProjectService from './services/ProjectService'


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
    this.projectService = new ProjectService();
    this.state = {
      user: null,
      activeProject: ""
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

  setPath = (path) => {
    this.projectService.fetchOneProject(path)
    .then(project => {

      this.setState({
        ...this.state,
        activeProject: project
      })

      // this.addFontsLinks()
      this.state.activeProject.typeset.map(type => {
          this.addFontsLinks(type.fontFamily)
      })

    })
  }

  addFontsLinks= (type) => {
      const link = document.createElement("link")
      link.setAttribute("href", `https://fonts.googleapis.com/css?family=${type.replace(" ", "+")}&display=swap`)
      link.setAttribute("rel", `stylesheet`)
      document.head.appendChild(link)
  }

  componentDidMount() {
    this.fetchUser()
    // this.addFontsLinks()
  }

  render () {
    this.fetchUser()
    const { user, activeProject } = this.state;

    return (
      <div className="App">
        {/* The navbar has to pass the username to the profile menu link */}
        {/* I need to pass match (the props) so I cant redirect to home after logout*/}
        <Navbar user={user} logout={this.logout}></Navbar>
        <div className="section is-medium">

          {user && <Switch>
            <Route exact path="/login" render={(match) => <Login {...match} setUser={this.setUser} />} />
            <Route exact path="/signup" render={(match) => <Signup {...match} setUser={this.setUser} />} />
            <Route exact path="/" component={LandingPage} />
            
            {/* This is a private route, as you have to be loggedin to access your admin panel */}
            <PrivateRoute exact path="/profile/:id" user={user} redirectPath="/login" component={Profile}/>
            
            {/* <PrivateRoute exact path="/panel/:username" user={user}  component={ProjectList}/> */}
            <Route exact path="/panel/:username" render={(match) => <ProjectList {...match} setPath={this.setPath} setUser={this.setUser} />} />

            <PrivateRoute exact path="/project/new" user={user} component={NewProject}/>
            <PrivateRoute exact path="/project/:path/edit" user={user} activeProject={activeProject} component={EditProject}/>

            <PrivateRoute exact path="/project/:path/edit/colorPalette" user={user} component={ColorPalette}/>
            <PrivateRoute exact path="/project/:path/edit/colorPalette/new/:colorId?" user={user} component={NewColor}/>

            <PrivateRoute exact path="/project/:path/edit/typeset" user={user} component={TypeSet}/>
            <PrivateRoute exact path="/project/:path/edit/typeset/new/:source?" user={user} component={NewType}/>

          </Switch> }

          {!user && <Switch>
            <Route exact path="/login" render={(match) => <Login {...match} setUser={this.setUser} />} />
            <Route exact path="/signup" render={(match) => <Signup {...match} setUser={this.setUser} />} />
            <Route exact path="/" component={LandingPage} />

          </Switch> }

        </div>
        
      </div>
    );
  }
}

