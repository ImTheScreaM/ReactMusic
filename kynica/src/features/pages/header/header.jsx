import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

import { useAuthStore } from "../../../hook/hooks";

import "../../../assets/css/header.css";
import {
  AuthSvg,
  FavoriveSvg,
  HomeSvg,
  PlaylistSvg,
  ProfileSvg,
  SearchAvg,
} from "../../../components/UI/SVG";

const Header = observer(() => {
  const { isAuth, isLoading } = useAuthStore();

  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div className="header_container items-center">
      <div className="header_logo">
        <NavLink to={"/"}>
          <img
            src="https://i.pinimg.com/736x/d8/0b/47/d80b4728ccebe63e590b49d964426762.jpg"
            alt="logo"
          />
        </NavLink>
      </div>
      <div className="nav_container">
        <nav className="navigation">
          <ul className="nav_buttons flex flex-col gap-4">
            <li>
              <NavLink to={"/search"}>
                <div className="search flex">
                  <SearchAvg />
                  <h2>Search</h2>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/"}>
                <div className="home flex">
                  <HomeSvg />
                  <h2>Home</h2>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/favorite"}>
                <div className="favorite flex">
                  <FavoriveSvg />
                  <h2>Favorite</h2>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/playlist"}>
                <div className="playlist flex">
                  <PlaylistSvg />
                  <h2>Playlist</h2>
                </div>
              </NavLink>
            </li>
            {isAuth ? (
              <li>
                <NavLink to={"/profile"}>
                  <div className="profile flex">
                    <ProfileSvg />
                    <h2>Profile</h2>
                  </div>
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink to={"/auth/register"}>
                  <div className="auth flex">
                    <AuthSvg />
                    <h2>Auth</h2>
                  </div>
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
});

export default Header;
