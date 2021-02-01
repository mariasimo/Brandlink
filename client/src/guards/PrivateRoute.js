import React from "react";
import { Route, Redirect, useRouteMatch } from "react-router-dom";
import { useUserState } from "../context/UserContext";

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const { user } = useUserState();
//   let { path, url } = useRouteMatch();

//   console.log(path, url, Component, rest);

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         return user?.id ? (
//           <Component {...props} {...rest} />
//         ) : (
//           <Redirect to={rest.redirectPath} />
//         );
//       }}
//     />
//   );
// };

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useUserState();
  const isAuthenticated = user?.id;
  if (isAuthenticated) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }

  return <Redirect to={rest.redirectPath} />;
};

export default PrivateRoute;
