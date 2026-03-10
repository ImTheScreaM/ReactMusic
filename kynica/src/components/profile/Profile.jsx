import { useNavigate } from 'react-router-dom';
import { useAuth } from '../shared/modals/authContext';
import { CartMusic } from "../modals/cartMusic";

const Profile = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

  const USER_EXMPL = {
    name: "ASA",
    email: "ASA@mail.ru",
    avatar:"https://imgur.com",
    profile: {
      bio: "New user =)",
      loveMusic: [
        {id:1,name:"TEPPO",artist:"TEPPO",time:"416"},
        {id:2,name:"TEPPO1",artist:"TEPPO1",time:"416"}
      ]
    }
  }



    const deleted_session = async (e) => {
        e.preventDefault();

        const res = await logout();

        if (res.path) {
            navigate(res.path);
        }
    };

  const change_username = async (e) => {
    e.preventDefault();
  }

  const change_bio = async (e) => {
    e.preventDefault();

  }

    return (
        <div className='profile_container'>
          <div className="profile-avatar">
            <img src={user.avatar} />
          </div>
          <div className="profile-content">
            <div className="profile-user_info">
              {USER_EXMPL.name}
              <div>
                {USER_EXMPL.profile.bio}
              </div>
            </div>
            <div className="profile-user_music">
              {USER_EXMPL.map((el) => {
                <CartMusic props={el}/>
              })}
            </div>
          </div>
        </div>
    );
};

export default Profile;
