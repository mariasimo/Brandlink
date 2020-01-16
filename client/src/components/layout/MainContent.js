import React, { Component } from 'react';
import ProjectService from '../../services/ProjectService';

// import { Content } from '../project/Content';
// import Dropdown from '../utils/Dropdown';
import Dropzone from 'react-dropzone';
import TextEditor from '../utils/TextEditor';
import Dropdown from '../utils/Dropdown';

export default class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.projectService = new ProjectService();
    this.loadingImg = '';
    this.loadingParent = '';
  }

  displayRows = () => {
    const { id } = this.props.match.params;
    console.log(id);

    this.projectService.displayRows(id).then(projectData => {
      console.log(projectData);
      const { rows, colorPalette, typeset, textstyles } = projectData;
      this.setState(
        {
          ...this.state,
          rows: rows,
          colorPalette: colorPalette,
          typeset: typeset,
          textstyles: textstyles
        },
        () => {
          console.log(this.state.rows);
        }
      );
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
    this.projectService.fetchContent(rowId).then(payload => {
      let content = payload;

      content[slotIdx] = { order: slotIdx, type: type };

      this.projectService
        .insertSlot(content, rowId)
        .then(payload => this.displayRows())
        .catch(err => console.log(err));
    });
  };

  addFontAsContent = (rowId, slotIdx, type) => {
    this.projectService
      .addFontAsContent({ rowId, slotIdx, type })
      .then(payload => {
        console.log(payload);
        // this.displayRows();
      });
  };

  addImageAsContent = (file, rowId, slotIdx, type) => {
    this.loadingImg = document.createElement('img');
    this.loadingImg.setAttribute('src', 'http://localhost:3000/loading.svg');
    this.loadingParent = document.querySelector('.image-label');
    this.loadingParent.appendChild(this.loadingImg);

    const uploadData = new FormData();
    uploadData.append('file', file[0]);

    this.projectService.addImageAsContent({ uploadData }).then(imageURl => {
      let image = imageURl;
      this.projectService.fetchContent(rowId).then(payload => {
        let content = payload;
        content[slotIdx] = { order: slotIdx, image: image, type: type };
        this.projectService
          .insertSlot(content, rowId)
          .then(payload => {
            console.log(payload);
            this.displayRows();
          })
          .catch(err => console.log(err));
      });
    });
  };

  addDownloadAsContent = (file, rowId, slotIdx, type) => {
    this.loadingImg = document.createElement('img');
    this.loadingImg.setAttribute('src', 'http://localhost:3000/loading.svg');
    this.loadingParent = document.querySelector('.file-label');
    this.loadingParent.appendChild(this.loadingImg);

    const uploadData = new FormData();
    uploadData.append('file', file[0]);

    this.projectService.addDownloadAsContent({ uploadData }).then(assetObject => {
      console.log(assetObject);
      this.projectService.fetchContent(rowId).then(payload => {
        let content = payload;
        content[slotIdx] = { order: slotIdx, asset: assetObject, type: type };
        this.projectService
          .insertSlot(content, rowId)
          .then(payload => {
            console.log(payload);
            this.displayRows();
          })
          .catch(err => console.log(err));
      });
    });
  };

  componentDidMount() {
    this.displayRows();
  }

  render() {
    // const path = this.props.user.activeProject;
    const path = this.props.match.params.id;
    const { permissionToEdit } = this.props;
    const { colorPalette, typeset, textstyles } = this.state;

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
                              <div className={`assets-container content-container ${row.content[slotIdx].image ? "has-image" : ""}`}>
                                {!row.content[slotIdx].image && (
                                  <Dropzone
                                    onDrop={acceptedFiles =>
                                      this.addImageAsContent(
                                        acceptedFiles,
                                        row._id,
                                        slotIdx,
                                        'assets'
                                      )
                                    }
                                  >
                                    {({ getRootProps, getInputProps }) => (
                                      <section class='image-label'>
                                        <div {...getRootProps()}>
                                          <input {...getInputProps()} />
                                          <p>Click to select image</p>
                                        </div>
                                      </section>
                                    )}
                                  </Dropzone>
                                )}
                                {row.content[slotIdx].image && (
                                  <img
                                    src={row.content[slotIdx].image}
                                    alt=''
                                  />
                                )}
                              </div>
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
                                    <span className='color-name vertical-text'>
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

                        {row.content[slotIdx].type === 'textedit' && (
                          <div className='content-container textedit-container'>
                            <TextEditor></TextEditor>
                          </div>
                        )}

                        {row.content[slotIdx].type === 'textstyles' && (
                          <>
                            {textstyles && (
                              <div className='type-container content-container'>
                                {textstyles.map((style, idx) => (
                                  <div
                                    className='type'
                                    key={idx}
                                    style={{
                                      fontFamily: style.fontFamily,
                                      fontWeight: style.fontWeight,
                                      fontSize: `${style.fontSize}rem`,
                                      letterSpacing: `${style.letterSpacing}rem`,
                                      lineHeight: style.lineHeight
                                    }}
                                  >
                                    {style.name}
                                  </div>
                                ))}
                              </div>
                            )}
                          </>
                        )}

                        {row.content[slotIdx].type === 'downloads' && (
                          <>
                            {/* {assets && assets.length > 0 && ( */}
                              <div className='download-container content-container'>
                                {!row.content[slotIdx].asset && (
                                  <Dropzone
                                    onDrop={acceptedFiles =>
                                      this.addDownloadAsContent(
                                        acceptedFiles,
                                        row._id,
                                        slotIdx,
                                        'downloads'
                                      )
                                    }
                                  >
                                    {({ getRootProps, getInputProps }) => (
                                      <section class='file-label'>
                                        <div {...getRootProps()}>
                                          <input {...getInputProps()} />
                                          <p>Click to select file</p>
                                        </div>
                                      </section>
                                    )}
                                  </Dropzone>
                                )}
                                {row.content[slotIdx].asset && (
                                  // row.content[slotIdx].asset
                                <a className="button" href={row.content[slotIdx].asset.secure_url} target="_blank" download>Download {row.content[slotIdx].asset.name}</a>
                                )}
                              </div>
                          </>
                        )}
                      </React.Fragment>
                    )}

                    {!row.content[slotIdx].type && (
                      <React.Fragment>
                        <div className='content-container'>
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
                                    onClick = {() => this.addContentFront(row._id, slotIdx, 'textedit')}
                                    className='button'
                                    >
                                      Text editor
                                    </button>
                                  </div>
                                  <div>
                                    <button
                                      onClick = {() => this.addContentFront(row._id, slotIdx, 'colorPalette')}
                                      className='button'
                                    >
                                      Color Palette
                                    </button>
                                  </div>
                                  <div>
                                    <button
                                      onClick = {() => this.addContentFront(row._id, slotIdx, 'assets')}
                                      className='button'
                                    >
                                      Image
                                    </button>
                                  </div>
                                  <div>
                                    <button
                                      onClick = {() => this.addContentFront(row._id, slotIdx, 'typeset')}
                                      className='button'
                                    >
                                      Typography
                                    </button>
                                  </div>
                                  <div>
                                    <button
                                      onClick = {() => this.addContentFront(row._id, slotIdx, 'textstyles')}
                                      className='button'
                                    >
                                      TextStyles
                                    </button>
                                  </div>
                                  <div>
                                    <button
                                      onClick = {() => this.addContentFront(row._id, slotIdx, 'downloads')}
                                      className='button'
                                    >
                                      Asset
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                ))}

                {permissionToEdit && (
                  <button
                    className='close'
                    onClick={() => this.deleteRow(row._id)}
                  >
                    Cerrar
                  </button>
                )}
              </div>
            ))}

          {permissionToEdit && (
            <div className='column is-full layout-btn-container'>
              <p className='header subtitle is-4 is-primary'>Choose layout</p>
              <div className='inner'>
                <div
                  className='layout-btn'
                  onClick={() => this.addNewRow('is-full')}
                >
                  <img
                    src={`${process.env.REACT_APP_URL}/full.svg`}
                    alt='Row'
                  ></img>
                  Full
                </div>

                <div
                  className='layout-btn'
                  onClick={() => this.addNewRow('is-half')}
                >
                  <img
                    src={`${process.env.REACT_APP_URL}/half.svg`}
                    alt='Row'
                  ></img>
                  Half
                </div>

                <div
                  className='layout-btn'
                  onClick={() => this.addNewRow('is-one-third')}
                >
                  <img
                    src={`${process.env.REACT_APP_URL}/third.svg`}
                    alt='Row'
                  ></img>
                  Third
                </div>

                <div
                  className='layout-btn'
                  onClick={() => this.addNewRow('is-two-thirds-first')}
                >
                  <img
                    src={`${process.env.REACT_APP_URL}/two-thirds-first.svg`}
                    alt='Row'
                  ></img>
                  Two Thirds
                </div>

                <div
                  className='layout-btn'
                  onClick={() => this.addNewRow('is-two-thirds-last')}
                >
                  <img
                    src={`${process.env.REACT_APP_URL}/two-thirds-last.svg`}
                    alt='Row'
                  ></img>
                  Two Thirds
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    );
  }
}
