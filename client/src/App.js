import React, {useEffect, useState } from 'react';

import { Switch, Route } from 'react-router-dom';
import AuthService from './services/AuthService';

import Signup from './components/auth/Signup';
import Profile from './components/auth/Profile';
import Login from './components/auth/Login';

import ProjectList from './components/project/ProjectList';
import PrivateRoute from './guards/PrivateRoute';
import { LandingPage } from './components/landingPage/LandingPage';
import Navbar from './components/layout/Navbar';
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
import ReadProject from './components/project/ReadProject';



const App = () => {
  const authService = new AuthService();
  const projectService = new ProjectService();

  const [user, setUser] = useState(null)
  const [menuIsOpen, setMenuIsOpen] = useState('show')
  const [file, setFile] = useState('')
  // const [loadingImg, setLoadingImg] = useState('')
  // const [loadingParent, setLoadingParent] = useState('')


  // esto no estaba
  const [project, setProject] = useState({
    colorPalette: []
  })

  const toggleMenu = () => (
    setMenuIsOpen(menuIsOpen === 'show' ? 'hide' : 'show')
  )

  const setLoggedUser = (user) => {
    if(user === undefined || !user.hasOwnProperty('id')) return
    setUser(user)

    if(user.activeProject) {
      projectService.displayProject(user.id)
      .then( projectData => {
        console.log(projectData)
        setProject({
          title: projectData.title,
          colorPalette: projectData.colorPalette || [],
          typeset: projectData.typeset,
          assets: projectData.assets,
          textstyles: projectData.textstyles
        })
        addFontsLinks(projectData.typeset)
      })
    }
  }

  const logout = () => {
    authService.logout()
      .then(payload => {
        console.log('logout payload:')
        console.log(payload)
        setUser(null);
      })
      .catch(err => console.log(err));
  };

  const setActiveProject  = path => {
    const {id} = user
    authService.setActiveProject({path, id})
    .then( activeProject => (
      console.log(activeProject)
      // dont know what is this
      // setUser(activeProject)
    ))
  }


  const addFontsLinks = typeset => {
    typeset.map(type => {
      const link = document.createElement('link');
      link.setAttribute(
        'href',
        `https://fonts.googleapis.com/css?family=${type.fontFamily.replace(
          ' ',
          '+'
        )}&display=swap`
      );
      link.setAttribute('rel', `stylesheet`);
      return document.head.appendChild(link);
    });
  };


  const deleteProject = projectId => {
    projectService.deleteProject(projectId)
    .then(response=> {
      console.log("proyecto borrado ok")
      console.log(response)
      //Esto aqui pa què
        // setUser(user);
      },
      error => {
        console.error(error.message);
      }
    );
  };

  const addColorToPalette = ({ name, hexadecimal, id, colorId, history }) => {
    projectService
      .addColorToPalette({ name, hexadecimal, id, colorId })
      .then(
        updatedProject => {

          // aquí parece que se guardan los datos de la paleta en el estado, pero no tiene que ver con el active project
          console.log(updatedProject)

          setProject(
           { ...project, colorPalette: updatedProject.colorPalette}
          )
          // setState({
          //   ...this.state,
          //   name: '',
          //   hexadecimal: '',
          //   colorPalette: updatedProject.colorPalette
          // });
          history.push(`/project/${id}/edit/colorPalette`, {
            state: this.state.colorPalette
          });
        },
        error => console.error(error)
      );
  };

  const deleteColor = colorId => {
    projectService.deleteColor(colorId).then(
      project => {
        console.log(project)
        // otra vez setear el usuario pa qué
        // this.setUser(this.state.user);
      },
      error => console.error(error.message))
  };

  const saveType = ({ fontFamily, type, path, history }) => {
    projectService.addTypeToTypeSet({ fontFamily, type, path })
    .then(updatedProject => {
        // setea la nueva tipografia

        console.log(updatedProject)
        // setState({
        //   ...this.state,
        //   fontFamily: '',
        //   typeset: updatedProject.typeset
        // });
        history.push(`/project/${this.state.user.activeProject}/edit/typeSet`);
      },
      error => console.error(error)
    );
  };

  const deleteType = typeId => {
    projectService.deleteType(typeId)
    .then( project => {
        // this.setUser(this.state.user);
      },
      error => console.log(error.message)
    )
  };

  const addTextStyle = ({ textstyle, path, styleId, history }) => {
    projectService
      .addTextStyle({ ...textstyle, path, styleId, history })
      .then(
        () => {

          // tampoco tengo ni idea de cómo se articula esta parte del estado

          // this.setState({
          //   ...this.state,
          //   name: '',
          //   fontFamily: '',
          //   fontSize: 1,
          //   fontWeight: null,
          //   lineHeight: 1,
          //   letterSpacing: 0,
          //   uppercase: false
          // });
          history.push(
            `/project/${this.state.user.activeProject}/edit/textStyles`
          );
        },
        error => console.error(error)
      );
  };

  const addAsset = ({ uploadData, path }) => {

    // Esto puede suceder en el scope local y sacarlo del estado???
    const loadingImg = document.createElement('img');
    loadingImg.setAttribute('src', 'http://localhost:3000/loading.svg');
    const loadingParent = document.querySelector('.file-label');
    loadingParent.appendChild(this.loadingImg);

    projectService
      .uploadAsset({ uploadData, path })
      .then(() => {
        // this.setUser(this.state.user);
        loadingParent.removeChild(loadingImg);
      })
      .catch(error => console.log(error));
  };


  const deleteAsset = assetId => {
    projectService.deleteAsset(assetId)
    .then(project => {
        // this.setUser(this.state.user);
      },
      error => {
        const { message } = error;
        console.error(message);
      }
    );
  };

  const onDragStart = (ev, id) => {
    console.log('dragstart:', id);
    ev.dataTransfer.setData('id', id);
  };

  const onDrop = (ev, slotIdx) => {
    let fileId = ev.dataTransfer.getData('id');
    setFile(fileId);
  };

  const createProject = ({ title, path, history }) => {
    projectService.createProject({ title, path })
    .then(projectCreated => {
        // esto es para limpiar algo??
        // this.setState({ ...this.state, title: '', path: '' });

        history.push(`/panel/${this.state.user.username}`);
      },
      error => console.error(error)
    );
  };

  const shareMessage = ({email, projectId}) =>{
    projectService
    .shareMessage({ email, projectId})
    .then((response)=>{
      if (response.msg === 'success'){
          alert("Message Sent.");
          this.resetForm()
      }else if(response.msg === 'fail'){
          alert("Message failed to send.")
      }
    })
  }

  const resetForm = () => document.getElementById('contact-form').reset();


  useEffect(()=>{

    const fetchUser = () => {
      if (!user) {
        authService.loggedInUser()
          .then(user => {
              setLoggedUser(user);
              // displayProject(user.id);
          })
          .catch(error => {
            throw new Error(error)
          });
      }
    };

    fetchUser()

  },[])

const {colorPalette, typeset, assets, textstyles, title: projectTitle} = project

  return (
    <div className='App'>
    <Navbar user={user} logout={logout}></Navbar>
<>
  {user && (
    <Switch>
      <Route
        exact
        path='/login'
        render={match => <Login {...match} setUser={setLoggedUser} />}
      />
      <Route
        exact
        path='/signup'
        render={match => <Signup {...match} setUser={setLoggedUser} />}
      />
      <Route exact path='/' component={LandingPage} />

      <PrivateRoute
        exact
        path='/profile/:id'
        user={user}
        redirectPath='/login'
        component={Profile}
      />

      <Route
        exact
        path='/panel/:username'
        render={match => (
          <ProjectList
            {...match}
            // necesito encontrar esto
            // setPath={setPath}
            setActiveProject={setActiveProject}
            deleteProject={deleteProject}
            setUser={setLoggedUser}
          />
        )}
      />

      <PrivateRoute
        exact
        path='/project/new'
        user={user}
        component={NewProject}
        toggleMenu={toggleMenu}
        createProject={createProject}
        menuIsOpen={menuIsOpen}
      />

      <PrivateRoute
        exact
        path='/project/:id/edit'
        user={user}
        toggleMenu={toggleMenu}
        menuIsOpen={menuIsOpen}
        colorPalette={colorPalette}
        typeset={typeset}
        assets={assets}
        textstyles={textstyles}
        projectTitle={projectTitle}
        shareMessage={shareMessage}
        component={EditProject}
      />

      <PrivateRoute
        exact
        path='/project/:id/edit/colorPalette'
        user={user}
        toggleMenu={toggleMenu}
        menuIsOpen={menuIsOpen}
        colorPalette={colorPalette}
        deleteColor={deleteColor}
        typeset={typeset}
        assets={assets}
        textstyles={textstyles}
        component={ColorPalette}
      />

      <PrivateRoute
        exact
        path='/project/:id/edit/colorPalette/new/:colorId?'
        user={user}
        toggleMenu={toggleMenu}
        menuIsOpen={menuIsOpen}
        colorPalette={colorPalette}
        addColorToPalette={addColorToPalette}
        typeset={typeset}
        assets={assets}
        textstyles={textstyles}
        component={NewColor}
      />

      <PrivateRoute
        exact
        path='/project/:id/edit/typeset'
        user={user}
        toggleMenu={toggleMenu}
        menuIsOpen={menuIsOpen}
        colorPalette={colorPalette}
        deleteType={deleteType}
        assets={assets}
        typeset={typeset}
        textstyles={textstyles}
        component={TypeSet}
      />

      <PrivateRoute
        exact
        path='/project/:id/edit/typeset/new/:source?'
        user={user}
        toggleMenu={toggleMenu}
        colorPalette={colorPalette}
        menuIsOpen={menuIsOpen}
        typeset={typeset}
        saveType={saveType}
        assets={assets}
        textstyles={textstyles}
        component={NewType}
      />

      <PrivateRoute
        exact
        path='/project/:id/edit/assets'
        user={user}
        toggleMenu={toggleMenu}
        menuIsOpen={menuIsOpen}
        colorPalette={colorPalette}
        typeset={typeset}
        assets={assets}
        addAsset={addAsset}
        deleteAsset={deleteAsset}
        onDragStart={onDragStart}
        onDrop={onDrop}
        file={file}
        textstyles={textstyles}
        component={Assets}
      />

      <PrivateRoute
        exact
        path='/project/:id/edit/textStyles'
        user={user}
        toggleMenu={toggleMenu}
        menuIsOpen={menuIsOpen}
        colorPalette={colorPalette}
        typeset={typeset}
        assets={assets}
        textstyles={textstyles}
        component={TextStyles}
      />

      <PrivateRoute
        exact
        path='/project/:id/edit/textStyles/new/:styleId?'
        user={user}
        toggleMenu={toggleMenu}
        menuIsOpen={menuIsOpen}
        colorPalette={colorPalette}
        typeset={typeset}
        assets={assets}
        textstyles={textstyles}
        addTextStyle={addTextStyle}
        component={NewTextStyle}
      />
    </Switch>
  )}

  {!user && (
    <Switch>
      <Route
        exact
        path='/login'
        render={match => <Login {...match} setUser={setLoggedUser} />}
      />
      <Route
        exact
        path='/signup'
        render={match => <Signup {...match} setUser={setLoggedUser} />}
      />
      <Route exact path='/' component={LandingPage} />

      <Route
        exact
        path='/project/:id'
        user={user}
        colorPalette={colorPalette}
        typeset={typeset}
        assets={assets}
        textstyles={textstyles}
        projectTitle={projectTitle}
        component={ReadProject}
      />
    </Switch>
  )}
</>
</div>
  )
}

export default App
