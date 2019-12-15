import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProjectService from '../../services/ProjectService';
import BrandHeader from '../layout/BrandHeader';
import SideMenu from '../layout/SideMenu';

export default class TypeSet extends Component {
  constructor(props) {
    super(props);
    this.projectService = new ProjectService();
    this.state = {
      path: '',
      title: '',
      typeset: null
    };
  }

  fetchOneProject = () => {
    const path = this.props.match.params.path;
    this.projectService.fetchOneProject(path).then(project => {
      this.setState({
        ...this.state,
        ...project
      });
    });
  };

  deleteType = typeId => {
    console.log('Delete method in component typeset' + typeId);
    this.projectService.deleteType(typeId).then(
      project => {
        console.log(project);
        this.fetchOneProject(project.path);
      },
      error => {
        const { message } = error;
        console.error(message);
      }
    );
  };

  componentDidMount() {
    this.fetchOneProject();
  }

  render() {
    const { path } = this.props.match.params;
    const { typeset } = this.state;

    console.log(typeset)

    return (
      <SideMenu
        toggleMenu={this.props.toggleMenu}
        menuIsOpen={this.props.menuIsOpen}
      >
      <BrandHeader
        title='Typography set'
        {...this.props}
        url={`/project/${path}/edit`}
      ></BrandHeader>

          <div className='type-set'>
            <div className="content">
            {typeset &&
              typeset.map(font => (
                <div className='box' key={font._id}>
                    <span style={{ fontFamily: font.fontFamily }}>
                      {font.fontFamily}
                    </span>
                    <button
                      onClick={() => this.deleteType(font._id)}
                      className='button is-rounded is-small is-danger is-outlined'
                    >
                      Delete
                    </button>                    
                </div>
              ))}
            {!typeset || !typeset.length && 
              <div>You dont have any fonts yet. Add your first font now.</div>
            }

            </div>

            <div className='field fonts-buttons is-group'>
            <div className='google-fonts-button control'>
              <Link
                to={`/project/${path}/edit/typeSet/new/google-font?`}
                className='button is-link'
              >
                Add Google Font
              </Link>
            </div>

            <div className='adobe-fonts-button control'>
              <Link
                to={`/project/${path}/edit/typeSet/new/adobe-font?`}
                className='button is-link'
              >
                Add Adobe Font
              </Link>
            </div>
          </div>
          </div>

          
      </SideMenu>
    );
  }
}
