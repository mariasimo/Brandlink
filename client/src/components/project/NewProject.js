import React from "react";
import ProjectService from "../../services/ProjectService";
import SideMenu from "../layout/SideMenu";
import BrandHeader from "../layout/BrandHeader";

export default class NewProject extends React.Component {
  constructor(props) {
    super(props);
    this.projectService = new ProjectService();

    this.state = {
      //todo: add remaining fields
      title: "",
      path: "",
      colorPalette: null,
    };
  }

  handleBlur = (e) => {
    let pathSuggestion = e.target.value.toLowerCase().replace(/ /g, "-");
    this.setState({ ...this.setState, path: pathSuggestion });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleSubmit = (e) => {
    const { title, path } = this.state;
    const { history } = this.props;
    e.preventDefault();

    this.props.createProject({ title, path, history });
  };

  render() {
    const { title, path } = this.state;
    const user = this.props.loggedInUser;

    return (
      <div class="new-project-section">
        <SideMenu
          toggleMenu={this.props.toggleMenu}
          menuIsOpen={this.props.menuIsOpen}
        >
          <BrandHeader
            title="New Project"
            {...this.props}
            url={`/panel/${user.username}`}
          ></BrandHeader>

          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label htmlFor="title" className="label">
                Title:
              </label>
              <div className="control">
                <input
                  type="text"
                  name="title"
                  className="input"
                  value={title}
                  placeholder="Introduce the title for your project"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="path" className="label">
                Path:
              </label>
              <div className="control">
                <input
                  type="text"
                  name="path"
                  className="input"
                  value={path}
                  placeholder="Introduce the url for your project"
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="control">
              <input
                type="submit"
                className="button is-link is-rounded"
                value="Start project"
              ></input>
            </div>
          </form>
        </SideMenu>

        <div
          className={`main-content section ${this.props.menuIsOpen} new-project-main is-paddingless`}
        >
          <section className="section rows-container is-paddingless	">
            <img src="/new-project.png" alt="New Project" />
          </section>
        </div>
      </div>
    );
  }
}
