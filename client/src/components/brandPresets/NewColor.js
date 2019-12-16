import React, { Component } from "react";
import ProjectService from "../../services/ProjectService";
import BrandHeader from "../layout/BrandHeader";
import SideMenu from "../layout/SideMenu";
import MainContent from "../layout/MainContent";

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
          console.log(colorData);
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
    const { colorId, path } = this.props.match.params;

    return (
      < >
      <SideMenu
        toggleMenu={this.props.toggleMenu}
        menuIsOpen={this.props.menuIsOpen}
      >
        {colorId && (
          <BrandHeader
            title="Edit color"
            subtitle="Color Palette"
            {...this.props}
            url={`/project/${path}/edit/colorPalette`}
          ></BrandHeader>
        )}
        {!colorId && (
          <BrandHeader
            title="New color"
            subtitle="Color Palette"
            {...this.props}
            url={`/project/${path}/edit/colorPalette`}
          ></BrandHeader>
        )}

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
      </SideMenu>
              <MainContent
              toggleMenu={this.props.toggleMenu}
              menuIsOpen={this.props.menuIsOpen}
            >
              Holi
            </MainContent>
            </ >
    );
  }
}
