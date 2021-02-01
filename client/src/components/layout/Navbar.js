import React from "react";
import { Link } from "react-router-dom";
import { useUserActions, useUserState } from "../../context/UserContext";
import { hyphenString } from "../../utils";

const Navbar = () => {
  const { user } = useUserState();

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
        {!user?.id && <LoggedOutNav {...user} />}
        {user?.id && <LoggedInNav {...user} />}
      </nav>
    </header>
  );
};

const LoggedOutNav = ({ username }) => {
  return (
    <ul>
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
  const { logOutUser } = useUserActions();
  const fallbackPicture = "https://i.stack.imgur.com/l60Hf.png";

  return (
    <ul>
      <li>
        <Link to={`/panel/${hyphenString(username)}`}>Admin Panel</Link>
      </li>

      <li>
        <Link to={`/profile/${hyphenString(username)}`} className="profile">
          <div
            style={{ backgroundImage: `url(${picture || fallbackPicture})` }}
            className="avatar"
          ></div>
          Hi, {username}
        </Link>
      </li>

      <li>
        <Link to="/" onClick={logOutUser} className="btn">
          Logout
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
