import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UploadMusic from "../../../components/UX/uploadMusic.jsx";
import { useRootContext } from "../../../shared/di/rootStoreContext.tsx";

const Profile = observer(() => {
  const { authStore, userStore } = useRootContext();

  const [newProfile, setNewProfile] = useState({
    newName: authStore.user.name,
    newBio: authStore.user.profile.bio,
  });

  const navigate = useNavigate();

  const logout_acc = async (e) => {
    e.preventDefault();
    authStore.logout();
    navigate("/");
  };

  async function changeProfile(e) {
    e.preventDefault();
    console.log(newProfile);

    if (
      authStore.user.name == newProfile.newName &&
      authStore.user.profile.bio == newProfile.newBio
    )
      return toast.info("No has change ");

    if (authStore.user.name != newProfile.newName)
      userStore.update_username(newProfile.newName);
    if (authStore.user.profile.bio != newProfile.newBio)
      userStore.update_bio(newProfile.newBio);
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
          <img
            src={
              authStore.user.urlAvatar != "none" ? authStore.user.urlAvatar : ""
            }
          />
        </div>
        <div className="profile-content">
          <div className="profile-user_info">
            {authStore.user.name}
            <div>{authStore.user.profile.bio}</div>

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
