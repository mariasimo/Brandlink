import React, { Component } from 'react';

export default class MainContent extends Component {
  render() {
    return (
      <div className={`section main-content ${this.props.menuIsOpen}`}
        style={{ backgroundColor: 'grey' }}
      >
          {this.props.children}
      </div>
    );
  }
}
