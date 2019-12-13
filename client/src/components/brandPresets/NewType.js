import React, { Component } from "react";
import ProjectService from "../../services/ProjectService";
import MyFontPicker from "../utils/MyFontPicker";
import BrandHeader from "../layout/BrandHeader";
import AdobeFontsImporter from "../utils/AdobeFontsImporter";

export default class NewType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontFamily: " ",
      type: " "
    };
    this.projectService = new ProjectService ()
  }

  saveType = (typeObj) => {

    const { fontFamily, type } = typeObj;
    console.log(fontFamily, type )
    const { path } = this.props.match.params;
    const { history } = this.props;

    this.projectService
      .addTypeToTypeSet({ fontFamily, type, path })
      .then(
        () => {
          this.setState({ ...this.state, fontFamily: ""});
          history.push(`/project/${path}/edit/typeSet`);
        },
        error => console.error(error)
      );
  }

  render() {
    const source = this.props.match.params.source

    return (
      <section className="section">
        <div className="container columns">
          <div className="column is-third">
            <div className="side-menu">


            {source === "google-font" &&
              < >
              <BrandHeader title="Google Fonts"  subtitle="Typeset" {...this.props}></BrandHeader>
              <MyFontPicker saveType={(typeObj) => this.saveType(typeObj)}/>
              </ >
            }

            {source === "adobe-font" &&
              < >
              <BrandHeader title="Adobe Fonts"  subtitle="Typeset" {...this.props}></BrandHeader>
              <AdobeFontsImporter></AdobeFontsImporter>
              </ >
            }
              
            </div>
          </div>
          <div className="column is-two-thirds projects-wrapper"></div>
        </div>
      </section>
    );
  }
}
