import { useState } from "react";

import { useRootContext } from "../../shared/di/rootStoreContext.tsx";

import "../../assets/css/upload_music.css";

const UploadMusic = () => {
  const [avatarMusic, setAvatarMusic] = useState("");
  const [fileMusic, setFileMusic] = useState("");

  const {musicStore} = useRootContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    // if (!formData.avatar || formData.avatar.size === 0) return toast.error("No avatar for music");
    // if (!formData.audio || formData.audio.size === 0) return toast.error("No file music");
    // if (!formData.name || !formData.genre) return toast.error("No name or genre");

    musicStore.upload_music(formData);
    // setAvatarMusic("");
    // setFileMusic("");
    
  };

  return (
    <form
      className="form-container-upload"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      method="post"
    >
      <div className="form-group">
        <div className="upload_music-image">
          <span>Avatar</span>
          <label htmlFor="avatar">{avatarMusic || "Choose avatar"}</label>
          <input
            type="file"
            accept="image/*"
            className="form-control-avatar"
            name="avatar"
            id="avatar"
            onChange={(e) => setAvatarMusic(e.target.files[0].name || "")}
          />
        </div>

        <div className="upload_music-file">
          <span>File</span>
          <label htmlFor="audio">{fileMusic || "Choose file music"}</label>
          <input
            type="file"
            accept=".mp3,audio/*"
            name="audio"
            id="audio"
            className="from-control-audio"
            onChange={(e) => setFileMusic(e.target.files[0].name || "")}
          />
        </div>

        <div className="upload_music-name">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" />
        </div>

        <div className="upload_music-genre">
          <label htmlFor="genre">genre</label>
          <input type="text" name="genre" />
        </div>

        <div className="upload_music-description">
          <label htmlFor="description">Description</label>
          <input type="text" name="description" />
        </div>

        <div className="upload_music-submit">
          <input type="submit" name="submit" value="UPLOAD" />
        </div>
      </div>
    </form>
  );
};

export default UploadMusic;
