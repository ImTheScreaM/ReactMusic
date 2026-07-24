import { memo } from "react";
import { toast } from "react-toastify";

import playlist_controller from "../../shared/stores/playlist_controller.ts";

const PlaylistSubMenu = memo(({id}) => {
  const addToPlaylist = async (playlistId) => {
    try {
      playlist_controller.add_music_in_playlist(playlistId, id);
      toast.success(`Success addd to ${playlistId}`);
    } catch (error) {
      toast.error("error");
      console.log(error);
    }
  };

  return (
    <div className="playlist-submenu">
      {playlist_controller.playlists.length > 0 ? (
        playlist_controller.playlists.map((item) => (
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
