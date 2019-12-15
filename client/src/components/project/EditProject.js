import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BrandHeader from '../layout/BrandHeader';
import SideMenu from '../layout/SideMenu';

// import ProjectService from "../../services/ProjectService";

export default class EditProject extends Component {
  render() {
    // this.props.addFontsLinks
    // Get path of project on edit from query string
    console.log(this.props);

    return (
      <SideMenu
      toggleMenu={this.props.toggleMenu}
      menuIsOpen={this.props.menuIsOpen}
    >        <BrandHeader
          title='Name of Project'
          subtitle='Brand presets'
          {...this.props}
          url={`/panel/${this.props.loggedInUser}`}
        ></BrandHeader>

        <ul className='project-presets-list'>
          <li>
            <Link to={`${this.props.location.pathname}/typeset`}>
              <h3 className='title is-4 has-text-primary'>Typography</h3>
            </Link>
          </li>
          <li>
            <Link to={`${this.props.location.pathname}/textStyles`}>
              <h3 className='title is-4 has-text-primary'>Text Styles</h3>
            </Link>
          </li>
          <li>
            <Link to={`${this.props.location.pathname}/colorPalette`}>
              <h3 className='title is-4 has-text-primary'>Color Palette</h3>
            </Link>
          </li>
          <li>
            <Link to={`${this.props.location.pathname}/assets`}>
              <h3 className='title is-4 has-text-primary'>Assets</h3>
            </Link>
          </li>
        </ul>
      </SideMenu>
    );
  }
}
