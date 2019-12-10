import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  logout = () => {
    this.authService
      .logout()
      .then(payload => {
        console.log(payload);
      })
      .catch(err => console.log(err));
  };

  render() {
    const user = this.props.user;

    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <img
              src="../../../logo.svg"
              height="24"
              alt="BrandLink"
            ></img>
          </Link>
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
                  <Link to="/profile" className="navbar-item">
                    Hi, {user.username}
                  </Link>
                  <Link to="/" onClick={this.logout} className="button is-rounded">
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
