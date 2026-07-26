import { useState } from "react";

import playlist_controller from "../../shared/stores/playlist_controller.ts";

import "../../assets/css/dropDownMenuPlaylist.css";

const DropdownMenuPaylist = ({ playlistId, name }) => {
  const [isDeletedMenu, setIsDeletedMenu] = useState(false);
  const [newDataForPlaylist, setNewDataForPlaylist] = useState({
    name: name,
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log(name, value, files);

    setNewDataForPlaylist((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmitAvatarAndName = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("playlistId", String(playlistId));

    try {
      console.log(formData);
      
      playlist_controller.update_playlist(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePlaylist = () => {
    playlist_controller.delete_playlist(playlistId);
  };

  return (
    <div className="container-menu-playlist">
      <form onSubmit={handleSubmitAvatarAndName}>
        <div className="form-change-name-playlist">
          <span>Change name</span>

          <input
            type="text"
            name="name"
            value={newDataForPlaylist.name}
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
              <button className="deleted-yes" onClick={deletePlaylist}>YES</button>
              <button className="deleted-no" onClick={() => setIsDeletedMenu(false)}>NO</button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
export default DropdownMenuPaylist;
