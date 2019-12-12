import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Switch, Route } from 'react-router-dom';
import ProjectService from "../../services/ProjectService";


export default class ColorPalette extends Component {  

  constructor(props) {
    super(props);
    this.projectService = new ProjectService();
    this.state = {
      path: "",
      title: "",
      colorPalette : null
    }
  }

  fetchOneProject = () => {
    const path = this.props.match.params.path

    this.projectService.fetchOneProject(path)
    .then(project => {

      this.setState({
        ...this.state,
        ...project
      })

      console.log(this.state.colorPalette)
    })
  }

  componentDidMount() {
    this.fetchOneProject()
  }


  render() {
    const {path} = this.props.match.params
    const {colorPalette}  = this.state

    return (
      <section className="section">
        <div className="container columns">
          <div className="column is-third">
            <div className="side-menu">
              {/* Transform this element in component and pass title through props */}
              <h2 className="title is-1">Color Palette</h2>

              <div className="content">
                    <div className="color-palette">

                    {colorPalette && colorPalette.map((color, idx) => {
                    return <div key={idx} style={{backgroundColor: color.hexadecimal, height: "100px", width: "100px"}}></div>
                    })}
                    
                    {!colorPalette && (
                      <div>You dont have any colorPalette yet</div>
                    )}
               
                    </div>

                    <div className="control">
                        <Link to={`/project/${path}/edit/colorPalette/new`} className="button is-link">
                        Add new color
                        </Link>
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
