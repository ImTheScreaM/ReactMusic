import { observer } from "mobx-react-lite";

import { useMusicPlayerController } from "../../hook/hooks.jsx";
import music_player_controller from "../../shared/stores/music_player_controller.ts";

import "../../assets/css/music.right.css";

const MusicRight = observer(() => {
  const { track } = useMusicPlayerController();
  const isOpen = music_player_controller.isOpen;

  console.log(track);
  return (
    <div className="music_right-drop_menu">
      {isOpen && (
        <section className="music_right-container">
          <div className="music_right-title">{track.name}</div>

          <div className="music_right-media"></div>

          <div className="music_right-artist">{track.artist}</div>

          {track.description && (
            <div className="music_right-description grid">
              <span>TEXT</span>
              <span>{track.description}</span>
            </div>
          )}
        </section>
      )}
    </div>
  );
});

export default MusicRight;
