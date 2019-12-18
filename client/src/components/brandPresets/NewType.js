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

    this.projectService.addTypeToTypeSet({ fontFamily, type, path }).then(
      () => {
        this.setState({ ...this.state, fontFamily: "" });
        history.push(`/project/${path}/edit/typeSet`);
      },
      error => console.error(error)
    );
  };

  render() {
    const { source, path } = this.props.match.params;
    const { colorPalette, typeset } = this.props;

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
              url={`/project/${path}/edit/typeset`}
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
              url={`/project/${path}/edit/typeset`}
            ></BrandHeader>
            <AdobeFontsImporter></AdobeFontsImporter>
          </>
        )}
      </div>
      </SideMenu>
      <MainContent
          toggleMenu={this.props.toggleMenu}
          menuIsOpen={this.props.menuIsOpen}
          user={this.props.loggedInUser}
          colorPalette={colorPalette}
          typeset={typeset}
        >
          
        </MainContent>
      </ >
    );
  }
}
