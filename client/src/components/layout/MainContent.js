import React, { Component } from 'react';
import ProjectService from '../../services/ProjectService';
import { Content, ColorPalette } from '../project/Content';

export default class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.projectService = new ProjectService();
  }

  fetchOneProject = () => {
    const { path } = this.props;
    this.projectService.fetchOneProject(path).then(project => {
      this.setState({
        ...this.state,
        ...project
      })
    });
  };

  addNewRow = layout => {
    const { path } = this.props;

    this.projectService.createNewRow({ path, layout: layout }).then(
      projectWithRowAdded => {
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

  addContent = (typeOfContent, slotDOMId) => {

    const slot = document.querySelector(`#${slotDOMId}`)
    console.log(slot)
    console.log(this.state[typeOfContent])

    
    const { path } = this.props;
    this.projectService.fetchOneProject(path).then(project => {
      this.setState({
        ...this.state,
        ...project
      })
      if(!this.state[typeOfContent].length){
        slot.innerHTML="Donde vas con mantón de manila"
      }   

    });


  }

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
            this.state.rows.map((row,rowIdx) => (
              <div key={row._id} className='columns is-multiline is-marginless'>
                {/* <a>{row.name}</a> */}

                {row.content.map((slot, slotIdx) => (
                  <div key={slot._id} id={`slot-${rowIdx}-${slotIdx}`} class={`${row.layout} column row slot`}>
                    {slot._id}
                    <div class='dropdown is-hoverable'>
                      <div class='dropdown-trigger'>
                        <button
                          class='button'
                          aria-haspopup='true'
                          aria-controls='dropdown-menu4'
                        >
                          <span>Add content</span>
                          <span class='icon is-small'>
                            <img
                              src={`${process.env.REACT_APP_URL}/chevron-down.svg`}
                            ></img>
                          </span>
                        </button>
                      </div>
                      <div
                        class='dropdown-menu'
                        id='dropdown-menu4'
                        role='menu'
                      >
                        <div class='dropdown-content'>
                          <div class='dropdown-item'>
                            <div>
                              <button onClick={this.addContent} className='button'>Text editor</button>
                            </div>
                            <div>
                              <button onClick={()=>this.addContent("colorPalette", `slot-${rowIdx}-${slotIdx}`)} className='button'>Color Palette</button>
                            </div>
                            <div>
                              <button onClick={this.addContent} className='button'>Image</button>
                            </div>
                            <div>
                              <button onClick={this.addContent} className='button'>
                                Typography display
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
            <a className="header">Add new row</a>
            <div className='inner'>
              <div class='layout-btn' onClick={() => this.addNewRow('is-full')}>
                <img src={`${process.env.REACT_APP_URL}/full.svg`}></img>
                Full
              </div>

              <div class='layout-btn' onClick={() => this.addNewRow('is-half')}>
                <img src={`${process.env.REACT_APP_URL}/half.svg`}></img>
                Half
              </div>

              <div
                class='layout-btn'
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
