import React, { Component } from "react";
import ProjectService from "../../services/ProjectService";
import MyFontPicker from "../utils/MyFontPicker";
import BrandHeader from "../layout/BrandHeader";
import AdobeFontsImporter from "../utils/AdobeFontsImporter";
import SideMenu from "../layout/SideMenu";
import MainContent from "../layout/MainContent";

export default class NewType extends Component {
  constructor(props) {
    super(props);
    this.projectService = new ProjectService();
  }

  saveType = typeObj => {
    const { fontFamily, type } = typeObj;
    const { path } = this.props.match.params;
    const { history } = this.props;

    this.props.saveType({fontFamily, type, path, history});
  };

  render() {
    const { source, id } = this.props.match.params;
    const { colorPalette, typeset, assets } = this.props;

    return (
      < >
      <SideMenu
        toggleMenu={this.props.toggleMenu}
        menuIsOpen={this.props.menuIsOpen}
      >
      <div className="content">
      {source === "google-font" && (
          <>
            <BrandHeader
              title="Google Fonts"
              subtitle="Typeset"
              {...this.props}
              url={`/project/${id}/edit/typeset`}
            ></BrandHeader>
            <MyFontPicker class="select" saveType={typeObj => this.saveType(typeObj)} />
          </>
        )}

        {source === "adobe-font" && (
          <>
            <BrandHeader
              title="Adobe Fonts"
              subtitle="Typeset"
              {...this.props}
              url={`/project/${id}/edit/typeset`}
            ></BrandHeader>
            <AdobeFontsImporter></AdobeFontsImporter>
          </>
        )}
      </div>
      </SideMenu>
      <MainContent
      {...this.props}
          toggleMenu={this.props.toggleMenu}
          menuIsOpen={this.props.menuIsOpen}
          user={this.props.loggedInUser}
          colorPalette={colorPalette}
          typeset={typeset}
          assets={assets}
          permissionToEdit
        >
          
        </MainContent>
      </ >
    );
  }
}
