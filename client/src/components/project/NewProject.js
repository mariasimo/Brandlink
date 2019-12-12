import React from "react";
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

  handleBlur = (e) => {
    let pathSuggestion = e.target.value.toLowerCase().replace(/ /g, "-");
    this.setState({...this.setState, path: pathSuggestion})
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
          history.push(`/project/${path}/edit`);

        },
        (error) => console.error(error))
  }


  render() {
    const { title, path } = this.state
     return (
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
                        className="button is-link"
                        value="Start project"
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
