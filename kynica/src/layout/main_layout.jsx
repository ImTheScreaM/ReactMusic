import { Outlet } from "react-router-dom"

import MusicBottom from "../components/ui/music.bottom";
import music_player_controller from "../shared/stores/music_player_controller.ts";
import Header from "../features/pages/header/header"

import "../assets/css/main_layout.css"
import {observer} from "mobx-react-lite";


const MainLayout = observer(() => {
    const musicId = music_player_controller.musicId;

    return (
        <div className="main_layout">
            <div className="main_layout-header">
                <Header/>
            </div>
            <main className="main_layout-content">
                <Outlet/>
              {musicId ? (
                <MusicBottom/>

              ) : (
                ""
              )}
            </main>
        </div>
    )
})

export default MainLayout