import React from "react";
import { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuthContext();
  return (
    <Route
      render={(props) =>
        user.id ? <Component {...props} {...rest} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;

// export default function PrivateRoute({
//   component: Component,
//   // user,
//   // activeProject,
//   // colorPalette,
//   // typeset,
//   // toggleMenu,
//   // menuIsOpen,
//   // addFontLinks,
//   // redirectPath,
//   // addColorToPalette,
//   // saveType,
//   // deleteColor,
//   // deleteType,
//   // assets,
//   // addAsset,
//   // onDragStart,
//   // onDrop,
//   // deleteAsset,
//   // setActiveProject,
//   // textstyles,
//   // addTextStyle,
//   // projectTitle,
//   // createProject,
//   // shareMessage,
//   ...rest
// }) {
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         console.log(props);
//         if (
//           //user
//           true
//         ) {
//           return (
//             <Component
//               // loggedInUser={user}
//               // activeProject={activeProject}
//               // toggleMenu={toggleMenu}
//               // menuIsOpen={menuIsOpen}
//               // colorPalette={colorPalette}
//               // typeset={typeset}
//               // addColorToPalette={addColorToPalette}
//               // deleteColor={deleteColor}
//               // deleteType={deleteType}
//               // saveType={saveType}
//               // assets={assets}
//               // addAsset={addAsset}
//               // deleteAsset={deleteAsset}
//               // onDragStart={onDragStart}
//               // onDrop={onDrop}
//               // setActiveProject={setActiveProject}
//               // textstyles={textstyles}
//               // addTextStyle={addTextStyle}
//               // projectTitle = {projectTitle}
//               // createProject= {createProject}
//               // shareMessage={shareMessage}
//               {...rest}
//               {...props}
//             />
//           );
//         } else {
//           return <Redirect to="/" />;
//         }
//       }}
//     />
//   );
// }
