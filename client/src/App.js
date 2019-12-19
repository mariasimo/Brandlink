import React from 'react';
import './App.scss';

import { Switch, Route } from 'react-router-dom';
import AuthService from './services/AuthService';
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
import ProjectService from './services/ProjectService';
import Assets from './components/brandPresets/Assets';
import TextStyles from './components/brandPresets/TextStyles';
import NewTextStyle from './components/brandPresets/NewTextStyle';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
    this.projectService = new ProjectService();
    this.state = {
      user: null,
      menuIsOpen: 'show'
    };
    this.loadingImg = '';
    this.loadingParent = '';
  }

  toggleMenu = () => {
    let toggleClass = this.state.menuIsOpen === 'show' ? 'hide' : 'show';
    this.setState({
      ...this.state,
      menuIsOpen: toggleClass
    });
  };

  setUser = user => {
    if (user === undefined || !user.hasOwnProperty('id')) return;

    this.setState({
      ...this.state,
      user
    });

    if(this.state.user) {
    this.projectService.displayProject(user.id)
    .then(project => {
      console.log(project)
      this.setState({
        ...this.state,
        colorPalette: project.colorPalette,
        typeset: project.typeset,
        assets: project.assets,
      })
      console.log(this.state)
    })
    } else {
      this.setState({
        ...this.state,
        user
      });  
    }
  };

  // displayProject = (userId) => {
  //   this.projectservice.displayProject(userId)
  //   .then(project => {
  //     console.log(project)
  //     this.setState({
  //       ...this.state,
  //       colorPalette: project.colorPalette,
  //       typeset: project.typeset,
  //       assets: project.assets,
  //     })
  //   })
  // }


  fetchUser = () => {
    if (this.state.user === null) {
      this.authService
        .loggedInUser()
        .then(user => {
          if (user !== undefined) {
            this.setUser(user);
            this.displayProject(user.id)
          }
        })
        .catch(error => {
          this.setUser(false);
        });
    }
  };

  logout = () => {
    this.authService
      .logout()
      .then(payload => {
        this.setState({ ...this.state, user: null });
      })
      .catch(err => console.log(err));
  };

  setActiveProject = path => {
    const { id } = this.state.user;
    this.authService
      .setActiveProject({ path, id })
      .then(userHasAnActiveProject => {
        this.setUser(userHasAnActiveProject);
    });
  };

  addFontsLinks = typeset => {
    typeset.map(type => {
      const link = document.createElement("link");
      link.setAttribute(
        "href",
        `https://fonts.googleapis.com/css?family=${type.fontFamily.replace(
          " ",
          "+"
        )}&display=swap`
      );
      link.setAttribute("rel", `stylesheet`);
      document.head.appendChild(link);
    })
  };

  addColorToPalette = ({ name, hexadecimal, id, colorId, history }) => {
    console.log({ name, hexadecimal, id, colorId, history })
    this.projectService
      .addColorToPalette({ name, hexadecimal, id, colorId })
      .then(
        updatedProject => {
          this.setState({
            ...this.state,
            name: '',
            hexadecimal: '',
            colorPalette: updatedProject.colorPalette
          });
          history.push(`/project/${id}/edit/colorPalette`, {
            state: this.state.colorPalette
          });
        },
        error => console.error(error)
      );
  };

  deleteColor = colorId => {
    this.projectService.deleteColor(colorId).then(
      project => {
        this.setUser(this.state.user);
      },
      error => {
        const { message } = error;
        console.error(message);
      }
    );
  };

  saveType = ({ fontFamily, type, path, history }) => {
    this.projectService.addTypeToTypeSet({ fontFamily, type, path }).then(
      updatedProject => {
        this.setState({
          ...this.state,
          fontFamily: '',
          typeset: updatedProject.typeset
        });
        history.push(`/project/${path}/edit/typeSet`);
      },
      error => console.error(error)
    );
  };

  deleteType = typeId => {
    this.projectService.deleteType(typeId).then(
      project => {
        this.setUser(this.state.user);
      },
      error => {
        const { message } = error;
        console.error(message);
      }
    );
  };

  addAsset = ({ uploadData, path }) => {
    this.loadingImg = document.createElement('img');
    this.loadingImg.setAttribute('src', 'http://localhost:3000/loading.svg');
    this.loadingParent = document.querySelector('.file-label');
    this.loadingParent.appendChild(this.loadingImg);

    this.projectService
      .uploadAsset({ uploadData, path })
      .then(() => {
        this.setUser(this.state.user);
        this.loadingParent.removeChild(this.loadingImg);
      })
      .catch(error => console.log(error));
  };

  deleteAsset = assetId => {
    this.projectService.deleteAsset(assetId).then(
      project => {
        this.setUser(this.state.user);
      },
      error => {
        const { message } = error;
        console.error(message);
      }
    );
  };

  onDragStart = (ev, id) => {
    console.log('dragstart:', id);
    ev.dataTransfer.setData('id', id);
  };

  onDrop = (ev, id) => {
    let fileId = ev.dataTransfer.getData('id');
    this.setState({ ...this.state, file: fileId });
    console.log(fileId);
  };

  componentDidMount() {
    this.fetchUser();
    if (this.state.typeset && this.state.typeset.length) {
      this.addFontsLinks(this.state.typeset);
    }
  }

  render() {
    this.fetchUser();
    const { user, menuIsOpen, colorPalette, typeset, assets } = this.state;

    return (
      <div className='App'>
        {/* The navbar has to pass the username to the profile menu link */}
        {/* I need to pass match (the props) so I cant redirect to home after logout*/}
        <Navbar user={user} logout={this.logout}></Navbar>
        <>
          {user && (
            <Switch>
              <Route
                exact
                path='/login'
                render={match => <Login {...match} setUser={this.setUser} />}
              />
              <Route
                exact
                path='/signup'
                render={match => <Signup {...match} setUser={this.setUser} />}
              />
              <Route exact path='/' component={LandingPage} />

              {/* This is a private route, as you have to be loggedin to access your admin panel */}
              <PrivateRoute
                exact
                path='/profile/:id'
                user={user}
                redirectPath='/login'
                component={Profile}
              />

              {/* <PrivateRoute exact path="/panel/:username" user={user}  component={ProjectList}/> */}
              <Route
                exact
                path='/panel/:username'
                render={match => (
                  <ProjectList
                    {...match}
                    setPath={this.setPath}
                    setActiveProject={this.setActiveProject}
                    setUser={this.setUser}
                  />
                )}
              />

              <PrivateRoute
                exact
                path='/project/new'
                user={user}
                component={NewProject}
                toggleMenu={this.toggleMenu}
                menuIsOpen={menuIsOpen}
              />

              <PrivateRoute
                exact
                path='/project/:id/edit'
                user={user}
                toggleMenu={this.toggleMenu}
                menuIsOpen={menuIsOpen}
                colorPalette={colorPalette}
                typeset={typeset}
                assets={assets}
                component={EditProject}
              />

              <PrivateRoute
                exact
                path='/project/:id/edit/colorPalette'
                user={user}
                toggleMenu={this.toggleMenu}
                menuIsOpen={menuIsOpen}
                colorPalette={colorPalette}
                deleteColor={this.deleteColor}
                typeset={typeset}
                assets={assets}
                component={ColorPalette}
              />

              <PrivateRoute
                exact
                path='/project/:id/edit/colorPalette/new/:colorId?'
                user={user}
                toggleMenu={this.toggleMenu}
                menuIsOpen={menuIsOpen}
                colorPalette={colorPalette}
                addColorToPalette={this.addColorToPalette}
                typeset={typeset}
                assets={assets}
                component={NewColor}
              />

              <PrivateRoute
                exact
                path='/project/:id/edit/typeset'
                user={user}
                toggleMenu={this.toggleMenu}
                menuIsOpen={menuIsOpen}
                colorPalette={colorPalette}
                deleteType={this.deleteType}
                assets={assets}
                typeset={typeset}
                component={TypeSet}
              />

              <PrivateRoute
                exact
                path='/project/:id/edit/typeset/new/:source?'
                user={user}
                toggleMenu={this.toggleMenu}
                colorPalette={colorPalette}
                menuIsOpen={menuIsOpen}
                typeset={typeset}
                saveType={this.saveType}
                assets={assets}
                component={NewType}
              />

              <PrivateRoute
                exact
                path='/project/:id/edit/assets'
                user={user}
                toggleMenu={this.toggleMenu}
                menuIsOpen={menuIsOpen}
                colorPalette={colorPalette}
                typeset={typeset}
                assets={assets}
                addAsset={this.addAsset}
                deleteAsset={this.deleteAsset}
                onDragStart={this.onDragStart}
                onDrop={this.onDrop}
                file={this.state.file}
                component={Assets}
              />

              <PrivateRoute
                exact
                path='/project/:id/edit/textStyles'
                user={user}
                toggleMenu={this.toggleMenu}
                menuIsOpen={menuIsOpen}
                colorPalette={colorPalette}
                typeset={typeset}
                assets={assets}
                component={TextStyles}
              />

              <PrivateRoute
                exact
                path='/project/:id/edit/textStyles/new/:styleId?'
                user={user}
                toggleMenu={this.toggleMenu}
                menuIsOpen={menuIsOpen}
                colorPalette={colorPalette}
                typeset={typeset}
                assets={assets}
                component={NewTextStyle}
              />
            </Switch>
          )}

          {!user && (
            <Switch>
              <Route
                exact
                path='/login'
                render={match => <Login {...match} setUser={this.setUser} />}
              />
              <Route
                exact
                path='/signup'
                render={match => <Signup {...match} setUser={this.setUser} />}
              />
              <Route exact path='/' component={LandingPage} />
            </Switch>
          )}
        </>
      </div>
    );
  }
}
