import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";


import playlist_controller from "../../../shared/stores/playlist_controller.ts";
import {observer} from "mobx-react-lite";
import {CartMusic} from "../../../components/ui/cartMusic";

const PlaylistMusic = observer(() => {

  const {id} = useParams();
  const [open, setOpen] = useState(false);
  const playlistMusicLoading = playlist_controller.playlistMusicLoading;

  useEffect(() => {
    console.log("hello")
    playlist_controller.get_music_playlist(id);
  },[id])


  const toggleOpen = () => {
    setOpen(!open);
  }

  if(playlistMusicLoading) return (
      <div>Loading...</div>
  )

  return (
      <div className="playlist_music">
        <div className="add_music-btn">
          <button onClick={toggleOpen}>Add music</button>

          {open && <div>

          </div>}
        </div>

        <div className="playlist_music-content">
          {playlist_controller.playlistMusic.length > 0 ? (
              <div>
                {
                  playlist_controller.playlistMusic.map((item) => (
                    <CartMusic key={item.id} props={{...item.music,playlistId: item.playlistId }} showRemoveButton={true}
                      playlist={
                        playlist_controller.playlistMusic.map(track => ({
                          id: track.music.id,
                          name: track.music.name,
                          artist: track.music.artist,
                          urlAvatar: track.music.urlAvatar,
                          time: track.music.time,
                          description: track.music.description,
                          genre: track.music.genre,
                          addedAt: track.addedAt,
                          musicId: track.musicId,
                          playlistId: track.playlistId
                        }))
                      } />
                  ))
                }
              </div>
          ) : (
              <div>
                no has
              </div>
          )}
        </div>
      </div>
  )
})

export default PlaylistMusic