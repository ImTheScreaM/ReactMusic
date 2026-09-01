import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useRootContext } from "../../../shared/di/rootStoreContext.tsx";
import VirtualizationMusic from "../../../components/UX/VirtualizationMusic.tsx";

const PlaylistMusic = observer(() => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { playlistStore } = useRootContext();

  useEffect(() => {
    playlistStore.get_music_playlist(id);
  }, [id,playlistStore]);


  return (
    <div className="playlist_music">
      <div className="add_music-btn">
        <button onClick={() => setOpen(prev => !prev)}>Add music</button>

        {open && <div></div>}
      </div>

      <div className="playlist_music-content">
        {playlistStore.playlistMusicLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {playlistStore.playlistMusic.length > 0 ? (
              <div>
                <VirtualizationMusic tracks={playlistStore.playlistMusic} showRemoveButton={true}/>
              </div>
            ) : (
              <div>no has</div>
            )}
          </>
        )}
      </div>
    </div>
  );
});

export default PlaylistMusic;
