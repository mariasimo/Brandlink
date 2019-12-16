import React, { Component } from 'react'
import ProjectService from '../../services/ProjectService';

export default class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows : []
    }
    this.projectService = new ProjectService()
  }

  fetchProjectRows = () => {}

  addNewRow = () => {
    const {path} = this.props;
    console.log(path)

    // this.projectService.createNewRow(path)
    // .then(()  => {

    // }, error => console.log(error))
  }

  render() {
    return (
      <div class={`main-content section ${this.props.menuIsOpen}`}>
          Here i can insert the project rows
          <br></br>
          <button className="button" onClick={this.addNewRow}> Add new row</button>
      </div>
    )
  }
}
