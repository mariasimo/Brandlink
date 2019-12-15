import React, { Component } from "react";

export default class SideMenu extends Component {

    render() {
        return (
      <section className={`section side-menu ${this.props.menuIsOpen}`}>
            <button className="btn-side-menu remove-btn" onClick={this.props.toggleMenu}>
              <img src={`${process.env.REACT_APP_URL}/menu.svg`}></img>
            </button>

            {this.props.children}
      </section>
    );
  }
}
