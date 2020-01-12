import React from 'react';
import AuthService from '../../../services/AuthService';
import Hero from '../../layout/Hero';
// import { Link } from 'react-router-dom';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      picture: '',
      projects: []
    };
    this.authService = new AuthService();
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleLogin = e => {
    e.preventDefault();

    const { history, setUser } = this.props;
    this.authService.login(this.state).then(
      user => {
        if (user !== undefined) {
          setUser(user);

          // todo This should redirect me to the admin panel
          history.push(`/panel/${user.username}`);
        }
      },
      error => {
        console.error(error);
      }
    );
  };

  render() {
    const { username, password } = this.state;
    return (
      <section className='section auth-section landing'>
        <div className='container columns'>
        <div className='column is-one-third'>
          <Hero></Hero>
        </div>


          <div className='column is-two-third form-container'>
            <h3 className='title'>Login</h3>
            <form onSubmit={this.handleLogin}>
              <div className='field'>
                <label className='label' htmlFor='username'>
                  Username:
                </label>
                <div className='control'>
                  <input
                    className='input'
                    type='text'
                    name='username'
                    id='username'
                    value={username}
                    onChange={this.handleChange}
                    placeholder="Username"
                  />
                </div>
              </div>
              <div className='field'>
                <label htmlFor='password' className='label'>
                  Password:
                </label>
                <div className='control'>
                  <input
                    className='input'
                    type='password'
                    name='password'
                    id='password'
                    placeholder="Password"
                    value={password}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className='control'>
                <input
                  type='submit'
                  className='button is-link is-rounded'
                  value='Log in'
                ></input>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
