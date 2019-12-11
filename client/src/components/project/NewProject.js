import React from "react";
import { Link } from "react-router-dom";

export default class NewProject extends React.Component {
  render() {
    return (
      <div>
        <section className="section">
          <div className="container columns">
            <div className="column is-third">
              <div className="side-menu">
                <h2 className="title is-1">New Project</h2>

                <form>
                  <div className="field">
                    <label htmlFor="title" className="label">
                      Title:
                    </label>
                    <div className="control">
                      <input
                        type="text"
                        name="title"
                        className="input"
                        // value={name}
                        placeholder="Introduce the title for your project"
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
                        name="title"
                        className="input"
                        // value={name}
                        placeholder="Introduce the title for your project"
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
