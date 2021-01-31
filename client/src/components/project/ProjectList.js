import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Project from "./Project";
import {
  useProjectsActions,
  useProjectsState,
} from "../../context/ProjectContext";
import { useUserState } from "../../context/UserContext";
import { hyphenString } from "../../utils";

const ProjectList = () => {
  const {
    fetchProjects,
    deleteProject,
    setCurrentProject,
  } = useProjectsActions();
  const history = useHistory();
  const { projects, loading, error } = useProjectsState();
  const {
    user: { username },
  } = useUserState();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const loadProject = (id, path) => {
    history.push(`/${hyphenString(username)}/project/${path}`);
    setCurrentProject(id);
  };

  return (
    <div>
      <section className="section admin-panel">
        <div className="container">
          <div className="columns is-flex-direction-column">
            <div className="column">
              <div className="hero">
                <h2 className="title is-1">Welcome to your panel</h2>
                <p class="">
                  Here you can admin your projects or create new ones.
                  <br />
                  {!projects && <strong>You dont have any projects yet</strong>}
                </p>
              </div>
            </div>
            {loading && "Loading"}
            {error && error}
            {!loading && projects && (
              <div className="column projects-wrapper">
                {projects.map((project, idx) => (
                  <Project
                    key={idx}
                    {...project}
                    deleteProject={deleteProject}
                    loadProject={loadProject}
                  />
                ))}

                <Link to="/project/new" className="project-card">
                  Create new project
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectList;

// export default class ProjectList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.projectService = new ProjectService();
//     this.state = {
//       projects: null,
//     };
//   }

//   componentDidMount() {
//     this.updateProjects();
//   }

//   updateProjects = () => {
//     this.projectService.fetchProjects().then(
//       (projects) => {
//         this.setState({ ...this.state, projects });
//       },
//       (error) => {
//         const { message } = error;
//         console.error(message);
//       }
//     );
//   };

//   deleteProject = (project) => {
//     this.projectService.deleteProject(project).then(
//       () => {
//         this.updateProjects();
//       },
//       (error) => {
//         const { message } = error;
//         console.error(message);
//       }
//     );
//   };

//   render() {
//     // const username = this.props.loggedInUser.username;
//     const { projects } = this.state;

//     return (
// <div>
//   <section className="section admin-panel">
//     <div className="container">
//       <div className="columns">
//         <div className="column is-one-third">
//           <div className="hero">
//             <h2 className="title is-1">Welcome to your panel</h2>
//             <p class="">
//               Here you can admin your projects or create new ones.
//             </p>
//           </div>
//         </div>
//         <div className="column is-two-thirds projects-wrapper">
//           {projects &&
//             projects.map((project, idx) => (
//               <Project
//                 key={idx}
//                 project={project}
//                 deleteProject={(projectId) =>
//                   this.deleteProject(project._id)
//                 }
//                 setPath={(path) => this.props.setPath(path)}
//                 setActiveProject={(projectId) =>
//                   this.props.setActiveProject(project._id)
//                 }
//               ></Project>
//             ))}

//           {!projects && <div>You dont have any projects yet</div>}

//           <Link to="/project/new" className="project-card">
//             Create new project
//           </Link>
//         </div>
//       </div>
//     </div>
//   </section>
// </div>
//     );
//   }
// }
