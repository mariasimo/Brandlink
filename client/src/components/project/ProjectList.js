import React from "react";
import ProjectService from "../../services/ProjectService";
import { Link } from "react-router-dom";
import Project from "./Project";

export default class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.projectService = new ProjectService();
    this.state = {
      projects: null
    };
  }

  componentDidMount() {
    this.updateProjects();
  }

  updateProjects = () => {
    this.projectService.fetchProjects().then(
      projects => {
        this.setState({ ...this.state, projects });
      },
      error => {
        const { message } = error;
        console.error(message);
      }
    );
  };

  deleteProject = (project) => {
    this.projectService.deleteProject(project.id).then(
      () => {
        this.updateProjects()
      },
      error => {
        const { message } = error;
        console.error(message);
      }
    );
  }


  render() {
    // const username = this.props.loggedInUser.username;
    const { projects } = this.state;        
    return (
      <div>
        <section className="section">
          <div className="container columns">
            <div className="column is-third">
              <div className="hero">
                  <h2 className="title is-1">All Projects</h2>
              </div>
            </div>
            <div className="column is-two-thirds projects-wrapper">

              {projects &&
                projects.map(project => (
                  <Project key={project.id} project={project} deleteProject={(project) => this.deleteProject(project)} setPath={(path) => this.props.setPath(path)}></Project>
                ))}

              {(projects === null || projects === [] || !projects) && (
                <div>You dont have any projects yet</div>
              )}

              <Link to="/project/new" className="project-card">Create new project</Link>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
