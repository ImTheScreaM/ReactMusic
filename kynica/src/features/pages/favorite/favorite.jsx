import {Cart_music} from "../../../shared/modals/cart_music";
import music_controller from "../../../shared/stores/music_controller.ts";

import "../../../assets/css/favorite.css"
import {observer} from "mobx-react-lite";

const Favorite = observer(() => {
    const music = music_controller.userMusic;
    const isLoading = music_controller.isLoading;

    if(isLoading) {
      return <div>Загрузка ...</div>
    }



    if(!music) {
      return <div>Null</div>
    }

    return (
        <div className="favorite_music">
            <h1 className="favorite_music-header"> Your Music </h1>
            <div className="favorite_music-main">
                {music.getMusic.map((item) => (
                    <Cart_music props={{ ...item.music }} />
                ))}
            </div>
        </div>
    )
});


export default Favorite