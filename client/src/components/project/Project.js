import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Project extends Component {
  render() {
    const { project } = this.props;

    return (
      <div className="project-card card">
        <Link to={`/project/${project.path}`}>
          <h2 className="title is-4 has-text-primary">{project.title}</h2>
        </Link>
        <Link
          to={`/project/${project._id}/edit`}
          className="button is-small is-rounded"
          onClick={() => {
            this.props.setActiveProject(project._id);
          }}
        >
          Edit
        </Link>
        <button
          className="button is-small is-rounded"
          onClick={() => this.props.deleteProject(project)}
        >
          Delete
        </button>
        {/* <button className="button is-small is-rounded" onClick={() => this.props.setPath(project.path)}>SetPath to {project.path}</button> */}
      </div>
    );
  }
}
