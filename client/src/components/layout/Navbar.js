import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import AuthService from "../../services/AuthService";

const authService = new AuthService();

const Navbar = () => {
  const { user, logoutUser } = useAuthContext();

  const logout = () => {
    authService
      .logout()
      .then((_) => logoutUser())
      .catch((err) => console.log(err));
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img
            src={`${process.env.REACT_APP_URL}/logo.svg`}
            height="24"
            alt="BrandLink"
          ></img>
        </Link>
      </div>

      <div id="navbarBasicExample" className="navbar-menu is-active">
        <div className="navbar-start">
          {user && (
            <Link
              to={`/panel/${user.username}`}
              className="back-projects-link navbar-item"
            >
              <img
                src={`${process.env.REACT_APP_URL}/back.svg`}
                alt="go back"
              ></img>
              <span>Back to projects</span>
            </Link>
          )}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {!user.id && (
                <React.Fragment>
                  <Link
                    to="/signup"
                    className="button is-rounded is-primary is-outlined"
                  >
                    Signup
                  </Link>
                  <Link
                    to="/login"
                    className="button is-rounded is-primary is-outlined"
                  >
                    Login
                  </Link>
                </React.Fragment>
              )}
              {user.id && (
                <React.Fragment>
                  <Link to={`/panel/${user.username}`} className="navbar-item">
                    Admin Panel
                  </Link>

                  <Link to={`/profile/${user.id}`} className="navbar-item">
                    <div
                      className="is-rounded profile-picture"
                      style={{ backgroundImage: `url(${user.picture})` }}
                    ></div>
                    Hi, {user.username}
                  </Link>

                  <Link
                    to="/"
                    onClick={logout}
                    className="button is-rounded is-danger is-outlined"
                  >
                    Logout
                  </Link>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// export default class Navbar extends Component {
//   constructor(props) {
//     super(props);
//     this.authService = new AuthService();
//   }

//   render() {
//     const user = this.props.user;

//     return (
// <nav className='navbar' role='navigation' aria-label='main navigation'>

//   <div className='navbar-brand'>
//       <Link to='/' className='navbar-item'>
//         <img
//         src={`${process.env.REACT_APP_URL}/logo.svg`}
//         height='24'
//           alt='BrandLink'
//         ></img>
//       </Link>
//   </div>

//   <div id='navbarBasicExample' className='navbar-menu is-active'>
//     <div className='navbar-start'>
//       {user &&
//         <Link to={`/panel/${user.username}`} className='back-projects-link navbar-item'>
//           <img src={`${process.env.REACT_APP_URL}/back.svg`} alt="go back"></img>
//           <span>Back to projects</span>
//         </Link>
//       }
//     </div>

//     <div className='navbar-end'>
//       <div className='navbar-item'>
//         <div className='buttons'>
//           {!user && (
//             <React.Fragment>
//               <Link to='/signup' className='button is-rounded is-primary is-outlined'>
//                 Signup
//               </Link>
//               <Link to='/login' className='button is-rounded is-primary is-outlined'>
//                 Login
//               </Link>
//             </React.Fragment>
//           )}
//           {user && (
//             <React.Fragment>
//               <Link
//                 to={`/panel/${user.username}`}
//                 className='navbar-item'
//               >
//                 Admin Panel
//               </Link>

//               <Link to={`/profile/${user.id}`} className='navbar-item'>
//                 <div
//                   className='is-rounded profile-picture'
//                   style={{ backgroundImage: `url(${user.picture})` }}
//                 ></div>
//                 Hi, {user.username}
//               </Link>

//               <Link
//                 to='/'
//                 onClick={e => this.props.logout()}
//                 className='button is-rounded is-danger is-outlined'
//               >
//                 Logout
//               </Link>
//             </React.Fragment>
//           )}
//         </div>
//       </div>
//     </div>
//   </div>
// </nav>
//     );
//   }
// }
