import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";

const UserState = createContext();
const UserDispatch = createContext();

const initialState = {};
const reducer = (state = {}, action) => {
  if (action.type === "SET_USER") {
    return { ...state, ...action.payload };
  }
  if (action.type === "LOGOUT_USER") {
    return {};
  }
  if (action.type === "SET_ACTIVE_PROJECT") {
    return { ...state, activeProject: action.payload };
  }
  return state;
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
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

const useUserActions = () => {
  const { dispatch } = useContext(UserDispatch);
  if (!dispatch) throw new Error(`seems your using this hook out of context`);

  const setAuthUser = useCallback(
    (user) => {
      dispatch({ type: "SET_USER", payload: user });
    },
    [dispatch]
  );
  const logoutUser = useCallback(
    (_) => {
      dispatch({ type: "LOGOUT_USER" });
    },
    [dispatch]
  );
  const setCurrentProject = useCallback(
    (projectId) => {
      dispatch({ type: "SET_ACTIVE_PROJECT", payload: projectId });
    },
    [dispatch]
  );

  return { setAuthUser, logoutUser, setCurrentProject };
};

export { UserProvider, useUserState, useUserActions };
