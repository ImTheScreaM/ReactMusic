import { observer } from "mobx-react-lite";
import {useEffect} from "react"

import { CartMusic } from "../../../components/UX/cartMusic";
import { useRootContext } from "../../../shared/di/rootStoreContext.tsx";

import "../../../assets/css/favorite.css";

const Favorite = observer(() => {
  const {musicStore,musicPlayerStore} = useRootContext();

  useEffect(() => {
    musicStore.get_user_music()
  },[])

  if (musicStore.loadingUserAllMusic) {
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
        {musicStore.userMusic ? (
          <div>
            {musicStore.userMusic.map((item) => (
              <CartMusic track={item} playlist={musicStore.userMusic} />
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
