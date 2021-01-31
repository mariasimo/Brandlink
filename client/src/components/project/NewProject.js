import React, { useEffect, useState } from "react";
import SideMenu from "../layout/SideMenu";
import BrandHeader from "../layout/BrandHeader";
import useSetState from "../../hooks/useSetState";
import { useUserActions, useUserState } from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import { hyphenString } from "../../utils";

const initialState = {
  title: "",
  path: "",
};

const NewProject = ({ username, toggleMenu, menuIsOpen }) => {
  const [newProject, setNewProject] = useSetState(initialState);
  const { addNewProjectToUser } = useUserActions();
  const {
    user: { projects },
    loading,
    error,
  } = useUserState();
  const [numberOfProjects, setNumberOfProjects] = useState();
  const history = useHistory();

  useEffect(() => setNumberOfProjects(projects.length), []);
  useEffect(() => {
    if (projects.length > numberOfProjects && !error) {
      history.push(`/panel/${username}`);
    }
  }, [numberOfProjects, projects.length, error, history, username]);

  const handleBlur = (e) => {
    let pathSuggestion = hyphenString(e.target.value);
    setNewProject({ ...setNewProject, path: pathSuggestion });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewProjectToUser(newProject);
  };

  const { title, path } = newProject;

  return (
    <div class="new-project-section">
      <SideMenu toggleMenu={toggleMenu} menuIsOpen={menuIsOpen}>
        <BrandHeader title="New Project" url={`/panel/${username}`} />

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="title" className="label">
              Title:
            </label>
            <div className="control">
              <input
                type="text"
                name="title"
                className="input"
                value={title}
                placeholder="Introduce the title for your project"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="path" className="label">
              Path:
            </label>
            <div className="control">
              <input
                type="text"
                name="path"
                className="input"
                value={path}
                placeholder="Introduce the url for your project"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="control">
            <input
              type="submit"
              className="button is-link is-rounded"
              value="Start project"
            ></input>
          </div>
          {error && error}
          {loading && "loading"}
        </form>
      </SideMenu>

      <div
        className={`main-content section ${menuIsOpen} new-project-main is-paddingless`}
      >
        <section className="section rows-container is-paddingless	">
          <img src="/new-project.png" alt="New Project" />
        </section>
      </div>
    </div>
  );
};

export default NewProject;
