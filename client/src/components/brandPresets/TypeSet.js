import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectService from "../../services/ProjectService";

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

      console.log(this.state)
    });
  };

  componentDidMount() {
    this.fetchOneProject();
    console.log(this.state);
  }

  render() {
    const { path } = this.props.match.params;
    const { typeset } = this.state;

    return (
      <section className="section">
        <div className="container columns">
          <div className="column is-third">
            <div className="side-menu">
              {/* Transform this element in component and pass title through props */}
              <h2 className="title is-1">Typography set</h2>

              <div className="content">
                <div className="type-set columns is-multiline">
                  {typeset &&
                    typeset.map(font => (
                      <div className="column is-full box" key={font._id}>
                        <div className="element">
                            <span>{font.fontFamily}</span>
                        </div>
                        <div className="is-grouped">
                          <Link
                          to="/"
                            className="button is-rounded is-small is-success is-outlined"
                          >
                            Edit
                          </Link>
                          <button
                            className="button is-rounded is-small is-danger is-outlined"
                          >
                            Delete
                          </button>
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
