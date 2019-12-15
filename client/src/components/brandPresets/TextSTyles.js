import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectService from "../../services/ProjectService";
import BrandHeader from "../layout/BrandHeader";

export default class TextStyles extends Component {
  constructor(props) {
    super(props);
    this.projectService = new ProjectService();
    this.state = {
    };
  }

  addPredefinedStyles = () => {
    // Grab first font on type set
    // Insert in de db predefined styles for this project
    // Get typeset and applies sizes
    // Retrieve it and pass it to this.state
  }

  fetchOneProject = () => {
    const path = this.props.match.params.path;
    this.projectService.fetchOneProject(path).then(project => {
      this.setState({
        ...this.state,
        ...project,
      });
    });
  };

  componentDidMount() {
    this.fetchOneProject();
  }

  render() {
    const { path } = this.props.match.params;
    const { typeset, textstyles } = this.state;
    console.log(textstyles)
    
    return (  
      <section className="section">
        <div className="container columns">
          <div className="column is-third">
            <div className="side-menu">
              <BrandHeader title="Text Styles" {...this.props} url={`/project/${path}/edit`} ></BrandHeader>
              <div className="content">
                <div className="type-set columns is-multiline">
                  
                  {textstyles &&
                    textstyles.map((style, idx) => (
                      <div className="column is-full box" key={idx}>
                        <div className="element">
                            <span style={{fontFamily: style.fontFamily, fontWeight: style.fontWeight, fontSize: `${style.fontSize}rem`, letterSpacing: `${style.letterSpacing}rem`, lineHeight: style.lineHeight}}>{style.name}</span>
                        </div>
                        <div className="is-grouped">
                          <Link to={{
                            pathname:`${this.props.location.pathname}/new/${style.name}`,
                            typeset: this.state.typeset
                          }} className="button is-rounded is-small is-success is-outlined">Edit</Link>
                        </div>
                      </div>
                    ))}

                  {!textstyles && <div>You dont have any text styles yet</div>}
                </div>

                <div className="field fonts-buttons is-group">
                  <div className="adobe-fonts-button control">
                    <Link
                      to={`${this.props.location.pathname}/new/}`}
                      className="button is-link"
                    >
                      Add New Text Style
                    </Link>
                  </div>
                </div>


              </div>
            </div>
          </div>
          <div className="column is-two-thirds projects-wrapper"></div>
        </div>
      </section>
    );
  }
}
