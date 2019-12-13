import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectService from "../../services/ProjectService";
import BrandHeader from "../layout/BrandHeader";

export default class TypeSet extends Component {
  constructor(props) {
    super(props);
    this.projectService = new ProjectService();
    this.state = {
      path: "",
      title: "",
      colorPalette: null,
      typeset: null,
    };
  }

  fetchOneProject = () => {
    const path = this.props.match.params.path;
    this.projectService.fetchOneProject(path).then(project => {
      this.setState({
        ...this.state,
        ...project
      });
    });
  };


  deleteType = (typeId) => {
    console.log("Delete method in component typeset" + typeId)
    this.projectService.deleteType(typeId)
    .then(
      project => {
        console.log(project)
        this.fetchOneProject(project.path)
      },
      error => {
        const { message } = error;
        console.error(message);
      }
    );
  }



  componentDidMount() {
    this.fetchOneProject();
  }

  render() {
    const { path } = this.props.match.params;
    const { typeset } = this.state;
    

    return (
      <section className="section">
        <div className="container columns">
          <div className="column is-third">
            <div className="side-menu">
              <BrandHeader title="Typography set" {...this.props}></BrandHeader>
              <div className="content">
                <div className="type-set columns is-multiline">
                  {typeset &&
                    typeset.map(font => (
                      <div className="column is-full box" key={font._id}>
                        <div className="element">
                            <span>{font.fontFamily}</span>
                        </div>
                        <div className="is-grouped">
                        <button onClick={() => this.deleteType(font._id)} className="button is-rounded is-small is-danger is-outlined">Delete</button>

                        </div>
                      </div>
                    ))}

                  {!typeset && <div>You dont have any fonts yet</div>}
                </div>

                <div className="control">
                  <Link
                    to={`/project/${path}/edit/typeSet/new`}
                    className="button is-link"
                  >
                    Add Google Font
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-two-thirds projects-wrapper"></div>
        </div>
      </section>
    );
  }
}
