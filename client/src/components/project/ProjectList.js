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
        console.log(projects)
        this.setState({ ...this.state, projects });
      },
      error => {
        const { message } = error;
        console.error(message);
      }
    );
  };

  // deleteProject = (project) => {
  //   this.projectService.deleteProject(project.id).then(
  //     () => {
  //       this.updateProjects()
  //     },
  //     error => {
  //       const { message } = error;
  //       console.error(message);
  //     }
  //   );
  // }

  render() {
    // const username = this.props.loggedInUser.username;
    const { projects } = this.state;  

    return (
      <div>
        <section className="section landing">
          <div className="columns">
            <div className="column is-one-third">
            <div className='hero'>
              <h2 className='title is-1'>Welcome to your panel</h2>
              <p class=''>
                Here you can admin your projects or create new ones.
              </p>
      
            </div>
            </div>
            <div className="column is-two-thirds projects-wrapper">

              {projects &&
                projects.map((project, idx) => (
                  <Project key={idx} project={project} 
                  deleteProject={(projectId) => this.props.deleteProject(project._id)} 
                  setPath={(path) => this.props.setPath(path)}
                  setActiveProject={(projectId) => this.props.setActiveProject(project._id)}
                  ></Project>
                ))}

              {!projects && (
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