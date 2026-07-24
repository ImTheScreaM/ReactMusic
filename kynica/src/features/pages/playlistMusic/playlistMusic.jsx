import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { CartMusic } from "../../../components/UX/cartMusic";
import playlist_controller from "../../../shared/stores/playlist_controller.ts";
import music_controller from "../../../shared/stores/music_controller.ts";

const PlaylistMusic = observer(() => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const playlistMusicLoading = playlist_controller.playlistMusicLoading;

  useEffect(() => {
    playlist_controller.get_music_playlist(id);
  }, []);

  const toggleOpen = () => {
    setOpen(!open);
  };

  if (playlistMusicLoading) return <div>Loading...</div>;

  return (
    <div className="playlist_music">
      <div className="add_music-btn">
        <button onClick={toggleOpen}>Add music</button>

        {open && <div></div>}
      </div>

      <div className="playlist_music-content">
        {playlist_controller.playlistMusic.length > 0 ? (
          <div>
            {playlist_controller.playlistMusic.map((item) => {
              const music = music_controller.allMusic.find(track => track.id == item.id)
              return <CartMusic
                key={item.id}
                track={music}
                showRemoveButton={true}
                playlist={playlist_controller.playlistMusic}
              />;
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
