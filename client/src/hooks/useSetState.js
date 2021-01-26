import { useReducer } from "react";

const reducer = (initialState = {}, updateState = {}) => {
  return { ...initialState, ...updateState };
};

const useSetState = (initialState) => {
  const [state, dispatch] = useReducer(reducer, (initialState = {}));
  const setState = (updateState) => dispatch(updateState);

  return [state, setState];
};

export default useSetState;
