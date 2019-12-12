import React, { Component } from "react";
import ProjectService from "../../services/ProjectService";

export default class NewColor extends Component {
  constructor(props) {
    super(props);
    this.projectService = new ProjectService();

    this.state = {
      name: "",
      hexadecimal: ""
    };
  }

  componentDidMount() {
    this.getColorData();
  }

  getColorData = () => {
    const { colorId } = this.props.match.params;

    if (colorId !== undefined) {
      this.projectService.getColorData(colorId).then(
        colorData => {
          let color = colorData.colorPalette.filter(
            color => color._id === colorId
          );
          this.setState({
            ...this.state,
            name: color[0].name,
            hexadecimal: color[0].hexadecimal
          });
        },
        error => {
          const { message } = error;
          console.error(message);
        }
      );
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, hexadecimal } = this.state;
    const { path, colorId } = this.props.match.params;
    const { history } = this.props;

    this.projectService
      .addColorToPalette({ name, hexadecimal, path, colorId })
      .then(
        () => {
          this.setState({ ...this.state, name: "", hexadecimal: "" });
          history.push(`/project/${path}/edit/colorPalette`);
        },
        error => console.error(error)
      );
  };

  render() {
    const { name, hexadecimal } = this.state;
    const { colorId } = this.props.match.params;

    return (
      <section className="section">
        <div className="container columns">
          <div className="column is-third">
            <div className="side-menu">

    {colorId && <h2 className="title is-1">Edit this color</h2>}
            {!colorId && <h2 className="title is-1">Color Palette</h2>}

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
                      required
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
                      required
                    />
                  </div>
                </div>

                <div className="control">
                  {!colorId && (
                    <input
                      type="submit"
                      className="button is-link"
                      value="Save Color"
                    ></input>
                  )}

                  {colorId && (
                    <input
                      type="submit"
                      className="button is-link"
                      value="Edit Color"
                    ></input>
                  )}
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
