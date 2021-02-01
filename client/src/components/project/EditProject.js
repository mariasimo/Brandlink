import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import BrandHeader from "../layout/BrandHeader";
import SideMenu from "../layout/SideMenu";
import MainContent from "../layout/MainContent";
import { useProjectsState } from "../../context/ProjectContext";
import PrivateRoute from "../../guards/PrivateRoute";
import ColorPalette from "../brandPresets/ColorPalette";
import TypeSet from "../brandPresets/TypeSet";
import TextStyles from "../brandPresets/TextStyles";
import Assets from "../brandPresets/Assets";

const EditProject = ({ toggleMenu, menuIsOpen, username, ...props }) => {
  const { currentProject } = useProjectsState();
  const {
    colorPalette,
    typeset,
    assets,
    id,
    title,
    path: projectPath,
  } = currentProject;
  let { path, url } = useRouteMatch();

  console.log(path, url);
  return (
    <div>
      <SideMenu
        toggleMenu={toggleMenu}
        menuIsOpen={menuIsOpen}
        projectId={id}
        // shareMessage={shareMessage}
        permissionToShare
      >
        <BrandHeader title={title} subtitle="Brand presets" url={url} />
        <Switch>
          <Route exact path={path}>
            <p>
              Let's begin! Start by adding some brand presets to your project
            </p>

            <ul className="project-presets-list">
              <li>
                <Link to={`${url}/typography`}>
                  <h3 className="is-size-5 has-text-primary">Typography</h3>
                </Link>
              </li>
              <li>
                <Link to={`${url}/text-styles`}>
                  <h3 className="is-size-5 has-text-primary">Text Styles</h3>
                </Link>
              </li>
              <li>
                <Link to={`${url}/color-palette`}>
                  <h3 className="is-size-5 has-text-primary">Color Palette</h3>
                </Link>
              </li>
              <li>
                <Link to={`${url}/assets`}>
                  <h3 className="is-size-5 has-text-primary">Assets</h3>
                </Link>
              </li>
            </ul>
          </Route>

          <PrivateRoute
            exact
            path={`${path}/color-palette`}
            component={ColorPalette}
          />
          <PrivateRoute exact path={`${path}/typography`} component={TypeSet} />
          <PrivateRoute
            exact
            path={`${path}/text-styles`}
            component={TextStyles}
          />
          <PrivateRoute exact path={`${path}/assets`} component={Assets} />
        </Switch>
      </SideMenu>
      <MainContent
        toggleMenu={toggleMenu}
        menuIsOpen={menuIsOpen}
        colorPalette={colorPalette}
        typeset={typeset}
        // user={user}
        assets={assets}
        permissionToEdit
        {...props}
      ></MainContent>
    </div>
  );
};

export default EditProject;
