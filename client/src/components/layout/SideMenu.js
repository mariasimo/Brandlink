import React, { Component } from "react";
import { Link } from 'react-router-dom';
import MyModal from "../utils/MyModal";

export default class SideMenu extends Component {

  handleSubmit = e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const projectId = this.props.match.params.id;
    this.props.shareMessage({email, projectId})
  };

    render() {
      const {permissionToShare} = this.props
        return (
      <section className={`section side-menu ${this.props.menuIsOpen}`}>
   
          <Link to='/' className='navbar-item'>
            <img
              src={`${process.env.REACT_APP_URL}/logo.png`}
              height='24'
              alt='BrandLink'
            ></img>
          </Link>

            <button className="btn-side-menu remove-btn" onClick={this.props.toggleMenu}>
              <img src={`${process.env.REACT_APP_URL}/menu.svg`} alt="Menu"></img>
            </button>

            {this.props.children}
            
            {permissionToShare && 
              <MyModal sendMessage={this.handleSubmit}></MyModal>
            }
      </section>
    );
  }
}
