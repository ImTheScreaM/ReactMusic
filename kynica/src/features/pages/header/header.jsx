import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";


import "../../../assets/css/header.css"
import {use_auth_store} from "../../../hook/hooks";

const Header = observer(() => {

  const {isAuth,isLoading} = use_auth_store();
  
  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div className="header_container items-center">
      <div className="header_logo">
        <NavLink to={"/"}>
          <img src="https://i.pinimg.com/736x/d8/0b/47/d80b4728ccebe63e590b49d964426762.jpg" alt="logo" />
        </NavLink>
      </div>
      <div className="nav_container">
        <nav className="navigation">
          <ul className="nav_buttons flex flex-col gap-4">
              <li>
                <NavLink to={"/search"}>
                  <div className="search flex">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                          <line x1="16" y1="16" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <h2>Search</h2>
                  </div>
                </NavLink>
              </li>
              <li>
                  <NavLink to={"/"}>
                      <div className="home flex">
                          <svg xmlns="http://www.w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                              <polyline points="9 22 9 12 15 12 15 22"></polyline>
                          </svg>
                          <h2>Home</h2>
                      </div>
                  </NavLink>
              </li>
              <li>
                  <NavLink to={"/favorite"}>
                      <div className="favorite flex">
                        <svg xmlns="http://www.w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.88-8.88 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                         <h2>Favorite</h2>
                      </div>
                  </NavLink>
              </li>
            {isAuth ? (
              <li>
                <NavLink to={"/profile"}>
                    <div>
                        <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1.5" fill="white"/>
                            <circle cx="20" cy="14" r="5" stroke="currentColor" strokeWidth="1.5" fill="white"/>
                            <path d="M8 32C8 28 12 24 20 24C28 24 32 28 32 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        <h2>Profile</h2>
                    </div>
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink to={"/auth/register"}>
                    <div className="auth flex">
                        <svg xmlns="http://www.w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
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
