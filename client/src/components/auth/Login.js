import React, { useEffect } from "react";
import { useUserActions, useUserState } from "../../context/UserContext";
import useSetState from "../../hooks/useSetState";
import Hero from "../layout/Hero";
import { useHistory } from "react-router-dom";

const initialState = {
  username: "",
  password: "",
};

const Login = () => {
  const [credentials, setCredentials] = useSetState(initialState);
  const { username, password } = credentials;
  const { logInUser } = useUserActions();
  const { user, loading, error } = useUserState();
  const history = useHistory();

  useEffect(() => {
    if (user?.username) history.push(`/panel/${user.username}`);
  }, [user, history]);

  const handleLogin = (e) => {
    e.preventDefault();
    clear();
    logInUser(credentials);
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
          <h3 className="title">Login</h3>
          <form onSubmit={handleLogin}>
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
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="control">
              <input
                type="submit"
                className="button is-link is-rounded"
                value="Log in"
              ></input>
            </div>
            {error && error}
            {loading && "loading"}
            {user && user.username}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
