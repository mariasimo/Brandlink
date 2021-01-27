import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuthContext();
  return (
    <Route
      render={(props) =>
        user.id ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={rest.redirectPath} />
        )
      }
    />
  );
};

export default PrivateRoute;
