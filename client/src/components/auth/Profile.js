import React, { useEffect, useState } from "react";
import { useUserActions, useUserState } from "../../context/UserContext";

const Profile = () => {
  const { user } = useUserState();
  const { setAuthUser } = useUserActions();
  const [uploadedPicture, setUploadedPicture] = useState();
  const fallbackPicture = "https://i.stack.imgur.com/l60Hf.png";

  useEffect(() => {
    const updateUser = () => {
      if (uploadedPicture) {
        // authService
        //   .edit({ id: user.id, picture: uploadedPicture })
        //   .then((updateUser) => setAuthUser(updateUser));
      }
    };
    updateUser();
  }, [uploadedPicture, user.id]);

  const handleUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("picture", e.target.files[0]);
    // authService.upload(uploadData).then(
    //   (data) => setUploadedPicture(data.secure_url),
    //   (error) => console.error(error)
    // );
  };

  return (
    <div className="column">
      <section className="section landing">
        <div className="columns">
          <div className="column is-one-third">
            <div className="hero">
              <h2 className="title is-3">User details</h2>

              <p>
                Username: <span className="strong">{user.username}</span>
                <button className="button is-small is-rounded">
                  Edit username
                </button>
              </p>
              <p>
                Password:
                <button className="button is-small is-rounded">
                  Edit password
                </button>
              </p>
            </div>
          </div>
          <div className="column is-two-thirds projects-wrapper">
            <div>
              <div
                className="is-rounded profile-picture"
                style={{
                  backgroundImage: `url(${user.picture || fallbackPicture})`,
                }}
              ></div>

              <input type="file" name="picture" onChange={handleUpload}></input>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
