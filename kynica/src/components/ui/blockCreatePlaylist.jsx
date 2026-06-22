import {useState} from "react";

import ModalCreatePlaylist from "../../shared/modals/modal_create_playlist";

import "../../assets/css/block_create_playlist.css"

const BlockCreatePlaylist = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  }

  return (
      <div className="create_playlist_container">
        <div className="block_create_playlist" onClick={toggleOpen}/>
        <div className="absolute w-full">
          <ModalCreatePlaylist open={open} toggleOpen={toggleOpen}/>
        </div>

      </div>
  )
}

export default BlockCreatePlaylist