import { memo } from "react";
import { toast } from "react-toastify";

import { useRootContext } from "../../shared/di/rootStoreContext.tsx";

const PlaylistSubMenu = memo(({id}) => {
  const {playlistStore} = useRootContext();

  const addToPlaylist = async (playlistId) => {
    try {
      playlistStore.add_music_in_playlist(playlistId, id);
      toast.success(`Success addd to ${playlistId}`);
    } catch (error) {
      toast.error("error");
      console.log(error);
    }
  };

  return (
    <div className="playlist-submenu">
      {playlistStore.playlists.length > 0 ? (
        playlistStore.playlists.map((item) => (
          <button key={item.id} onClick={() => addToPlaylist(item.id)}>
            <span>{item.name}</span>
          </button>
        ))
      ) : (
        <div>
          <span>No has playlist</span>
        </div>
      )}
    </div>
  );
});

export default PlaylistSubMenu;
