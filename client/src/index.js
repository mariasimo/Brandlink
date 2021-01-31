import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { ProjectProvider } from "./context/ProjectContext";

ReactDOM.render(
  <Router>
    <UserProvider>
      <ProjectProvider>
        <App />
      </ProjectProvider>
    </UserProvider>
  </Router>,
  document.getElementById("root")
);
