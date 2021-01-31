import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUserState } from "../context/UserContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useUserState();
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
