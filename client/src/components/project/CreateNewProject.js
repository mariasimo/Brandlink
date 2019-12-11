import React from "react";
import { Link } from "react-router-dom";

export default class CreateNewProject extends React.Component {
  render() {
    return (
      <div>
        <section className="section">
          <div className="container columns">
            <div className="column is-third">
              <div className="side-menu">
                <h2 className="title is-1">New Project</h2>

                <form>
                    {/* <label>Title:</label>
                    <input
                      type="text"
                      name="name"
                      onChange={this.handleChange}
                      value={name}
                      placeholder
                    />
                    <label htmlFor="description">Description:</label>{" "}
                    <input
                      type="text"
                      name="description"
                      onChange={this.handleChange}
                      value={description}
                    />
                    <div className="control">
                        <input type="submit" className="button is-link" value="Start Project"></input>
                    </div> */}
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
