import React from "react";
import { Link } from "react-router-dom";

const Project = ({ path, title, id, deleteProject, username }) => {
  return (
    <div className="project-card card">
      <Link to={`/project/${path}`}>
        <h2 className="title is-4 has-text-primary">{title}</h2>
      </Link>
      <Link
        to={`/${username}/project/${id}/edit`}
        className="button is-small is-rounded"
        onClick={() => {
          // setActiveProject(id);
        }}
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
