import {useParams} from "react-router-dom";
import {useEffect} from "react";


import playlist_controller from "../../../shared/stores/playlist_controller.ts";
import {observer} from "mobx-react-lite";
import {CartMusic} from "../../../components/ui/cartMusic";

const PlaylistMusic = observer(() => {
  const {id} = useParams();

  const isLoading = playlist_controller.isLoading;

  useEffect(() => {
    playlist_controller.get_music_playlist(id);
  },[])

  if(isLoading) return (
      <div>Loading...</div>
  )

  const flattenedPlaylist = playlist_controller.playlistMusic.map(item => ({
    id: item.music.id,
    name: item.music.name,
    artist: item.music.artist,
    urlAvatar: item.music.urlAvatar,
    time: item.music.time,
    description: item.music.description,
    genre: item.music.genre,
    addedAt: item.addedAt,
    musicId: item.musicId,
    playlistId: item.playlistId
  }));

  console.log(playlist_controller.playlistMusic)

  return (
      <div className="playlist_music">
        <div className="add_music-btn">

        </div>

        <div className="playlist_music-content">
          {playlist_controller.playlistMusic.length > 0 ? (
              <div>
                {
                  playlist_controller.playlistMusic.map((item) => (
                    <CartMusic key={item.id} props={{...item.music }} playlist={playlist_controller.playlistMusic.map(track => ({
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
                    }))} />
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