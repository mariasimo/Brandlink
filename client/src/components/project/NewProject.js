import React from "react";
import { Link } from "react-router-dom";
import ProjectService from '../../services/ProjectService'

export default class NewProject extends React.Component {
  constructor (props) {
    super(props);
    this.projectService = new ProjectService();

    this.state = {
      //todo: add remaining fields
      title: '',
      path: '',
      colorPalette: null
    }
  }
  
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value })
  }

  handleSubmit = (e) => {
    const { title, path } = this.state;
    const user = this.props.loggedInUser
    const { history } = this.props;
    e.preventDefault();
    this.projectService.createProject({title, path}, user._id)
      .then(
        () => {
          this.setState({...this.state, title: '', path: ''})
          history.push(`/panel/${user.username}`);

        },
        (error) => console.error(error))
  }


  render() {
    const { title, path } = this.state
     return (
      <div>
        <section className="section">
          <div className="container columns">
            <div className="column is-third">
              <div className="side-menu">
                <h2 className="title is-1">New Project</h2>

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
                        onChange={this.handleChange}                      />
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
                        className="button is-link"
                        value="Start project"
                      ></input>
                    </div>

                </form>

                {/* <ul className="project-presets-list">
                          <li>
                              <Link to="/"><h3 className="title is-4 has-text-primary">Tipography</h3></Link>
                          </li>
                          <li>
                              <Link to="/"><h3 className="title is-4 has-text-primary">Text Styles</h3></Link>
                          </li> 
                          <li>
                              <Link to="/"><h3 className="title is-4 has-text-primary">Color Palette</h3></Link>
                          </li>
                          <li>
                              <Link to="/"><h3 className="title is-4 has-text-primary">Assets</h3></Link>
                          </li>
                      </ul> */}
              </div>
            </div>
            <div className="column is-two-thirds projects-wrapper"></div>
          </div>
        </section>
      </div>
    );
  }
}
