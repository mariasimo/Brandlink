import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import ProjectService from '../../services/ProjectService';
import BrandHeader from '../layout/BrandHeader';
import SideMenu from '../layout/SideMenu';
import MainContent from '../layout/MainContent';

export default class Assets extends Component {
  constructor(props) {
    super(props);
    this.projectService = new ProjectService();
    this.state = {
      path: '',
      title: '',
      assets: null
    };
  }

  handleUpload = file => {
    const uploadData = new FormData();
    uploadData.append('file', file[0]);
    const { path } = this.props.match.params;

    this.props.addAsset({ uploadData, path });
  };

  render() {
    const { id } = this.props.match.params;
    const { colorPalette, typeset, assets } = this.props;

    return (
      <React.Fragment>
        <SideMenu
          toggleMenu={this.props.toggleMenu}
          menuIsOpen={this.props.menuIsOpen}
        >
          <BrandHeader
            title='Assets Library'
            {...this.props}
            url={`/project/${id}/edit`}
          ></BrandHeader>

          <div>
            <Dropzone
              onDrop={acceptedFiles => this.handleUpload(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <section class='file-label'>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
            <p>File formats allowed: .png, .jpg, .pdf, .zip, .svg, .gif</p>

            <div className='assets-list columns is-multiline'>
              {assets &&
                assets.map(asset => (
                  <div
                    key={asset._id}
                    draggable
                    className='draggable'
                    onDragStart={e => this.props.onDragStart(e, asset._id)}
                    onDrop={e => this.props.onDrop(e, asset._id)}
                  >
                    <figure className='column is-half'>
                      <button
                        onClick={() => this.props.deleteAsset(asset._id)}
                        className='button is-rounded is-small is-danger is-outlined'
                      >
                        Delete
                      </button>
                      {(asset.format === 'png' ||
                        asset.format === 'jpg' ||
                        asset.format === 'svg' ||
                        asset.format === 'gif') && (
                        <span>
                          <img src={asset.secure_url} alt='' />
                        </span>
                      )}
                      {asset.format === 'pdf' && <p>esto es un pdf</p>}
                      {asset.format === 'zip' && (
                        <p className='box'>esto es un zip</p>
                      )}
                    </figure>
                    {/* <div className="asset-name" onClick={this.editName}>
                        <a>{asset.name}</a>
                        <input style={{display: 'none'}} type="text" value={asset.name} onChange={this.editInputName(asset._id)}/>
                      </div> */}
                  </div>
                ))}

              {!assets && <div>You dont have any assets yet</div>}
            </div>
          </div>
        </SideMenu>
        <MainContent
          {...this.props}
          toggleMenu={this.props.toggleMenu}
          menuIsOpen={this.props.menuIsOpen}
          user={this.props.loggedInUser}
          colorPalette={colorPalette}
          typeset={typeset}
          assets={assets}
          onDragStart={this.props.onDragStart}
          permissionToEdit

          
        ></MainContent>
      </React.Fragment>
    );
  }
}
