import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  render() {
    const user = this.props.user;

    return (
      <nav className="navbar">
        <div className="navbar-brand">
          {!user && (
            <Link to="/" className="navbar-item">
            <img
              src="../../../logo.svg"
              height="24"
              alt="BrandLink"
            ></img>
          </Link>
          )}

          {user && (
            <Link to={`/panel/${user.username}`} className="navbar-item">
            <img
              src="../../../logo.svg"
              height="24"
              alt="BrandLink"
            ></img>
          </Link>
          )}
        </div>
        
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {!user && (
                <React.Fragment>
                  <Link to="/signup" className="button is-rounded">
                    Signup
                  </Link>
                  <Link to="/login" className="button is-rounded">
                    Login
                  </Link>
                </React.Fragment>
              )}
              {user && (
                <React.Fragment>
                   <Link to={`/panel/${user.username}`} className="navbar-item">
                    Admin Panel
                  </Link>

                  <Link to={`/profile/${user.id}`} className="navbar-item">
                    Hi, {user.username}
                  </Link>

                  <Link to="/" onClick={(e) => this.props.logout(e)} className="button is-rounded">
                    Logout
                  </Link>
                  
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
