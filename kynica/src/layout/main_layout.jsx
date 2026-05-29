import {Outlet} from "react-router-dom"
import {observer} from "mobx-react-lite";

import music_player_controller from "../shared/stores/music_player_controller.ts";
import MusicRight from "../components/ui/musicRight"
import MusicBottom from "../components/ui/musicBottom.jsx";
import Header from "../features/pages/header/header.jsx"
import {use_music_player_controller} from "../hook/hooks";

import "../assets/css/main_layout.css"

const MainLayout = observer(() => {

    const {musicId,isPlay} = use_music_player_controller()
    const isOpen = music_player_controller.isOpen;
    return (
        <div className="main_layout">
            <div className="main_layout-header">
                <Header/>
            </div>
            <main className={`main_layout-content ${isPlay ? "isPlay" : ""}`}>
                <Outlet/>
                {isOpen && <MusicRight/>}
            </main>
          {musicId && <MusicBottom/>}
        </div>
    )
})

export default MainLayout
