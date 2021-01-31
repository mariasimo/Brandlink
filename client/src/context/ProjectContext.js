import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import useProjectsService from "../services/ProjectService";

const ProjectState = createContext();
const ProjectDispatch = createContext();

const FETCH_CURRENT_PROJECT = "FETCH_CURRENT_PROJECT";
const FETCH_ALL_USER_PROJECTS = "FETCH_ALL_USER_PROJECTS";
const LOADING = "LOADING";
const ERROR = "ERROR";

const initialState = {
  projects: [],
  currentProject: null,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  console.log(state, action);
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
  if (action.type === FETCH_ALL_USER_PROJECTS) {
    return {
      ...state,
      projects: action.payload.projects,
      loading: false,
      error: null,
    };
  }

  return state;
};

const useAsyncReducer = (reducer, initState) => {
  const [state, dispatch] = useReducer(reducer, initState);

  console.log(state);
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
  const { dispatch, fetchProjectsMiddleware } = useContext(ProjectDispatch);
  if (!dispatch) throw new Error(`seems your using this hook out of context`);

  const fetchCurrentProject = useCallback(
    (projectId) => {
      dispatch({ type: FETCH_CURRENT_PROJECT, payload: projectId });
    },
    [dispatch]
  );

  const fetchProjects = useCallback(() => dispatch(fetchProjectsMiddleware), [
    dispatch,
    fetchProjectsMiddleware,
  ]);

  return { fetchCurrentProject, fetchProjects };
};

export { ProjectProvider, useProjectsState, useProjectsActions };
