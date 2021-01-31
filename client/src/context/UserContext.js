import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import AuthService from "../services/AuthService";
import axios from "axios";

const UserState = createContext();
const UserDispatch = createContext();

const LOADING = "LOADING";
const SET_USER = "SET_USER";
const ERROR = "ERROR";

const initState = {
  user: null,
  loading: false,
  error: null,
};
const reducer = (state, action) => {
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

  throw new Error(`Unhandled action type: ${action.type}`);
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

  return (
    <UserState.Provider value={{ user: state }}>
      <UserDispatch.Provider value={{ dispatch }}>
        {children}
      </UserDispatch.Provider>
    </UserState.Provider>
  );
};

const useUserState = () => {
  const { user } = useContext(UserState);
  if (!user) throw new Error(`seems your using this hook out of context`);

  return user;
};

const authService = new AuthService();
const useUserActions = () => {
  const { dispatch } = useContext(UserDispatch);
  if (!dispatch) throw new Error(`seems your using this hook out of context`);

  // const setAuthUser = useCallback(
  //   (user) => {
  //     dispatch({ type: SET_USER, payload: user });
  //   },
  //   [dispatch]
  // );

  const fetchUser = useCallback(
    async (credentials) => {
      console.log(credentials);
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
        console.log(err.response.data.message);
        dispatch({
          type: "ERROR",
          payload: { error: err.response.data.message },
        });
      }
    },
    [dispatch]
  );

  const setAuthUser = useCallback(
    (credentials) => dispatch(() => fetchUser(credentials)),
    [dispatch, fetchUser]
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

  // const logoutUser = useCallback(
  //   (_) => {
  //     dispatch({ type: "LOGOUT_USER" });
  //   },
  //   [dispatch]
  // );
  // const setCurrentProject = useCallback(
  //   (projectId) => {
  //     dispatch({ type: "SET_ACTIVE_PROJECT", payload: projectId });
  //   },
  //   [dispatch]
  // );

  return { dispatch, fetchUser, setAuthUser };
};

export { UserProvider, useUserState, useUserActions };
