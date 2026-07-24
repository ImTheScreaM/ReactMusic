import { useState } from "react";

import ModalCreatePlaylist from "../../shared/modals/modal_create_playlist";

import "../../assets/css/block_create_playlist.css";

const BlockCreatePlaylist = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="create_playlist_container">
      <div className="block_create_playlist" onClick={toggleOpen}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path d="M328 224C328 219.6 324.4 216 320 216C315.6 216 312 219.6 312 224V312H224C219.6 312 216 315.6 216 320C216 324.4 219.6 328 224 328H312V416C312 420.4 315.6 424 320 424C324.4 424 328 420.4 328 416V328H416C420.4 328 424 324.4 424 320C424 315.6 420.4 312 416 312H328V224Z" />
        </svg>
      </div>
      <div className="absolute w-full">
        <ModalCreatePlaylist open={open} toggleOpen={toggleOpen} />
      </div>
    </div>
  );
};

export default BlockCreatePlaylist;
