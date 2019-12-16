import React, { Component } from "react";
import Dropzone from "react-dropzone";
import ProjectService from "../../services/ProjectService";
import BrandHeader from "../layout/BrandHeader";
import SideMenu from "../layout/SideMenu";
import MainContent from "../layout/MainContent";


export default class Assets extends Component {
  constructor(props) {
    super(props);
    this.projectService = new ProjectService();
    this.state = {
      path: "",
      title: "",
      assets: null
    };
    this.loadingImg = "";
    this.loadingParent = ""
  }

  fetchOneProject = () => {
    const path = this.props.match.params.path;
    this.projectService.fetchOneProject(path).then(project => {
      this.setState({
        ...this.state,
        ...project
      });
    });
  };

  handleUpload = file => {
    const uploadData = new FormData();
    uploadData.append("file", file[0]);
    const { path } = this.props.match.params;

    this.loadingImg = document.createElement('img')
    this.loadingImg.setAttribute('src', 'http://localhost:3000/loading.svg')
    this.loadingParent = document.querySelector('.file-label')
    this.loadingParent.appendChild(this.loadingImg)
 
    this.projectService.uploadAsset({ uploadData, path })
      .then(() => {
        this.fetchOneProject();
        this.loadingParent.removeChild(this.loadingImg)
      })
      .catch(error => console.log(error));
  };

  deleteAsset = (assetId) => {
    this.projectService.deleteAsset(assetId)
    .then(
      project => {
        this.fetchOneProject();
      },
      error => {
        const { message } = error;
        console.error(message);
      }
    );
  }

//   editName = () => {
//     // Append one child and remove another
    
//     const nameDOMEL = document.querySelector('.asset-name')
//     nameDOMEL.childNodes[0].style.display = "none"
//     nameDOMEL.childNodes[1].style.display = "block"
//   }

//   editInputName = (assetId) => {
//     let stateCopy = Object.assign({}, this.state);
    
//     console.log(stateCopy.assets, assetId)

//     stateCopy.assets.map(asset => {
//       if(assetId === asset._id) {
//         return asset
//       }
//     })
// //     stateCopy.assets[key].upVotes += 1;
// // this.setState(stateCopy);
// //     this.setState({...this.state, assets})
//   }

  componentDidMount() {
    this.fetchOneProject();
  }

  render() {
    const { assets } = this.state;
    const { path } = this.props.match.params;
    return (
      <React.Fragment>
        <SideMenu toggleMenu={this.props.toggleMenu} menuIsOpen={this.props.menuIsOpen}>
        <BrandHeader
                title="Assets Library"
                {...this.props}
                url={`/project/${path}/edit`}
              ></BrandHeader>

              <div>
                <Dropzone
                  onDrop={acceptedFiles => this.handleUpload(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section class="file-label">
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p >
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
                  <p>File formats allowed: .png, .jpg, .pdf, .zip, .svg, .gif</p>

                <div className="assets-list columns is-multiline">
                  {assets &&
                    assets.map(asset => (
                      
                      <div key={asset._id} >
                        <figure className="column is-half">
                            <button onClick={() => this.deleteAsset(asset._id)} className="button is-rounded is-small is-danger is-outlined">Delete</button>
                          {(asset.format === "png" ||
                            asset.format === "jpg" ||
                            asset.format === "svg" ||
                            asset.format === "gif") && (
                            <span >
                              <img src={asset.secure_url} alt="" />
                            </span>
                          )}
                          {asset.format === "pdf" && (
                            <p>esto es un pdf</p>
                          )}
                          {asset.format === "zip" && (
                            <p className="box">esto es un zip</p>
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
      <div className={`section main-content ${this.props.menuIsOpen}`}
        style={{ backgroundColor: 'grey' }}
      >
          {this.props.children}
      </div>
      </React.Fragment>
    );
  }
}
