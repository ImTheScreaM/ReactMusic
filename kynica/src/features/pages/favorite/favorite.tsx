import { observer } from "mobx-react-lite";

import { useRootContext } from "../../../shared/di/rootStoreContext.tsx";
import VirtualizationMusic from "../../../components/UX/VirtualizationMusic.tsx";

import "../../../assets/css/favorite.css";

const Favorite = observer(() => {
  const { musicStore } = useRootContext();

  return (
    <div className="favorite_music">
      <div className="favorite_music-header">
        <div className="favorite_music-content">
          <span>Playlist</span>
          <h1 className="favorite_music-title"> Your Music </h1>
        </div>
      </div>

      <div className="favorite_music-main">
        {musicStore.loadingUserAllMusic ? (
          <div>Loading...</div>
        ) : (
          <>
            {musicStore.userMusic ? (
              <div>
                <VirtualizationMusic
                  tracks={musicStore.userMusic}
                />
              </div>
            ) : (
              <div className="favorite_music-zero">
                <span>No music</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
});

export default Favorite;
