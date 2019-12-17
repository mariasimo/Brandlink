import React, { Component } from 'react';
import ProjectService from '../../services/ProjectService';
import { Content } from '../project/Content';

export default class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.projectService = new ProjectService();
  }

  fetchOneProject = () => {
    const { path } = this.props;
    this.projectService.fetchOneProject(path).then(project => {
      this.setState({
        ...this.state,
        ...project
      });
    });
  };

  addNewRow = layout => {
    const { path } = this.props;
    this.projectService.createNewRow({ path, layout: layout }).then(
      projectWithRowAdded => {
        console.log(projectWithRowAdded);
        this.setState({
          ...this.state,
          rows: projectWithRowAdded.rows
        });
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

  addContent = (typeOfContent, rowId, slotIdx) => {
    const { path } = this.props;

    this.projectService
      .updateRow({ typeOfContent, rowId, path, slotIdx })
      .then(rowUpdated => {
        console.log(rowUpdated)
        this.fetchOneProject();

      });
  };

  componentDidMount() {
    this.fetchOneProject();
    console.log(this.state);
  }

  render() {
    console.log(this.state.rows)
    return (
      <div
        className={`main-content section is-paddingless	 ${this.props.menuIsOpen}`}
      >
        <section className='section rows-container is-paddingless	'>
          {this.state.rows &&
            this.state.rows.map((row, rowIdx) => (
              <div key={row._id} className='columns is-multiline is-marginless'>
                {row.slots.map((slot, slotIdx) => (
                  <div
                    key={slotIdx}
                    id={`slot-${rowIdx}-${slotIdx}`}
                    className={`${row.layout} column row slot`}
                  >
                    {/* If there'is content in the slot */}
                    {/* Print component with slot data */}
                    {row.content[slotIdx] &&
                    <Content slot={row.content[slotIdx]}></Content>}

                    {/* If row content is empty, show dropdown menu */}
                    {/* Make this component later */}
                    {!row.content[slotIdx] && 
                      <div className='dropdown is-hoverable'>
                      <div className='dropdown-trigger'>
                        <button
                          className='button'
                          aria-haspopup='true'
                          aria-controls='dropdown-menu4'
                        >
                          <span>Add content</span>
                          <span className='icon is-small'>
                            <img
                              src={`${process.env.REACT_APP_URL}/chevron-down.svg`}
                            ></img>
                          </span>
                        </button>
                      </div>
                      <div
                        className='dropdown-menu'
                        id='dropdown-menu4'
                        role='menu'
                      >
                        <div className='dropdown-content'>
                          <div className='dropdown-item'>
                            <div>
                              <button
                                onClick={this.addContent}
                                className='button'
                              >
                                Text editor
                              </button>
                            </div>
                            <div>
                              <button
                                onClick={() =>
                                  this.addContent(
                                    'colorPalette',
                                    row._id,
                                    slotIdx
                                  )
                                }
                                className='button'
                              >
                                Color Palette
                              </button>
                            </div>
                            <div>
                              <button
                                onClick={this.addContent}
                                className='button'
                              >
                                Image
                              </button>
                            </div>
                            <div>
                              <button
                                onClick={this.addContent}
                                className='button'
                              >
                                Typography display
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    }
                    
                  </div>
                ))}
                <button
                  className='close'
                  onClick={() => this.deleteRow(row._id)}
                >
                  Cerrar
                </button>
              </div>
            ))}

          <div className='column is-full layout-btn-container'>
            <a className='header'>Add new row</a>
            <div className='inner'>
              <div
                className='layout-btn'
                onClick={() => this.addNewRow('is-full')}
              >
                <img src={`${process.env.REACT_APP_URL}/full.svg`}></img>
                Full
              </div>

              <div
                className='layout-btn'
                onClick={() => this.addNewRow('is-half')}
              >
                <img src={`${process.env.REACT_APP_URL}/half.svg`}></img>
                Half
              </div>

              <div
                className='layout-btn'
                onClick={() => this.addNewRow('is-one-third')}
              >
                <img src={`${process.env.REACT_APP_URL}/third.svg`}></img>
                Third
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
