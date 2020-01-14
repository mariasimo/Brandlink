import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class SideMenu extends Component {

  handleSubmit = e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const projectId = document.getElementById('projectid').value;

    console.log(email, projectId)
    this.props.shareMessage({email, projectId})
  };


    render() {

      const projectId = this.props.projectId;
      // const {user} = this.props
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
            
            <form id='contact-form' onSubmit={this.handleSubmit} method='POST'>
              <label htmlFor='exampleInputEmail1'>Email address</label>
              <input type='email' id='email' aria-describedby='emailHelp'/>
              <input type="hidden" name="projectid" id="projectid" value={projectId}/>
              <button type='submit' className='button is-rounded is-danger is-outlined'>Share </button>
            </form>
      </section>
    );
  }
}
