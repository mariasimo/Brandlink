import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class EditProject extends Component {
  render() {
    return (
      <div>
        <section className="section">
          <div className="container columns">
            <div className="column is-third">
              <div className="side-menu">
                <h2 className="title is-1">Name of Project</h2>
                <h3 className="subtitle is-3">Brand presets</h3>

                <ul className="project-presets-list">
                  <li>
                    <Link to="/">
                      <h3 className="title is-4 has-text-primary">
                        Tipography
                      </h3>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <h3 className="title is-4 has-text-primary">
                        Text Styles
                      </h3>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <h3 className="title is-4 has-text-primary">
                        Color Palette
                      </h3>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <h3 className="title is-4 has-text-primary">Assets</h3>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="column is-two-thirds projects-wrapper"></div>
          </div>
        </section>
      </div>
    );
  }
}
