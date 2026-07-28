import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CartMusic } from "../../../components/UX/cartMusic";
import { useRootContext } from "../../../shared/di/rootStoreContext.tsx"

const PlaylistMusic = observer(() => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  
  const { playlistStore,musicStore } = useRootContext();

  useEffect(() => {
    playlistStore.get_music_playlist(id);
  }, []);

  const toggleOpen = () => {
    setOpen(!open);
  };

  if (playlistStore.playlistMusicLoading) return <div>Loading...</div>;

  return (
    <div className="playlist_music">
      <div className="add_music-btn">
        <button onClick={toggleOpen}>Add music</button>

        {open && <div></div>}
      </div>

      <div className="playlist_music-content">
        {playlistStore.playlistMusic.length > 0 ? (
          <div>
            {playlistStore.playlistMusic.map((item) => {
              const music = musicStore.allMusic.find(
                (track) => track.id == item.id,
              );
              return (
                <CartMusic
                  key={item.id}
                  track={music}
                  showRemoveButton={true}
                  playlist={playlistStore.playlistMusic}
                />
              );
            })}
          </div>
        ) : (
          <div>no has</div>
        )}
      </div>
    </div>
  );
});

export default PlaylistMusic;
