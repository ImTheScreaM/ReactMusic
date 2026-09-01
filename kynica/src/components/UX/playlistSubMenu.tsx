import { memo } from "react";
import { toast } from "react-toastify";

import { useRootContext } from "../../shared/di/rootStoreContext.tsx";
import { IMusic, IPlaylistSubMenu } from "../../shared/interface/intarface.ts";

const PlaylistSubMenu = memo(
  ({
    id,
    setOpenTrackId,
    setOpenPlaylistDropList,
  }:IPlaylistSubMenu) => {
    const { playlistStore } = useRootContext();

    const addToPlaylist = async (playlistId:number) => {
      try {
        playlistStore.add_music_in_playlist(playlistId, id);
        setOpenTrackId(prev => !prev)
        setOpenPlaylistDropList(prev => !prev)
        toast.success(`Success addd to ${playlistId}`);
      } catch (error) {
        toast.error("error");
        console.log(error);
      }
    };

    return (
      <div className="playlist-submenu">
        {playlistStore.playlists.length > 0 ? (
          playlistStore.playlists.map((item:IMusic) => (
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
  },
);

export default PlaylistSubMenu;
