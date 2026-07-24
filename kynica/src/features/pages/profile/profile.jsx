import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UploadMusic from "../../../components/UX/uploadMusic.jsx";
import auth_store from "../../../shared/stores/auth_store.ts";
import user_store from "../../../shared/stores/user_store_controller.ts";

const Profile = observer(() => {
  const user = auth_store.user;

  const [newProfile, setNewProfile] = useState({
    newName: user.name,
    newBio: user.profile.bio,
  });

  const navigate = useNavigate();

  const logout_acc = async (e) => {
    e.preventDefault();
    auth_store.logout();
    navigate("/");
  };

  async function changeProfile(e) {
    e.preventDefault();
    console.log(newProfile);

    if (
      user.name == newProfile.newName &&
      user.profile.bio == newProfile.newBio
    )
      return toast.info("No has change ");

    if (user.name != newProfile.newName)
      user_store.update_username(newProfile.newName);
    if (user.profile.bio != newProfile.newBio)
      user_store.update_bio(newProfile.newBio);
  }

  const handleChange = (e) => {
    setNewProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="profile_container">
      <div className="profile-info">
        <div className="profile-avatar">
          <img src={user.urlAvatar} />
        </div>
        <div className="profile-content">
          <div className="profile-user_info">
            {user.name}
            <div>{user.profile.bio}</div>

            <div>
              <div>
                <label htmlFor="">newName</label>
                <input type="text" name="newName" onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="">newBio</label>;
                <input type="text" name="newBio" onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>
        <button onClick={logout_acc}>logout</button>
        <button onClick={changeProfile}>Submit</button>
      </div>

      <div className="profile_create-music">
        <UploadMusic />
      </div>
    </div>
  );
});

export default Profile;
