import React, { Component } from "react";
import { Link } from "react-router-dom";
import BrandHeader from "../layout/BrandHeader";
import SideMenu from "../layout/SideMenu";
import MainContent from "../layout/MainContent";
import { useProjectsState } from "../../context/ProjectContext";

const EditProject = () => {
  const { currentProject } = useProjectsState();
  return currentProject.title;
};

export default EditProject;

// export default class EditProject extends Component {
//   render() {
//     const { colorPalette, typeset, assets } = this.props;
//     return (
//       <>
//         <SideMenu
//           {...this.props}
//           toggleMenu={this.props.toggleMenu}
//           menuIsOpen={this.props.menuIsOpen}
//           projectId={this.props.user.activeProject}
//           shareMessage={this.props.shareMessage}
//           permissionToShare
//         >
//           <BrandHeader
//             title={this.props.projectTitle}
//             subtitle="Brand presets"
//             {...this.props}
//             url={`/panel/${this.props.user.username}`}
//           ></BrandHeader>

//           <p>Let's begin! Start by adding some brand presets to your project</p>

//           <ul className="project-presets-list">
//             <li>
//               <Link to={`${this.props.activeProject}/typeset`}>
//                 <h3 className="is-size-5 has-text-primary">Typography</h3>
//               </Link>
//             </li>
//             <li>
//               <Link to={`${this.props.activeProject}/textStyles`}>
//                 <h3 className="is-size-5 has-text-primary">Text Styles</h3>
//               </Link>
//             </li>
//             <li>
//               <Link to={`${this.props.activeProject}/colorPalette`}>
//                 <h3 className="is-size-5 has-text-primary">Color Palette</h3>
//               </Link>
//             </li>
//             <li>
//               <Link to={`${this.props.activeProject}/assets`}>
//                 <h3 className="is-size-5 has-text-primary">Assets</h3>
//               </Link>
//             </li>
//           </ul>
//         </SideMenu>
//         <MainContent
//           toggleMenu={this.props.toggleMenu}
//           menuIsOpen={this.props.menuIsOpen}
//           colorPalette={colorPalette}
//           typeset={typeset}
//           user={this.props.user}
//           assets={assets}
//           permissionToEdit
//           {...this.props}
//         ></MainContent>
//       </>
//     );
//   }
// }
