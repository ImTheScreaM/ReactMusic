import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";

import MusicBottom from "../components/UX/musicBottom.jsx";
import MusicRight from "../components/UX/musicRight";
import Header from "../features/pages/header/header.jsx";
import { useMusicPlayerController } from "../hook/hooks";
import music_player_controller from "../shared/stores/music_player_controller.ts";
import { AuthGuard } from "../components/UX/authGuard";

import "../assets/css/main_layout.css";

const MainLayout = observer(() => {
  const { musicId } = useMusicPlayerController();
  const isOpen = music_player_controller.isOpen;
  return (
    <div className="main_layout">
      <AuthGuard/>
      <div className="main_layout-content">
        <Header />

        <div className="content-area">
          <div className="outlet-wrapper">
            <Outlet />
          </div>
          {musicId && <MusicBottom />}
        </div>
        {isOpen && <MusicRight />}
      </div>
    </div>
  );
});

export default MainLayout;
