import {useState} from "react";

import playlist_controller from "../stores/playlist_controller.ts";

const ModalCreatePlaylist = ({open,toggleOpen}) => {
  const [namePlaylist,setNamePlaylist] = useState("");

  const setNameHandler = (value) => {
    setNamePlaylist(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(namePlaylist);
    try {
      if(!namePlaylist) return console.log("Write name");
      await playlist_controller.create_playlist(namePlaylist);

    } catch (error) {
      console.log(error);
    }
  }

  return (
      <div className={`modal_create_playlist ${open ? "is-open" : ""}`}>
        <div className="modal_content">

          <div className={`modal_content_header`}>
            <button className="close-btn" onClick={toggleOpen}>Close</button>
            <h2>Create Playlist</h2>
          </div>

          <div className="create_playlist_body">
            <input name={"name"} placeholder={"Name for playlist"} value={namePlaylist} onChange={(e) => setNameHandler(e.target.value)} type="text"/>
            <button onClick={handleSubmit}>Create</button>
          </div>
        </div>
      </div>
  )
}

export default ModalCreatePlaylist;