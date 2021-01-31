import React from "react";
import { Link } from "react-router-dom";

const Project = ({ title, id, path, deleteProject, loadProject }) => {
  return (
    <div className="project-card card">
      <h2 className="title is-4 has-text-primary">{title}</h2>
      <Link
        className="button is-small is-rounded"
        onClick={() => loadProject(id, path)}
      >
        Edit
      </Link>
      <button
        className="button is-small is-rounded"
        onClick={() => deleteProject(id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Project;
