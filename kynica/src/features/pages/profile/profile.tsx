import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UploadMusic from "../../../components/UX/uploadMusic.tsx";
import { useRootContext } from "../../../shared/di/rootStoreContext.tsx";

import "../../../assets/css/profile.css";
const Profile = observer(() => {
  const [newAvatar, setNewAvatar] = useState<string>("");

  const { authStore, userStore, settingsStore } = useRootContext();
  const [newProfile, setNewProfile] = useState({
    newName: authStore.user?.name,
    newBio: authStore.user?.profile.bio,
  });
  const navigate = useNavigate();

  const logout_acc = async (e:SubmitEvent) => {
    e.preventDefault();
    authStore.logout();
    navigate("/");
  };

  async function changeProfile(e:SubmitEvent) {
    // !! NEED TO CHANGE !!
    e.preventDefault();

    if (
      authStore.user?.name === newProfile.newName &&
      authStore.user?.profile.bio === newProfile.newBio &&
      authStore.user?.urlAvatar === newAvatar
    )
      return toast.info("No has change ");

    if (authStore.user?.name !== newProfile.newName)
      userStore.update_username(newProfile.newName);
    if (authStore.user?.profile.bio !== newProfile.newBio)
      userStore.update_bio(newProfile.newBio);
    if (authStore.user?.urlAvatar !== newAvatar)
      userStore.update_avatar(newAvatar);
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setNewProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="profile_container">
      <div className="profile-content">
        <div className="profile-avatar">
          <img
            src={
              authStore.user?.urlAvatar !== "none"
                ? `http://localhost:3003${authStore.user?.urlAvatar}`
                : ""
            }
            className="profile_avatar"
            alt="user_img"
          />
        </div>
        <div className="profile-info-change">
          <div className="profile-user_info">
            <div className="profile-user-info-name">
              <h2>Username:{authStore.user?.name}</h2>
            </div>
            <div className="profile-user-info-change">
              <div className="change-username">
                <label htmlFor="newName">Change username:</label>
                <input type="text" name="newName" onChange={handleChange} />
              </div>
              <div className="change-bio">
                <label htmlFor="newBio">Change bio user:</label>
                <input type="text" name="newBio" onChange={handleChange} maxLength={128}/>
              </div>
              <div className="change-avatar">
                <h2>Change avatar:</h2>
                <label htmlFor="newAvatar">
                  {newAvatar ? newAvatar : "Change avatar"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control-avatar"
                  name="newAvatar"
                  id="newAvatar"
                  onChange={(e) => setNewAvatar(e.target.files[0].name)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="profile_bio">
          <h2>Biography:</h2>
          <span>{authStore.user.profile.bio}</span>
        </div>
        <div className="profile_btn">
          <button className="profile_btn_logout" onClick={logout_acc}>Logout</button>
          <button className="profile_btn_submit" onClick={changeProfile}>Submit</button>
          <button className="profile_btn_change_theme" onClick={() => settingsStore.toggleTheme()}>
            Переключить тему
          </button>
        </div>
      </div>

      <div className="profile_create-music">
        <UploadMusic />
      </div>
    </div>
  );
});

export default Profile;
