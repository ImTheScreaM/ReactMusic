import auth_store from "../stores/auth_store.ts";
import music_controller from "../stores/music_controller.ts";
import music_player_controller from "../stores/music_player_controller.ts";

import "../../assets/css/cart_music.css";
import {observer} from "mobx-react-lite";


export const Cart_music = observer(({ props }) => {
  const isAuth = auth_store.isAuth;
  const isPlaying = music_player_controller.isPlaying;

  function toggle_favorite_music(e) { // <- УЖЕ ПОЧТИ НЕ ТЕСТОВАЯ ХУЙНЯ =))),(или ъуй его знает)
    if(!isAuth) return;
    console.log("props",props)
    music_controller.add_rm_user_music(props);

  }

  function toggle_music(e) {
      return isPlaying ? music_player_controller.pause() : music_player_controller.play(props.id,props);
  }

  return (
    <div className="cart_music-container">
      <div className="cart_music">
        <div className="cart_music-left_information">
          <div className="cart_music-image">
            <button onClick={toggle_music}>
              <img src={props.urlAvatar}/>
            </button>
          </div>
          <div className="cart_music_information ">
            <p className="cart_music-name">{props.name}</p>
            <p className="cart_music-artist">{props.artist}</p>
          </div>
        </div>
        <div className="cart_music-right_information">
          <button onClick={(e) => toggle_favorite_music()}>LIKE</button>
          <p>{Math.floor(props.time / 60)}:{String(props.time % 60).padStart(2, '0')}</p>
        </div>
      </div>
    </div>
  );
});


