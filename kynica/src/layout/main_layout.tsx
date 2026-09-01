import { observer } from "mobx-react-lite";
import { NavLink, Outlet } from "react-router-dom";

import MusicBottom from "../components/UX/musicBottom.tsx";
import Header from "../features/pages/header/header.tsx";
import { useRootContext } from "../shared/di/rootStoreContext.tsx";
import { AuthGuard } from "../shared/modals/authGuard.tsx";

import "../assets/css/main_layout.css";
import { AuthSvg, ProfileSvg } from "../components/UI/SVG.js";

const MainLayout = observer(() => {
  const { musicPlayerStore, settingsStore, authStore } = useRootContext();

  return (
    <div className={`main_layout ${settingsStore.theme}`}>
      <AuthGuard />
      <div className="main_layout-content">
        <div>
          <Header />
        </div>
        <div>
          <Outlet />
        </div>
        <div className="music_bottom-content">
          <div className="music_bottom">
            <div className="profile_bottom">
              {authStore.isAuth ? (
                <>
                  <div>
                    <NavLink to={"/profile"}>
                      <div className="profile">
                        {authStore.user?.urlAvatar !== "none" ? (
                          <div className="profile_info">
                            <img
                              className="profile_avatar_navigation"
                              src={`http://localhost:3003${authStore.user?.urlAvatar}`}
                              alt="user_img"
                            />
                            <span>{authStore.user?.name}</span>
                          </div>
                        ) : (
                          <>
                            <ProfileSvg />
                          </>
                        )}
                      </div>
                    </NavLink>
                  </div>
                </>
              ) : (
                <>
                  <NavLink to={"/auth/register"}>
                    <div className="auth">
                      <AuthSvg />
                    </div>
                  </NavLink>
                </>
              )}
            </div>
            <div>{musicPlayerStore.musicId && <MusicBottom />}</div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MainLayout;
