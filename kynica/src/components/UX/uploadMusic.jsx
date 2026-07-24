import { observer } from "mobx-react-lite";

import music_controller from "../../shared/stores/music_controller.ts";

import "../../assets/css/upload_music.css"
import { useState } from "react";
import { validate_file } from "../../shared/utils/validate_file.tsx";


const UploadMusic = observer(() => {

  const [avatarMusic,setAvatarMusic] = useState("");
  const [fileMusic,setFileMusic] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    validate_file(formData)

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
});

export default UploadMusic;
