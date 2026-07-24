import { observer } from "mobx-react-lite";
import {useEffect} from "react"

import { CartMusic } from "../../../components/UX/cartMusic";
import { useMusicPlayer } from "../../../hook/hooks";
import music_controller from "../../../shared/stores/music_controller.ts";

import "../../../assets/css/favorite.css";

const Favorite = observer(() => {
  const { userMusic } = useMusicPlayer();
  const { userAllMusic } = music_controller;

  useEffect(() => {
    music_controller.get_user_music()
  },[])

  if (userAllMusic) {
    return <div>Загрузка ...</div>;
  }

  return (
    <div className="favorite_music">
      <div className="favorite_music-header">
        <div className="favorite_music-content">
          <span>Playlist</span>
          <h1 className="favorite_music-title"> Your Music </h1>
        </div>
      </div>

      <div className="favorite_music-main">
        {userMusic ? (
          <div>
            {userMusic.map((item) => (
              <CartMusic track={item} playlist={userMusic} />
            ))}
          </div>
        ) : (
          <div className="favorite_music-zero">
            <span>No music</span>
          </div>
        )}
      </div>
    </div>
  );
});

export default Favorite;
