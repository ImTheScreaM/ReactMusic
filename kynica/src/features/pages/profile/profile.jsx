import { useNavigate } from "react-router-dom";
import auth_store from "../../../shared/stores/auth_store.ts";
import user_store from "../../../shared/stores/user_store.ts";

import {useState} from "react";

const Profile = () => {
  const [newName,setNewName] = useState();
  const [newBio,setNewBio] = useState();

  const navigate = useNavigate();
  const user = auth_store.user;

  console.log(user)


  const logout_acc = async (e) => {
    e.preventDefault();
    auth_store.logout();
    navigate("/");
  }

  const change_username = async (e) => {
    e.preventDefault();
    user_store.update_username(newName);

  };

  const change_bio = async (e) => {
    e.preventDefault();
    user_store.update_bio(newBio);
  };

  return (
    <div className="profile_container">
      <div className="profile-avatar">
        <img src={user.urlAvatar} />
      </div>
      <div className="profile-content">
        <div className="profile-user_info">
          {user.name}
          <div>{user.profile.bio}</div>
        </div>
      </div>
      <button onClick={logout_acc}>logout</button>
    </div>
  );
};

export default Profile;
