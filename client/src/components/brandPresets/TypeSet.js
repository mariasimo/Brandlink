import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectService from "../../services/ProjectService";
import BrandHeader from "../layout/BrandHeader";
import SideMenu from "../layout/SideMenu";
import MainContent from "../layout/MainContent";

export default class TypeSet extends Component {
  constructor(props) {
    super(props);
    this.projectService = () => {};
    this.state = {
      path: "",
      title: "",
      typeset: null,
    };
  }

  render() {
    const { id } = this.props.match.params;
    const { colorPalette, typeset, assets } = this.props;

    return (
      <>
        <SideMenu
          toggleMenu={this.props.toggleMenu}
          menuIsOpen={this.props.menuIsOpen}
        >
          <BrandHeader
            title="Typography set"
            {...this.props}
            url={`/project/${id}/edit`}
          ></BrandHeader>

          <div className="type-set">
            <div className="content">
              {typeset &&
                typeset.map((font) => (
                  <div className="box" key={font._id}>
                    <span style={{ fontFamily: font.fontFamily }}>
                      {font.fontFamily}
                    </span>
                    <button
                      onClick={() => this.props.deleteType(font._id)}
                      className="button is-rounded is-small is-danger is-outlined"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              {(!typeset || !typeset.length) && (
                <div>You dont have any fonts yet. Add your first font now.</div>
              )}
            </div>

            <div className="field fonts-buttons is-group">
              <div className="google-fonts-button control">
                <Link
                  to={`/project/${id}/edit/typeSet/new/google-font?`}
                  className="button is-link"
                >
                  Add Google Font
                </Link>
              </div>

              <div className="adobe-fonts-button control">
                <Link
                  to={`/project/${id}/edit/typeSet/new/adobe-font?`}
                  className="button is-link"
                >
                  Add Adobe Font
                </Link>
              </div>
            </div>
          </div>
        </SideMenu>
        <MainContent
          {...this.props}
          toggleMenu={this.props.toggleMenu}
          menuIsOpen={this.props.menuIsOpen}
          colorPalette={colorPalette}
          typeset={typeset}
          user={this.props.loggedInUser}
          assets={assets}
          permissionToEdit
        ></MainContent>
      </>
    );
  }
}
