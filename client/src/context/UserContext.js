import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";

import axios from "axios";

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
      user: null,
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
      user: null,
      loading: false,
      error: action.payload.error,
    };
  }
  if (action.type === LOGOUT_USER) {
    localStorage.removeItem("sessionUser");
    return initState;
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
  const { user } = state;

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem("sessionUser", JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserState.Provider value={{ state }}>
      <UserDispatch.Provider value={{ dispatch }}>
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
  const { dispatch } = useContext(UserDispatch);
  if (!dispatch) throw new Error(`seems your using this hook out of context`);

  const registerUser = useCallback(
    async (credentials) => {
      dispatch({ type: "LOADING" });

      try {
        const response = await axios
          .create({
            baseURL: `${process.env.REACT_APP_API_URL}`,
            withCredentials: true,
          })
          .post("/signup", credentials);
        dispatch({
          type: "SET_USER",
          payload: { user: response.data },
        });
      } catch (err) {
        dispatch({
          type: "ERROR",
          payload: { error: err.response.data.message },
        });
      }
    },
    [dispatch]
  );

  const fetchUser = useCallback(
    async (credentials) => {
      dispatch({ type: "LOADING" });

      try {
        const response = await axios
          .create({
            baseURL: `${process.env.REACT_APP_API_URL}`,
            withCredentials: true,
          })
          .post("/login", credentials);
        dispatch({
          type: "SET_USER",
          payload: { user: response.data },
        });
      } catch (err) {
        dispatch({
          type: "ERROR",
          payload: { error: err.response.data.message },
        });
      }
    },
    [dispatch]
  );

  const signUpUser = useCallback(
    (credentials) => dispatch(() => registerUser(credentials)),
    [dispatch, registerUser]
  );

  const logInUser = useCallback(
    (credentials) => dispatch(() => fetchUser(credentials)),
    [dispatch, fetchUser]
  );

  const logOutUser = useCallback(
    (_) => {
      dispatch({ type: LOGOUT_USER });
    },
    [dispatch]
  );

  // const setLoggedUser = (user) => {
  //   if (user === undefined || !user.hasOwnProperty("id")) return;
  //   setAuthUser(user);

  //   if (user.activeProject) {
  //     projectService.displayProject(user.id).then((projectData) => {
  //       // setProject({
  //       //   title: projectData.title,
  //       //   colorPalette: projectData.colorPalette || [],
  //       //   typeset: projectData.typeset,
  //       //   assets: projectData.assets,
  //       //   textstyles: projectData.textstyles,
  //       // });
  //       // addFontsLinks(projectData.typeset);
  //     });
  //   }
  // };

  // const setCurrentProject = useCallback(
  //   (projectId) => {
  //     dispatch({ type: "SET_ACTIVE_PROJECT", payload: projectId });
  //   },
  //   [dispatch]
  // );

  return { logInUser, signUpUser, logOutUser };
};

export { UserProvider, useUserState, useUserActions };
