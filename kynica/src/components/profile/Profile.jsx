import { useNavigate } from "react-router-dom";
import { CartMusic } from "../shared/modals/cartMusic";
import auth_store from "../shared/stores/auth_store.ts";

const Profile = () => {
  const navigate = useNavigate();

  const isAuth = auth_store.isAuth
  console.log(isAuth)

  const USER_EXMPL = {
    name: "ASA",
    email: "ASA@mail.ru",
    avatar: "https://imgur.com",
    profile: {
      bio: "New user =)",
    },
    loveMusic: [
      {
        id: 1,
        name: "TEPPO",
        artist: "TEPPO",
        time: 416,
        urlAvatar:
          "https://images.genius.com/4359a58369263453193e9d898edce2d1.1000x1000x1.jpg",
      },
      {
        id: 2,
        name: "TEPPO1",
        artist: "TEPPO1",
        time: 416,
        urlAvatar:
          "https://images.genius.com/4359a58369263453193e9d898edce2d1.1000x1000x1.jpg",
      },
    ],
  };


  const logout_acc = async (e) => {
    e.preventDefault()
    auth_store.logout()
    navigate("/")
  }

  const change_username = async (e) => {
    e.preventDefault();
  };

  const change_bio = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="profile_container">
      <div className="profile-avatar">
        <img src={USER_EXMPL.avatar} />
      </div>
      <div className="profile-content">
        <div className="profile-user_info">
          {USER_EXMPL.name}
          <div>{USER_EXMPL.profile.bio}</div>
        </div>
        <div className="profile-user_music">
          {USER_EXMPL.loveMusic.map((item) => (
            <CartMusic props={{ ...item }} />
          ))}
        </div>
      </div>
      <button onClick={logout_acc}>logout</button>
    </div>
  );
};

export default Profile;
