import React, { Component } from 'react';
import ProjectService from '../../services/ProjectService';
import { Content } from '../project/Content';
import Dropdown from '../utils/Dropdown';
import Dropzone from 'react-dropzone';

export default class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.projectService = new ProjectService();
  }

  displayRows = () => {
    console.log("display rows")
    const { id } = this.props.match.params;

    this.projectService.displayRows(id).then(rows => {
      this.setState({
        ...this.state,
        rows: rows
      })
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

  deleteRow = rowId => {
    this.projectService.deleteRow(rowId).then(
      project => {
        console.log(project);
        this.displayRows();
      },
      error => {
        const { message } = error;
        console.error(message);
      }
    );
  };

  addContent = (rowId, slotIdx, type) => {
    this.projectService.addContent({ rowId, slotIdx, type }).then(payload => {
      this.displayRows();
    });
  };

  addContentFront = (rowId, slotIdx, type) => {
    console.log(rowId)
    this.projectService.fetchContent(rowId)
    .then( payload => {
      let content = payload;

      content[slotIdx] = {order: slotIdx, type: type};

      this.projectService.insertSlot(content, rowId)
      .then(payload => this.displayRows())
      .catch(err=>console.log(err))
    })
  } 

  addFontAsContent = (rowId, slotIdx, type) => {
    this.projectService
      .addFontAsContent({ rowId, slotIdx, type })
      .then(payload => {
        console.log(payload);
        // this.displayRows();
      });
  };

  addImageAsContent = (file, slotIdx, rowId ) => {
    const uploadData = new FormData();
    uploadData.append('file', file[0]);

    console.log(uploadData)

    this.projectService.addImageAsContent({uploadData, slotIdx, rowId })
    .then(payload => {
      console.log(payload)
    });
  };


  // handleUpload = file => {
  //   const uploadData = new FormData();
  //   uploadData.append('file', file[0]);
  //   const { path } = this.props.match.params;

  //   this.props.addAsset({ uploadData, path });
  // };


  componentDidMount() {
    this.displayRows();
  }

  render() {
    const path = this.props.user.activeProject;
    const { colorPalette, typeset, assets } = this.props;
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
                    {row.content[slotIdx].type && (
                      <React.Fragment>
                        {row.content[slotIdx].type === 'assets' && (
                          <>
                            {/* {assets && assets.length > 0 && ( */}
                              <React.Fragment>
                                <div className='assets-container content-container'>
                                  <Dropzone
                                    onDrop={(acceptedFiles, slotIdx) =>
                                      this.addImageAsContent(acceptedFiles, slotIdx, row._id )
                                    }
                                  >
                                    {({ getRootProps, getInputProps }) => (
                                      <section class='file-label'>
                                        <div {...getRootProps()}>
                                          <input {...getInputProps()} />
                                          <p>
                                            Drag 'n' drop some files here, or
                                            click to select files
                                          </p>
                                        </div>
                                      </section>
                                    )}
                                  </Dropzone>
                                </div>
                              </React.Fragment>
                             {/*)}*/}


                            {/* {!assets.length && (
                              <div class='content-container'>
                                <div class='notification is-info'>
                                  Add your first asset.{' '}
                                  <a href={`/project/${path}/edit/assets`}>
                                    New asset
                                  </a>
                                </div>
                              </div>
                            )} */}
                          </>
                        )}

                        {row.content[slotIdx].type === 'colorPalette' && (
                          <>
                            {colorPalette && colorPalette.length > 0 && (
                              <div className='color-container content-container'>
                                {colorPalette.map((color, idx) => (
                                  <div
                                    className='color'
                                    key={idx}
                                    style={{
                                      width: 100 / colorPalette.length + '%',
                                      backgroundColor: color.hexadecimal
                                    }}
                                  >
                                    <span class='color-name vertical-text'>
                                      {color.name}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {!colorPalette.length && (
                              <div className='color-container content-container'>
                                <div class='notification is-info'>
                                  Add your first color.{' '}
                                  <a
                                    href={`/project/${path}/edit/colorPalette/new`}
                                  >
                                    New color
                                  </a>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                        {row.content[slotIdx].type === 'typeset' && (
                          <>
                            <div className='field has-addons'>
                              {typeset && typeset.length > 0 && (
                                <div className='typeset-container content-container'>
                                  {typeset.map(type => (
                                    // <p className='control'>
                                    //   <button
                                    //     className='button is-small'
                                    //     onClick={slodIdx =>
                                    //       this.addFontAsContent(
                                    //         row._id,
                                    //         slotIdx,
                                    //         'typeset'
                                    //       )
                                    //     }
                                    //     style={{ fontFamily: type.fontFamily }}
                                    //   >
                                    //     {type.fontFamily}
                                    //   </button>
                                    // </p>
                                    <React.Fragment>
                                      <div>{type.fontFamily}</div>
                                      <div
                                        style={{ fontFamily: type.fontFamily }}
                                        className='is-size-3'
                                      >
                                        Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm
                                        Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
                                        0123456789 !"#$%&/()=?´¨@
                                      </div>
                                    </React.Fragment>
                                  ))}
                                </div>
                              )}
                            </div>

                            {!typeset.length && (
                              <div className='typeset-container content-container'>
                                <div class='notification is-info'>
                                  Add your first type.{' '}
                                  <a href={`/project/${path}/edit/typeset`}>
                                    New type
                                  </a>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </React.Fragment>
                    )}

                      {!row.content[slotIdx].type && (
                        <React.Fragment>
                        <div className='content-container'>
                          <div className='field has-addons'>
                            <p className='control'>
                              <button
                                className='button is-small'
                                // onClick={slotIdx =>
                                //   this.addContent(
                                //     row._id,
                                //     slotIdx,
                                //     'colorPalette'
                                //   )
                                // }
                                onClick = {() => this.addContentFront(row._id, slotIdx, 'colorPalette')}
                              >
                                Color Palette
                              </button>
                            </p>
                            <p className='control'>
                              <button
                                className='button is-small'
                                // onClick={slodIdx =>
                                //   this.addContent(row._id, slotIdx, 'typeset')
                                // }
                                onClick = {() => this.addContentFront(row._id, slotIdx, 'typeset')}

                              >
                                Typography
                              </button>
                            </p>

                            <p className='control'>
                              <button
                                className='button is-small'
                                // onClick={slodIdx =>
                                //   this.addContent(row._id, slotIdx, 'assets')
                                // }
                                onClick = {() => this.addContentFront(row._id, slotIdx, 'assets')}

                              >
                                Image
                              </button>
                            </p>
                          </div>
                        </div>
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
            <a className='header subtitle is-4 is-primary'>Choose layout</a>
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
