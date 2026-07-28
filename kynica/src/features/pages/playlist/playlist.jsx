import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { BurgerMenuThreeDot } from "../../../components/UI/SVG.js";
import BlockCreatePlaylist from "../../../components/UX/blockCreatePlaylist";
import DropdownMenuPaylist from "../../../components/UX/dropDownMenuPlaylist.jsx";
import { useRootContext } from "../../../shared/di/rootStoreContext.tsx";

import "../../../assets/css/playlist.css";

const Playlist = observer(() => {
  const [openPlaylistId, setOpenPlaylistId] = useState(null);

  const {playlistStore} = useRootContext();
  
  useEffect(() => {
    playlistStore.get_playlist();
  }, []);

  if (playlistStore.isLoading) {
    return <div> Loading ...</div>;
  }

  return (
    <div className="playlist_container">
      <div className="playlist_content">
        <BlockCreatePlaylist />
        {playlistStore.playlists.map((item) => (
          <div className="playlist_item" key={item.id}>
            <div className={`playlist_menu-wrapper`} >
              <button className="playlist_menu-button" onClick={() => setOpenPlaylistId(openPlaylistId === item.id ? null : item.id)}>
                <BurgerMenuThreeDot />
              </button>

              {openPlaylistId === item.id && <DropdownMenuPaylist name={item.name} currentAvatar={item.avatar} playlistId={item.id} />}
            </div>

            <NavLink key={item.id} to={`/playlist/${item.id}`}>
              <div className="playlist_img">
                <img
                  src={
                    item.avatar != "none"
                      ? `http://localhost:3003/${item.avatar}`
                      : "https://i.imgur.com/4Yt4B94.jpeg"
                  }
                  alt={"Error"}
                />
              </div>

              <div className="playlist_info">
                <span className="playlist_name">{item.name}</span>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Playlist;
