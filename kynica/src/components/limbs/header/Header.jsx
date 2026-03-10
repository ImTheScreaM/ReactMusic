import { NavLink } from "react-router-dom";
import { useAuth } from "../../shared/modals/authContext";

const Header = () => {
  const { isAuth, isLoading } = useAuth();

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
};

export default Header;
