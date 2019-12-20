import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class SideMenu extends Component {

    render() {
      const {user} = this.props
        return (
      <section className={`section side-menu ${this.props.menuIsOpen}`}>
   
          <Link to='/' className='navbar-item'>
            <img
              src={`${proccess.env.REACT_APP_URL}/logo.png`}
              height='24'
              alt='BrandLink'
            ></img>
          </Link>
        

            <button className="btn-side-menu remove-btn" onClick={this.props.toggleMenu}>
              <img src={`${process.env.REACT_APP_URL}/menu.svg`}></img>
            </button>

            {this.props.children}
      </section>
    );
  }
}
