import axios from "axios";
import { useCallback } from "react";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/users`,
  withCredentials: true,
});

const useAuthService = (state, dispatch) => {
  const signUpMiddleware = useCallback(
    async (credentials) => {
      dispatch({ type: "LOADING" });

      try {
        const response = await instance.post("/signup", credentials);
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

  const logInMiddleware = useCallback(
    async (credentials) => {
      dispatch({ type: "LOADING" });

      try {
        const response = await instance.post("/login", credentials);
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

  const logOutMiddleware = useCallback(async () => {
    try {
      const response = await instance.post("/logout");
      if (response) localStorage.removeItem("sessionUser");
      dispatch({
        type: "LOGOUT_USER",
      });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: { error: err.response.data.message },
      });
    }
  }, [dispatch]);

  const addNewProjectMiddleware = useCallback(
    async (credentials) => {
      dispatch({ type: "LOADING" });

      try {
        const response = await instance.post("/new-project", credentials);

        dispatch({
          type: "SET_USER",
          payload: {
            user: {
              ...state.user,
              projects: [...state.user.projects, response.data],
            },
          },
        });
      } catch (err) {
        dispatch({
          type: "ERROR",
          payload: { error: err.response.data.message },
        });
      }
    },
    [dispatch, state.user]
  );

  return {
    signUpMiddleware,
    logInMiddleware,
    logOutMiddleware,
    addNewProjectMiddleware,
  };
};

export default useAuthService;

// signup = (user) => {
//   return this.instance
//     .post("/signup", user)
//     .then((res) => Promise.resolve(res.data))
//     .catch((error) => error);
// };

// login = (user) => {
//   return this.instance
//     .post("/login", user)
//     .then((res) => Promise.resolve(res.data))
//     .catch((error) => console.error(error));
// };

// logout = () => {
//   return this.instance
//     .post("/logout")
//     .then((res) => {
//       Promise.resolve(res.data);
//     })
//     .catch((error) => console.error(error));
// };

// loggedInUser = () => {
//   return this.instance
//     .get("/loggedin")
//     .then((res) => Promise.resolve(res.data))
//     .catch((error) => {
//       console.error({ message: error });
//     });
// };

// edit = ({ id, ...userData }) => {
//   return this.instance
//     .put(`/edit/${id}`, userData)
//     .then((res) => {
//       return Promise.resolve(res.data);
//     })
//     .catch((error) => console.error(error));
// };

// upload = (picture) => {
//   return this.instance
//     .post("/upload", picture)
//     .then((res) => Promise.resolve(res.data))
//     .catch((error) => console.error(error));
// };

// setActiveProject = (projectData) => {
//   const { path, id } = projectData;

//   return this.instance
//     .put(`/edit/${id}`, { path })
//     .then((res) => {
//       return Promise.resolve(res.data);
//     })
//     .catch((error) => console.error(error));
// };
