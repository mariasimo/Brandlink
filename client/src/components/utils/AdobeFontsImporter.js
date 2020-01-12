import React, { Component } from "react";
import ProjectService from "../../services/ProjectService";

export default class AdobeFontsImporter extends Component {
  constructor(props) {
    super(props);
    this.projectService = new ProjectService();

    this.state = {
      projectId: "gnh6ghd",
      token: "0bb2988cbd31ce44bda853c78df227e26a0d86c8"
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    // const projectId = document.querySelector('input[name="projectId"]').value;
    // const token = document.querySelector('input[name="token"]').value;

    this.projectService.getGoogleFonts()
    .then(fonts => { 
      this.setState({
        ...this.state,
        ...fonts
      })
    },
      error => console.error(error)
    );
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label htmlFor="title" className="label">
            Project Id:
          </label>
          <div className="control">
            <input
              type="text"
              name="projectId"
              value={this.state.projectId}
              className="input"
              placeholder="Introduce the project id of your project"
              onChange={this.handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="path" className="label">
            Token:
          </label>
          <div className="control">
            <input
              type="password"
              name="token"
              value={this.state.token}
              className="input"
              placeholder="Introduce the token for your Adobe Fonts account"
              onChange={this.handleChange}
              required
            />
          </div>
        </div>

        <div className="control">
          <input
            type="submit"
            className="button is-link"
            value="Import fonts"
          ></input>
        </div>
      </form>
    );
  }
}
