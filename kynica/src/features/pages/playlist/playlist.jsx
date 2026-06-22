import {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";

import playlist_controller from "../../../shared/stores/playlist_controller.ts";
import BlockCreatePlaylist from "../../../components/ui/blockCreatePlaylist";

import "../../../assets/css/playlist.css"

const Playlist = observer(() => {
  const isLoading = playlist_controller.isLoading;

  useEffect(() => {
    playlist_controller.get_playlist();
  },[])


  if (isLoading) {
    return <div> Loading ...</div>;
  }

  console.log(playlist_controller.playlists);

  return (
      <div className="playlist_container">

        <div className="playlist_content">
          <BlockCreatePlaylist/>
          {playlist_controller.playlists.map(item => (
              <NavLink key={item.id} to={`/playlist/${item.id}`}>
                <div className="playlist_item" >

                  <div className="playlist_img">
                    <img src={"https://i.imgur.com/4Yt4B94.jpeg"} alt={"Error"}/>
                  </div>

                  <div className="playlist_info">
                    <span className="playlist_name">
                      {item.name}
                    </span>
                  </div>
                </div>
              </NavLink>
          ))}
        </div>
      </div>
  )
})


export default Playlist;