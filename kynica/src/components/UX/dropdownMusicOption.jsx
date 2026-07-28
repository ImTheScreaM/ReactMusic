import { memo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuthStore } from "../../hook/hooks";
import { BurgerMenuThreeDot } from "../UI/SVG.js";
import PlaylistSubMenu from "./playlistSubMenu.jsx";
import { useRootContext } from "../../shared/di/rootStoreContext.tsx";

const DropdownMusicOption = memo(({ track, showRemoveButton }) => {
  const [openDropList, setOpenDropList] = useState(false);
  const [openPlaylistDropList, setOpenPlaylistDropList] = useState(false);
  
  const { id } = useParams();
  const {playlistStore,authStore} =  useRootContext();

  const toggleDropList = async () => {
    if (authStore.isAuth && !openDropList) {
      try {
        playlistStore.get_playlist();
      } catch (error) {
        console.log(error);
      }
    }
    setOpenDropList(prev => !prev);
    if (openDropList) {
      setOpenPlaylistDropList(false);
    }
  };

  const deleteFromPlaylist = async () => {
    try {
      playlistStore.delete_music_from_playlist(id, track.id);
      setOpenPlaylistDropList(false);
      setOpenDropList(false);
      toast.success(`Success delete from ${id}`);
    } catch (error) {
      toast.error("error");
      console.log(error);
    }
  };

  return (
    <div className="cart_music-options-droplist">
      <button className="droplist-btn" onClick={toggleDropList}>
        <BurgerMenuThreeDot />
      </button>

      {openDropList && (
        <div className="dropdown-menu">
          <button onClick={() => setOpenPlaylistDropList((prev) => !prev)}>
            {openPlaylistDropList ? "← Назад" : "Добавить в плейлист"}
          </button>

          {showRemoveButton && (
            <button onClick={deleteFromPlaylist}>Удалить</button>
          )}
        </div>
      )}

      {openDropList && openPlaylistDropList && (
        <PlaylistSubMenu id={track.id} />
      )}
    </div>
  );
});

export default DropdownMusicOption;
