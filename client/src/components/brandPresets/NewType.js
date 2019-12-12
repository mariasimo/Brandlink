import React, { Component } from "react";
import ProjectService from "../../services/ProjectService";
import MyFontPicker from "../utils/MyFontPicker";


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
    return (
      <section className="section">
        <div className="container columns">
          <div className="column is-third">
            <div className="side-menu">

            <h3 className="subtitle is-4 has-text-weight-bold">Typeset</h3>
            <h2 className="title is-1">Google Fonts</h2>

                <MyFontPicker saveType={(typeObj) => this.saveType(typeObj)}/>
              
            </div>
          </div>
          <div className="column is-two-thirds projects-wrapper"></div>
        </div>
      </section>
    );
  }
}
