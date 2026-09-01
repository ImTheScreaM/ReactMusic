import { memo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { BurgerMenuThreeDot } from "../UI/SVG.js";
import PlaylistSubMenu from "./playlistSubMenu.tsx";
import { useRootContext } from "../../shared/di/rootStoreContext.tsx";

import "../../assets/css/dropdownMusicOption.css";
import { IDropdownMusicOption } from "../../shared/interface/intarface.ts";

const DropdownMusicOption = memo(
  ({
    track,
    showRemoveButton,
    isOpen,
    setOpenTrackId,
  }: IDropdownMusicOption) => {
    const [openPlaylistDropList, setOpenPlaylistDropList] = useState(false);

    const { id } = useParams();
    const { playlistStore, authStore } = useRootContext();

    const toggleDropList = async () => {
      if (authStore.isAuth && !isOpen) {
        try {
          playlistStore.get_playlist();
        } catch (error) {
          console.log(error);
        }
      }
      setOpenTrackId((currentOpenId: number) =>
        currentOpenId === track.id ? null : track.id,
      );
      if (isOpen) {
        setOpenPlaylistDropList(false);
      }
    };

    const deleteFromPlaylist = async () => {
      try {
        playlistStore.delete_music_from_playlist(Number(id), track.id);
        setOpenPlaylistDropList(false);
        setOpenTrackId(false);
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

        {isOpen && (
          <div className="dropdown-menu">
            <button onClick={() => setOpenPlaylistDropList((prev) => !prev)}>
              {openPlaylistDropList ? "← Назад" : "Добавить в плейлист"}
            </button>

            {showRemoveButton && (
              <button onClick={deleteFromPlaylist}>Удалить</button>
            )}
          </div>
        )}

        {isOpen && openPlaylistDropList && (
          <PlaylistSubMenu
            id={track.id}
            setOpenTrackId={setOpenTrackId}
            setOpenPlaylistDropList={setOpenPlaylistDropList}
          />
        )}
      </div>
    );
  },
);

export default DropdownMusicOption;
