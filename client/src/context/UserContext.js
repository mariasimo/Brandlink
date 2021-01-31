import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";

import useAuthService from "../services/AuthService";

const UserState = createContext();
const UserDispatch = createContext();

const LOADING = "LOADING";
const SET_USER = "SET_USER";
const ERROR = "ERROR";
const LOGOUT_USER = "LOGOUT_USER";

const storedUser = JSON.parse(localStorage.getItem("sessionUser"));
const initState = {
  user: storedUser || null,
  loading: false,
  error: null,
};

const reducer = (state = initState, action) => {
  if (action.type === LOADING) {
    return {
      user: state.user,
      loading: true,
      error: null,
    };
  }
  if (action.type === SET_USER) {
    return {
      user: action.payload.user,
      loading: false,
      error: null,
    };
  }
  if (action.type === ERROR) {
    return {
      user: state.user,
      loading: false,
      error: action.payload.error,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      user: null,
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

const UserProvider = ({ children }) => {
  const [state, dispatch] = useAsyncReducer(reducer, initState);
  const asyncMiddlewares = useAuthService(state, dispatch);
  const { user } = state;

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem("sessionUser", JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserState.Provider value={{ state }}>
      <UserDispatch.Provider value={{ dispatch, ...asyncMiddlewares }}>
        {children}
      </UserDispatch.Provider>
    </UserState.Provider>
  );
};

const useUserState = () => {
  const { state } = useContext(UserState);
  if (!state) throw new Error(`seems your using this hook out of context`);
  return state;
};

const useUserActions = () => {
  const {
    dispatch,
    logInMiddleware,
    signUpMiddleware,
    logOutMiddleware,
    addNewProjectMiddleware,
  } = useContext(UserDispatch);

  if (!dispatch) throw new Error(`seems your using this hook out of context`);

  const signUpUser = useCallback(
    (credentials) => dispatch(() => signUpMiddleware(credentials)),
    [dispatch, signUpMiddleware]
  );

  const logInUser = useCallback(
    (credentials) => dispatch(() => logInMiddleware(credentials)),
    [dispatch, logInMiddleware]
  );

  const logOutUser = useCallback(() => {
    dispatch(logOutMiddleware);
  }, [dispatch, logOutMiddleware]);

  const addNewProjectToUser = useCallback(
    (project) => dispatch(() => addNewProjectMiddleware(project)),
    [dispatch, addNewProjectMiddleware]
  );

  return { logInUser, signUpUser, logOutUser, addNewProjectToUser };
};

export { UserProvider, useUserState, useUserActions };
