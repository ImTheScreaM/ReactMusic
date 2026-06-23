import {useEffect} from "react";
import {observer} from "mobx-react-lite";

import {use_music_player} from "../../../hook/hooks";
import {CartMusic} from "../../../components/ui/cartMusic";
import music_controller from "../../../shared/stores/music_controller.ts";

import "../../../assets/css/favorite.css"

const Favorite = observer(() => {
  const {userMusic,userMusicLoading} = use_music_player();

  useEffect(() => {
    music_controller.get_user_music()
  },[])

  if(userMusicLoading) {
    return <div>Загрузка ...</div>
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
                {userMusic.getMusic.map((item) => (
                    <CartMusic props={{ ...item }} playlist={userMusic.getMusic} />
                ))}
              </div>
          ) : (
              <div className="favorite_music-zero">
                <span>No music</span>
              </div>
          )}
        </div>
      </div>
  )
});


export default Favorite