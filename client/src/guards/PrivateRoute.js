import React from 'react';
import { Route, Redirect } from 'react-router-dom';
export default function PrivateRoute({
  component: Component,
  user,
  activeProject,
  colorPalette,
  typeset,
  toggleMenu,
  menuIsOpen,
  addFontLinks,
  redirectPath,
  addColorToPalette,
  saveType,
  deleteColor,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props => {
        {
          if (user) {
            return (
              <Component
                loggedInUser={user}
                activeProject={activeProject}
                toggleMenu={toggleMenu}
                menuIsOpen={menuIsOpen}
                colorPalette={colorPalette}
                typeset={typeset}
                addColorToPalette={addColorToPalette}
                deleteColor={deleteColor}
                saveType={saveType}
                {...props}
              />
            );
          } else {
            return <Redirect to={{ pathname: redirectPath }} />;
          }
        }
      }}
    />
  );
}
