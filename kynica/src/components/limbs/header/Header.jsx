import auth_store from "../../shared/stores/auth_store.ts"

import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { useEffect } from 'react';

const Header = observer(() => {
  const isAuth = auth_store.isAuth
  const isLoading = auth_store.isLoading

  useEffect(() => {
    auth_store.checkAuth();
    
  },6)
  
  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div className="header_container flex justify-evenly py-4">
      <div className="header_logo">
        <NavLink to={"/"}>
          <img src="/" alt="logo" />
        </NavLink>
      </div>

      <div className="search">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="nav_container">
        <nav className="navigation">
          <ul className="spisok flex gap-4">
            {isAuth ? (
              <li>
                <NavLink to={"/profile"}>Profile</NavLink>
              </li>
            ) : (
              <li>
                <NavLink to={"/auth/register"}>Auth</NavLink>
              </li>
            )}
            <li>
              <NavLink to={"/my_music"}>Music</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
});

export default Header;
