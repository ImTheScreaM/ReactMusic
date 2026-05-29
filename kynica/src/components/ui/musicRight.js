import {observer} from "mobx-react-lite";

import music_player_controller from "../../shared/stores/music_player_controller.ts";
import {use_music_player_controller} from "../../hook/hooks";

import "../../assets/css/music.right.css";


const MusicRight = observer(() => {

  const {musicId,isPlay, isLoop,track,playlist} = use_music_player_controller();
  const isOpen = music_player_controller.isOpen;

  console.log(track)
  return (
    <div className='music_right-drop_menu'>

    { (isOpen) && (

      <section className="music_right-container">
        
        <div className="music_right-title">
          {track.name}
        </div>
        
        <div className="music_right-media">
        
        </div>

        <div className="music_right-artist">
          {track.artist}
        </div>

        {track.description && (
          <div className="music_right-description grid">
            <span>TEXT</span>
            <span>{track.description}</span>
          </div>
        )}
        
      </section>
    )}          
    </div>
  )
})

export default MusicRight
