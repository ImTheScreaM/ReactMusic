import auth_store from "../stores/auth_store.ts";
import music_controller from "../stores/music_controller.ts";

import "../../assets/css/cart_music.css";

export const CartMusic = ({ props }) => {
  const isAuth = auth_store.isAuth;

  function favorite_music(e) {
    if(isAuth) {
      const data = props;
      music_controller.remove_my_music(data);
    } else {
      console.log("No register");
    }
  }

  return (
    <div className="cart_music-container">
      <div className="cart_music">
        <div className="cart_music-left_information">
          <div className="cart_music-image">
            <img src={props.urlAvatar}/>
          </div>
          <div className="cart_music_information ">
            <p className="cart_music-name">{props.name}</p>
            <p className="cart_music-artist">{props.artist}</p>
          </div>
        </div>
        <div className="cart_music-right_information">
          <button onClick={(e) => favorite_music(e)}>LIKE</button>
          <p>{props.time}</p>
        </div>
      </div>
    </div>
  );
};


