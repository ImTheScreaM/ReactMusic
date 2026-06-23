import {useState} from "react";
import playlist_controller from "../../shared/stores/playlist_controller.ts";
import {observer} from "mobx-react-lite";

const DropdownMusicOption = observer(({props,isAuth,showRemoveButton}) => {
  const [openDropList, setOpenDropList] = useState(false)
  const [openPlaylistDropList, setOpenPlaylistDropList] = useState(false)
  const toggleDropList = async () => {
    if(isAuth && openDropList) {
      try {
        await playlist_controller.get_playlist()

      } catch (error) {
        console.log(error)
      }
    }
    setOpenDropList(!openDropList);
    if(openDropList){
      setOpenPlaylistDropList(false);
    }
  }

  const togglePlaylistDrop = () => {
    setOpenPlaylistDropList(!openPlaylistDropList);
  }

  const addToPlaylist = async (playlistId) => {
    try {
      console.log(playlistId,props.id)
      await playlist_controller.add_music_in_playlist(playlistId,props.id);
      setOpenPlaylistDropList(false);
      setOpenDropList(false);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteFromPlaylist = async () => {
    try {
      await playlist_controller.delete_music_from_playlist(props.playlistId,props.id);
      setOpenPlaylistDropList(false);
      setOpenDropList(false);
    } catch (error) {
      console.log(error)
    }
  }


  return (
      <div className="cart_music-options-droplist">
        <button className="droplist-btn" onClick={toggleDropList}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="2"/>
            <circle cx="12" cy="12" r="2"/>
            <circle cx="12" cy="19" r="2"/>
          </svg>
        </button>

        {openDropList && (
            <div className="dropdown-menu">
              <button onClick={togglePlaylistDrop}>
                {openPlaylistDropList ? '← Назад' : 'Добавить в плейлист'}
              </button>

              {showRemoveButton && (
                  <button onClick={deleteFromPlaylist}>
                    Удалить
                  </button>
              )}

            </div>
        )}

        {openDropList && openPlaylistDropList && (
            <div className="playlist-submenu">
              {playlist_controller.playlists.length > 0 ? (
                  playlist_controller.playlists.map((item) => (
                      <button onClick={() => addToPlaylist(item.id)}>
                        <span>{item.name}</span>
                      </button>
                  ))
              ) : (
                  <div>
                    <span>No has playlist</span>
                  </div>
              )}
            </div>
        )}


      </div>
  )
})

export default DropdownMusicOption;