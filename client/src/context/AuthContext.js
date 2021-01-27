import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";

const AuthContext = createContext();

const initialState = {};
const reducer = (state = {}, action) => {
  console.log(action);

  if (action.type === "SET_USER") {
    return { ...state, ...action.payload };
  }
  if (action.type === "LOGOUT_USER") {
    return {};
  }
  return state;
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error(`seems your using this hook out of context`);

  const { state, dispatch } = context;
  const setAuthUser = useCallback(
    (user) => {
      dispatch({ type: "SET_USER", payload: user });
    },
    [dispatch]
  );
  const logoutUser = useCallback(
    (user) => {
      dispatch({ type: "LOGOUT_USER" });
    },
    [dispatch]
  );

  return { user: state, setAuthUser, logoutUser };
};

export { AuthProvider, useAuthContext };
