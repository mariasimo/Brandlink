import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../guards/PrivateRoute";
import ColorPalette from "../brandPresets/ColorPalette";
import MyModal from "../utils/MyModal";

const SideMenu = ({
  shareMessage,
  permissionToShare,
  menuIsOpen,
  toggleMenu,
  children,
  ...props
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const projectId = props.match.params.id;
    shareMessage({ email, projectId });
  };

  return (
    <section className={`section side-menu ${menuIsOpen}`}>
      <button className="btn-side-menu remove-btn" onClick={toggleMenu}>
        <img src={`${process.env.REACT_APP_URL}/menu.svg`} alt="Menu"></img>
      </button>
      {/*
      <Switch>

      </Switch> */}

      {children}

      {permissionToShare && <MyModal sendMessage={handleSubmit}></MyModal>}
    </section>
  );
};
export default SideMenu;

// export default class SideMenu extends Component {
//   handleSubmit = (e) => {
//     e.preventDefault();
//     const email = document.getElementById("email").value;
//     const projectId = this.props.match.params.id;
//     this.props.shareMessage({ email, projectId });
//   };

//   render() {
//     const { permissionToShare } = this.props;
//     return (
//       <section className={`section side-menu ${this.props.menuIsOpen}`}>
//         <Switch>
//           <PrivateRoute
//             exact
//             path="/project/:id/edit/colorPalette"
//             user={user}
//             activeProject={user.activeProject}
//             toggleMenu={toggleMenu}
//             menuIsOpen={menuIsOpen}
//             // colorPalette={colorPalette}
//             // // deleteColor={deleteColor}
//             // typeset={typeset}
//             // assets={assets}
//             // textstyles={textstyles}
//             component={ColorPalette}
//           />
//         </Switch>

//         <button
//           className="btn-side-menu remove-btn"
//           onClick={this.props.toggleMenu}
//         >
//           <img src={`${process.env.REACT_APP_URL}/menu.svg`} alt="Menu"></img>
//         </button>

//         {this.props.children}

//         {permissionToShare && (
//           <MyModal sendMessage={this.handleSubmit}></MyModal>
//         )}
//       </section>
//     );
//   }
// }
