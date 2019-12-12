import React from "react";
import AuthService from "../../../services/AuthService";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();

    const { username, picture } = this.props.loggedInUser;

    this.state = {
      username: username,
      picture : picture
    };
  }


  handleUpload = (e) => {
    const uploadData = new FormData();
    const user = this.props.loggedInUser
    uploadData.append('picture', e.target.files[0])

    this.authService.upload(uploadData)
    .then(
      (data) => {
        return this.setState({...this.state, picture: data.secure_url})
      },
      (error) => {
        console.error(error)
      }
    ).then(() => {
        return this.authService.edit(user.id, this.state)
    })
    .then(userUdated => console.log(userUdated))
  }



  render() {
    const { username, picture } = this.state;
    return (
      <div className="column">
        <h3 className="title">User details</h3>
        <p>
          Username: <span className="strong">{username}</span>
          <button className="button is-small is-rounded">Edit username</button>
        </p>
        <p>
          Password:
          <button className="button is-small is-rounded">Edit password</button>
        </p>

        <br />
        <div>
          <div className="is-rounded profile-picture" style={{backgroundImage: `url(${picture})`}}></div>

         <input type="file" name="picture" onChange={this.handleUpload}></input>

        </div>
      </div>
    );
  }
}
