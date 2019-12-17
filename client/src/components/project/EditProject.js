import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BrandHeader from '../layout/BrandHeader';
import SideMenu from '../layout/SideMenu';
import ProjectService from "../../services/ProjectService";
import MainContent from '../layout/MainContent';

export default class EditProject extends Component {
  constructor(props) {
    super(props);
    this.projectService = new ProjectService();
    this.state = {
      path: "",
      title: ""
    };
  }

  // fetchOneProject = () => {
  //   const path = this.props.match.params.path;
  //   this.projectService.fetchOneProject(path).then(project => {
  //     this.setState({
  //       ...this.state,
  //       ...project
  //     });
  //   });
  // };

  componentDidMount(){
    // this.fetchOneProject();
  }

  render() {
    return (
      < >
      <SideMenu
      toggleMenu={this.props.toggleMenu}
      menuIsOpen={this.props.menuIsOpen}
      >   
        <BrandHeader
          title={this.state.title}
          subtitle='Brand presets'
          {...this.props}
          url={`/panel/${this.props.loggedInUser}`}
        ></BrandHeader>

        <p>Let's begin! Start by adding some brand presets to your project</p>

        <ul className='project-presets-list'>
          <li>
            <Link to={`${this.props.location.pathname}/typeset`}>
              <h3 className='is-size-5 has-text-primary'>Typography</h3>
            </Link>
          </li>
          <li>
            <Link to={`${this.props.location.pathname}/textStyles`}>
              <h3 className='is-size-5 has-text-primary'>Text Styles</h3>
            </Link>
          </li>
          <li>
            <Link to={`${this.props.location.pathname}/colorPalette`}>
              <h3 className='is-size-5 has-text-primary'>Color Palette</h3>
            </Link>
          </li>
          <li>
            <Link to={`${this.props.location.pathname}/assets`}>
              <h3 className='is-size-5 has-text-primary'>Assets</h3>
            </Link>
          </li>
        </ul>
      </SideMenu>
      <MainContent
          toggleMenu={this.props.toggleMenu}
          menuIsOpen={this.props.menuIsOpen}
          path={this.props.match.params.path}
          user={this.props.loggedInUser}
        >
          
        </MainContent>
        </ >
    );
  }
}
