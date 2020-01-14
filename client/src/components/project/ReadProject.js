import React, { Component } from 'react';
import MainContent from '../layout/MainContent';

export default class EditProject extends Component {

  render() {
    const { colorPalette, typeset, assets} = this.props;
    console.log(this.state, this.props)
    return (
      < >
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
