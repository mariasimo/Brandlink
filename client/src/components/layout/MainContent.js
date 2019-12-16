import React, { Component } from 'react';
import ProjectService from '../../services/ProjectService';

export default class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
    this.projectService = new ProjectService();
  }

  fetchOneProject = () => {
    const { path } = this.props;
    this.projectService.fetchOneProject(path).then(project => {
      this.setState({
        ...this.state,
        rows: project.rows
      });
    });
  };

  addNewRow = () => {
    const { path } = this.props;

    this.projectService.createNewRow(path).then(
      projectWithRowAdded => {
        this.setState({
          ...this.state,
          rows: projectWithRowAdded.rows
        });

        console.log(this.state);
      },
      error => console.log(error)
    );
  };

  deleteRow = rowId => {
    console.log(rowId);
    this.projectService.deleteRow(rowId).then(
      project => {
        this.fetchOneProject();
      },
      error => {
        const { message } = error;
        console.error(message);
      }
    );
  };

  componentDidMount() {
    this.fetchOneProject();
  }

  render() {
    return (
      <div
        className={`main-content section is-paddingless	 ${this.props.menuIsOpen}`}
      >
        <section class='section rows-container is-paddingless	'>
          {this.state.rows &&
            this.state.rows.map(row => (
              <div key={row._id} className='column is-full row'>
                <a>{row.name}</a>
               
                <div class='dropdown is-hoverable'>
                  <div class='dropdown-trigger'>
                    <button
                      class='button'
                      aria-haspopup='true'
                      aria-controls='dropdown-menu4'
                    >
                      <span>Now add content to this thing</span>
                      <span class='icon is-small'>
                      <img src={`${process.env.REACT_APP_URL}/chevron-down.svg`}></img> 
                      </span>
                    </button>
                  </div>
                  <div class='dropdown-menu' id='dropdown-menu4' role='menu'>
                    <div class='dropdown-content'>
                      <div class='dropdown-item'>
                        <div><button className="button">Text editor</button></div>
                        <div><button className="button">Color Palette</button></div>
                        <div><button className="button">Image</button></div>
                        <div><button className="button">Typography display</button></div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  className='close'
                  onClick={() => this.deleteRow(row._id)}
                >
                  Cerrar
                </button>
              </div>
            ))}

          <div className='column is-full'>
            <a>Add new row</a>
            <button className='button' onClick={this.addNewRow}>
              {' '}
              Add new row
            </button>
          </div>
        </section>
      </div>
    );
  }
}
