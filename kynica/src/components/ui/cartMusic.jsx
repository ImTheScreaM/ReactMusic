import music_controller from "../../shared/stores/music_controller.ts";


import "../../assets/css/cart_music.css";
import {observer} from "mobx-react-lite";
import {toggle_music, use_auth_store, use_music_player_controller} from "../../hook/hooks";


export const CartMusic = observer(({ props,playlist }) => {
  const {isAuth} = use_auth_store();
  const {isPlay,musicId} = use_music_player_controller()

  function toggle_favorite_music(e) { // <- УЖЕ ПОЧТИ НЕ ТЕСТОВАЯ ХУЙНЯ =))),(или ъуй его знает)
    if(!isAuth) return;
    music_controller.add_rm_user_music(props);
  }

  return (
    <div className="cart_music-container">
      <div className="cart_music">
        <div className="cart_music-left_information">
          <div className="cart_music-image">
            <button onClick={() => toggle_music(isPlay,props.id,props,playlist)}>
              <img src={props.urlAvatar}/>
            </button>
          </div>
          <div className="cart_music_information">
            <p className="cart_music-name">{props.name}</p>
            <p className="cart_music-artist">{props.artist}</p>
          </div>
        </div>
        <div className="cart_music-right_information">
          <button className={`like-button ${props.isLiked ? 'active' : ''}`}
                  onClick={(e) => toggle_favorite_music()}>
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.501 5.501 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"/>
            </svg>
          </button>
          <p>{Math.floor(props.time / 60)}:{String(props.time % 60).padStart(2, '0')}</p>
        </div>
      </div>
    </div>
  );
});


