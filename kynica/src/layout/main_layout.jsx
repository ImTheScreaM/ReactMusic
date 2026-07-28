import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";

import MusicBottom from "../components/UX/musicBottom.jsx";
import MusicRight from "../components/UX/musicRight";
import Header from "../features/pages/header/header.jsx";
import { useRootContext } from "../shared/di/rootStoreContext.tsx";
import { AuthGuard } from "../shared/modals/authGuard.jsx";

import "../assets/css/main_layout.css";

const MainLayout = observer(() => {
  const {musicPlayerStore} = useRootContext();

  return (
    <div className="main_layout">
      <AuthGuard/>
      <div className="main_layout-content">
        <Header />

        <div className="content-area">
          <div className="outlet-wrapper">
            <Outlet />
          </div>
          {musicPlayerStore.musicId && <MusicBottom />}
        </div>
        {musicPlayerStore.isOpen && <MusicRight />}
      </div>
    </div>
  );
});

export default MainLayout;
