import React, { Component } from 'react';
import MainContent from '../layout/MainContent';

export default class ReadProject extends Component {

  render() {
    const { colorPalette, typeset, assets} = this.props;
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
