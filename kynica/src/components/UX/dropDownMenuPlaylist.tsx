import { useState } from "react";

import { useRootContext } from "../../shared/di/rootStoreContext.tsx";

import "../../assets/css/dropDownMenuPlaylist.css";
import { IDropdownMenuPaylist } from "../../shared/interface/intarface.ts";

const DropdownMenuPaylist = ({ playlistId, name }: IDropdownMenuPaylist) => {
  const [isDeletedMenu, setIsDeletedMenu] = useState(false);
  const [newDataForPlaylist, setNewDataForPlaylist] = useState<{
    username: string;
    avatar: string | null;
  }>({
    username: name,
    avatar: null,
  });

  const { playlistStore } = useRootContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    setNewDataForPlaylist((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmitAvatarAndName = async (
    e: React.ChangeEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("playlistId", String(playlistId));

    try {
      return await playlistStore.update_playlist(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePlaylist = () => {
    playlistStore.delete_playlist(playlistId);
  };

  return (
    <div className="container-menu-playlist">
      <form onSubmit={handleSubmitAvatarAndName}>
        <div className="form-change-name-playlist">
          <span>Change name</span>

          <input
            type="text"
            name="name"
            value={newDataForPlaylist.username}
            onChange={handleChange}
            placeholder="New playlist name"
          />
        </div>

        <div className="form-change-avatar-playlist">
          <span>Change avatar</span>

          <label htmlFor={`avatar-${playlistId}`}>
            {newDataForPlaylist.avatar
              ? newDataForPlaylist.avatar.name
              : "Choose avatar"}
          </label>

          <input
            type="file"
            accept="image/*"
            name="avatar"
            id={`avatar-${playlistId}`}
            className="form-control-avatar"
            onChange={handleChange}
          />
        </div>

        <div className="upload_avatar-playlist-submit">
          <button type="submit">Сохранить</button>

          <button
            type="button"
            onClick={() => setIsDeletedMenu(true)}
            className="delete-playlist"
          >
            Удалить playlist
          </button>
          {isDeletedMenu && (
            <div className="choice-deleted-or-no">
              <button className="deleted-yes" onClick={deletePlaylist}>
                YES
              </button>
              <button
                className="deleted-no"
                onClick={() => setIsDeletedMenu(false)}
              >
                NO
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
export default DropdownMenuPaylist;
