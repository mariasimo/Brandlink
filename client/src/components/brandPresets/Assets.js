import React, { Component } from "react";
import Dropzone from "react-dropzone";
import ProjectService from "../../services/ProjectService";

export default class Assets extends Component {
  constructor(props) {
    super(props);
    this.ProjectService = new ProjectService();
  }

  handleUpload = (file) => {
    const uploadData = new FormData();
    uploadData.append("file", file[0]);

    console.log(uploadData)

    const { path } = this.props.match.params
    this.ProjectService.uploadAsset({uploadData, path})
    .then(data => console.log(data))
    .catch(error => console.log(error))

    // this.ProjectService
    //   .upload(uploadData)
    //   .then(
    //     data => {
    //       console.log(data);
    //       // return this.setState({...this.state, picture: data.secure_url})
    //     },
    //     error => {
    //       console.error(error);
    //     }
    //   )
      // Post to collection
      // .then(() => {
      //     return this.authService.edit(user.id, this.state)
      // })
      // .then(userUdated => console.log(userUdated))
  };


  // handleSubmit = e => {
  //   e.preventDefault();

  //   const { name, hexadecimal } = this.state;
  //   const { path, colorId } = this.props.match.params;
  //   const { history } = this.props;

  //   this.projectService
  //     .addColorToPalette({ name, hexadecimal, path, colorId })
  //     .then(
  //       () => {
  //         this.setState({ ...this.state, name: "", hexadecimal: "" });
  //         history.push(`/project/${path}/edit/colorPalette`);
  //       },
  //       error => console.error(error)
  //     );
  // };

  render() {
    return (
      <div>
        <h2>Assets importer</h2>
        <Dropzone onDrop={acceptedFiles => this.handleUpload(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>

        <div>Map all photos in here</div>
      </div>
    );
  }
}
