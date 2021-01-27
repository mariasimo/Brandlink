import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import AuthService from "../../services/AuthService";

const authService = new AuthService();

const Navbar = () => {
  const { user } = useAuthContext();
  console.log(user);

  return (
    <header className="header">
      <Link to="/" className="logo">
        <img
          src={`${process.env.REACT_APP_URL}/logo.svg`}
          height="24"
          alt="BrandLink Logo"
        ></img>
      </Link>

      <nav className="menu" role="navigation" aria-label="main navigation">
        {!user.id && <LoggedOutNav {...user} />}
        {user.id && <LoggedInNav {...user} />}
      </nav>
    </header>
  );
};

const LoggedOutNav = ({ username }) => {
  return (
    <ul>
      <li>
        <Link to={`/panel/${username}`} className="projects-link">
          <img
            src={`${process.env.REACT_APP_URL}/back.svg`}
            alt="go back"
          ></img>
          <span>Back to projects</span>
        </Link>
      </li>
      <li>
        <Link to="/signup" className="btn">
          Signup
        </Link>
      </li>
      <li>
        <Link to="/login" className="btn">
          Login
        </Link>
      </li>
    </ul>
  );
};

const LoggedInNav = ({ id, username, picture }) => {
  const { logoutUser } = useAuthContext();
  const fallbackPicture = "https://i.stack.imgur.com/l60Hf.png";

  const logout = () => {
    authService
      .logout()
      .then((_) => logoutUser())
      .catch((err) => console.log(err));
  };

  return (
    <ul>
      <li>
        <Link to={`/panel/${username}`}>Admin Panel</Link>
      </li>

      <li>
        <Link to={`/profile/${id}`} className="profile">
          <div
            style={{ backgroundImage: `url(${picture || fallbackPicture})` }}
            className="avatar"
          ></div>
          Hi, {username}
        </Link>
      </li>

      <li>
        <Link to="/" onClick={logout} className="btn">
          Logout
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
