import React, { Component } from 'react';
import ProjectService from '../../services/ProjectService';
import { Content } from '../project/Content';
import Dropdown from '../utils/Dropdown';

export default class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.projectService = new ProjectService();
  }

  displayRows = () => {
    const userId = this.props.user.id;

    this.projectService.displayRows(userId).then(rows => {
      this.setState({
        ...this.state,
        rows: rows
      });
    });
  };

  addNewRow = layout => {
    const userId = this.props.user.id;
    this.projectService.createNewRow({ layout, userId }).then(
      projectWithRowAdded => {
        this.setState({
          ...this.state,
          rows: projectWithRowAdded.rows
        });
      },
      error => console.log(error)
    );
  };

  addContent = (rowId, slotIdx, type) => {
    this.projectService.addContent({ rowId, slotIdx, type }).then(payload => {
      console.log(payload);
      this.displayRows();
    });
  };

  componentDidMount() {
    this.displayRows();
  }

  render() {
    const path = this.props.user.activeProject;
    const { colorPalette, typeset } = this.props;

    console.log(this.props, this.state.rows);

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
                    {row.content[slotIdx] && (
                      <React.Fragment>

                        {typeset.length && row.content[slotIdx].type === 'typeset' &&
                          typeset.map(type => type.fontFamily)
                        }

                        {!typeset.length && row.content[slotIdx].type === 'typeset' &&
                          <span>No typeset yet</span>
                        }

                        {row.content[slotIdx].type === 'colorPalette' &&
                          < >
                          {colorPalette &&
                            colorPalette.map((color, idx) => (
                              <div className='color' key={idx}>
                                <div
                                  className='circle-color'
                                  style={{ backgroundColor: color.hexadecimal }}
                                ></div>
                                <span>{color.name}</span>
                              </div>
                            ))}
  
                          {!colorPalette.length && (
                            <div>
                              Add your first color.{' '}
                              <a href={`/project/${path}/edit/colorPalette/new`}>
                                New color
                              </a>
                            </div>
                          )}
                          </ >
                        }
                                                  
                      </React.Fragment>
                    )}

                    {!row.content[slotIdx] && (
                      <React.Fragment>
                        <button
                          onClick={slodIdx =>
                            this.addContent(row._id, slotIdx, 'colorPalette')
                          }
                          className='button'
                        >
                          Color Palette
                        </button>

                        <button
                          onClick={slodIdx =>
                            this.addContent(row._id, slotIdx, 'typeset')
                          }
                          className='button'
                        >
                          Typography
                        </button>
                      </React.Fragment>
                    )}
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
