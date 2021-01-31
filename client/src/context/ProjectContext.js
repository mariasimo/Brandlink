import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";

const ProjectState = createContext();
const ProjectDispatch = createContext();

const FETCH_CURRENT_PROJECT = "FETCH_CURRENT_PROJECT";
const initialState = {};

const reducer = (project = initialState, actions) => {
  // FETCH_CURRENT_PROJECT --> manage async with thunks
  // we must use the project Service
  return project;
};

const ProjectProvider = ({ children }) => {
  const [project, dispatch] = useReducer(reducer, initialState);
  return (
    <ProjectState.Provider value={{ project }}>
      <ProjectDispatch.Provider value={{ dispatch }}>
        {children}
      </ProjectDispatch.Provider>
    </ProjectState.Provider>
  );
};

const useProjectState = () => {
  const { project } = useContext(ProjectState);

  if (!project) throw new Error(`seems your using this hook out of context`);

  return project;
};

const useProjectDispatch = () => {
  const { dispatch } = useContext(ProjectDispatch);
  if (!dispatch) throw new Error(`seems your using this hook out of context`);

  const fetchCurrentProject = useCallback(
    (projectId) => {
      dispatch({ type: FETCH_CURRENT_PROJECT, payload: projectId });
    },
    [dispatch]
  );

  return { fetchCurrentProject };
};

export { ProjectProvider, useProjectState, useProjectDispatch };
