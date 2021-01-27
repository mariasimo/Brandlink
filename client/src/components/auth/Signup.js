import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useSetState from "../../hooks/useSetState";
import AuthService from "../../services/AuthService";
import Hero from "../layout/Hero";

const authService = new AuthService();

const initialState = {
  username: "",
  password: "",
};
const Signup = ({ history }) => {
  const [credentials, setCredentials] = useSetState(initialState);
  const { username, password } = credentials;
  const { setAuthUser } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    clear();

    authService.signup(credentials).then(
      (user) => {
        setAuthUser(user);
        history.push(`/panel/${user.username}`);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const handleChange = (e) => {
    setCredentials({ [e.target.name]: e.target.value });
  };

  const clear = () => {
    setCredentials(initialState);
  };

  return (
    <section className="section auth-section landing">
      <div className="container columns">
        <div className="column is-one-third">
          <Hero></Hero>
        </div>

        <div className="column is-two-third form-container">
          <h3 className="title">Signup</h3>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label" htmlFor="username">
                Username:
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={handleChange}
                  placeholder="Username"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="password" className="label">
                Password:
              </label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </div>
            </div>

            <div className="control">
              <input
                type="submit"
                className="button is-link"
                value="Create account"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
