import React, { Component } from "react";
import ProjectService from "../../services/ProjectService";
import ColorPicker from "./ColorPicker";

export default class NewColor extends Component {
  constructor(props) {
    super(props);
    this.projectService = new ProjectService();

    this.state = {
      name: "",
      hexadecimal: ""
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleSubmit = (e) => {
    const { name, hexadecimal } = this.state;
    const {path} = this.props.match.params
    const { history } = this.props;
    
    e.preventDefault();
    this.projectService.addColorToPalette({name, hexadecimal, path})
      .then(
        () => {
          this.setState({...this.state, name: '', hexadecimal: ''})
          history.push(`/project/${path}/edit/colorPalette`);
        },
        (error) => console.error(error))
  }


  render() {
    const { name, hexadecimal } = this.state;

    return (
      <section className="section">
        <div className="container columns">
          <div className="column is-third">
            <div className="side-menu">
              <h2 className="title is-1">Color Palette</h2>

              <form onSubmit={this.handleSubmit}>
                <div className="field">
                  <label htmlFor="title" className="label">
                    Name:
                  </label>
                  <div className="control">
                    <input
                      type="text"
                      name="name"
                      className="input"
                      value={name}
                      placeholder="Introduce the title for your project"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="path" className="label">
                    Hexadecimal:
                  </label>
                  <div className="control">
                    <input
                      type="text"
                      name="hexadecimal"
                      className="input"
                      value={hexadecimal}
                      placeholder="Introduce the url for your project"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="control">
                  <input
                    type="submit"
                    className="button is-link"
                    value="Save Color"
                  ></input>
                </div>
              </form>
            </div>
          </div>
          <div className="column is-two-thirds projects-wrapper"></div>
        </div>
      </section>
    );
  }
}
