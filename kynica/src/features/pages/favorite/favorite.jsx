import {CartMusic} from "../../../shared/modals/cartMusic";
import music_controller from "../../../shared/stores/music_controller.ts";

import "../../../assets/css/favorite.css"
import {observer} from "mobx-react-lite";

const Favorite = observer(() => {
    const music = music_controller.favorite;
    const isLoading = music_controller.isLoading;

    if(isLoading) {
      return <div>Загрузка ...</div>
    }

    return (
        <div className="favorite_music">
            <h1 className="favorite_music-header"> Your Music </h1>
            <div className="favorite_music-main">
                {music.getMusic.map((item) => (
                    <CartMusic props={{ ...item }} />
                ))}
            </div>
        </div>
    )
});


export default Favorite