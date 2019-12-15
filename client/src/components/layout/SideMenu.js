import React, { Component } from "react";

export default class SideMenu extends Component {

    render() {
        return (
      <section className={`section side-menu ${this.props.menuIsOpen}`}>
        <div className="columns">
          <div className="column">
            <div className="btn-side-menu" onClick={this.props.toggleMenu}>
              <img src={`${process.env.REACT_APP_URL}/menu.svg`}></img>
            </div>

            {this.props.children}
          </div>
        </div>
      </section>
    );
  }
}
