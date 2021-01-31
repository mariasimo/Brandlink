import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import useProjectsService from "../services/ProjectService";

const ProjectState = createContext();
const ProjectDispatch = createContext();

const SET_CURRENT_PROJECT = "SET_CURRENT_PROJECT";
const FETCH_ALL_USER_PROJECTS = "FETCH_ALL_USER_PROJECTS";
const LOADING = "LOADING";
const ERROR = "ERROR";

const storedCurrentProject = JSON.parse(localStorage.getItem("currentProject"));

const initialState = {
  projects: [],
  currentProject: storedCurrentProject || null,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  if (action.type === LOADING) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }
  if (action.type === ERROR) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
    };
  }
  if (action.type === FETCH_ALL_USER_PROJECTS) {
    return {
      ...state,
      projects: action.payload.projects,
      loading: false,
      error: null,
    };
  }
  if (action.type === SET_CURRENT_PROJECT) {
    const currentProject = state.projects.find(
      (el) => el.id === action.payload
    );
    return {
      ...state,
      currentProject,
      loading: false,
      error: null,
    };
  }

  return state;
};

const useAsyncReducer = (reducer, initState) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const asyncDispatch = useCallback(
    (action) => {
      if (typeof action === "function") {
        action(dispatch);
      } else {
        dispatch(action);
      }
    },
    [dispatch]
  );

  return [state, asyncDispatch];
};

const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useAsyncReducer(reducer, initialState);
  const asyncMiddlewares = useProjectsService(state, dispatch);

  const { currentProject } = state;

  useEffect(() => {
    if (currentProject?.id) {
      localStorage.setItem("currentProject", JSON.stringify(currentProject));
    }
  }, [currentProject]);

  return (
    <ProjectState.Provider value={{ state }}>
      <ProjectDispatch.Provider value={{ dispatch, ...asyncMiddlewares }}>
        {children}
      </ProjectDispatch.Provider>
    </ProjectState.Provider>
  );
};

const useProjectsState = () => {
  const { state } = useContext(ProjectState);
  if (!state) throw new Error(`seems your using this hook out of context`);
  return state;
};

const useProjectsActions = () => {
  const {
    dispatch,
    fetchProjectsMiddleware,
    deleteProjectMiddleware,
  } = useContext(ProjectDispatch);

  if (!dispatch) throw new Error(`seems your using this hook out of context`);

  const setCurrentProject = useCallback(
    (projectId) => {
      dispatch({ type: SET_CURRENT_PROJECT, payload: projectId });
    },
    [dispatch]
  );

  const deleteProject = useCallback(
    (projectId) => dispatch(() => deleteProjectMiddleware(projectId)),
    [dispatch, deleteProjectMiddleware]
  );

  const fetchProjects = useCallback(() => dispatch(fetchProjectsMiddleware), [
    dispatch,
    fetchProjectsMiddleware,
  ]);

  return {
    fetchProjects,
    deleteProject,
    setCurrentProject,
  };
};

export { ProjectProvider, useProjectsState, useProjectsActions };
