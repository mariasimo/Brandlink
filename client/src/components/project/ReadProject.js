import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BrandHeader from '../layout/BrandHeader';
import SideMenu from '../layout/SideMenu';
// import ProjectService from "../../services/ProjectService";
import MainContent from '../layout/MainContent';

export default class EditProject extends Component {

  render() {
    const { colorPalette, typeset, assets} = this.props;
    console.log(this.state, this.props)
    return (
      < >
      hols
      <MainContent 
          {...this.props}
          toggleMenu={this.props.toggleMenu}
          menuIsOpen={this.props.menuIsOpen}
          colorPalette={colorPalette}
          typeset={typeset}
          user={this.props.loggedInUser}
          assets={assets}
        >
          
        </MainContent>
    </ >
    );
  }
}
