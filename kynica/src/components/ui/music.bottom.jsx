import {observer} from "mobx-react-lite";

import music_player_controller from "../../shared/stores/music_player_controller.ts";
import music_controller from "../../shared/stores/music_controller.ts";
import VolumeBar from "./volume_bar";
import ProgressBar from "./progress_bar";

const MusicBottom = observer(() => {
  const musicId = music_player_controller.musicId;
  const isPlay = music_player_controller.isPlaying;
  const isLoop = music_player_controller.isLoop;

  const track = music_player_controller.trackData;

  console.log(isPlay)

  function toggle_favorite_music(e) { // <- УЖЕ ПОЧТИ НЕ ТЕСТОВАЯ ХУЙНЯ =))),(или ъуй его знает)
    music_controller.add_rm_user_music(musicId);

  }
  function toggle_music(e) {
    return isPlay ? music_player_controller.pause() : music_player_controller.play(musicId,track);
  }


  return (
    <section className="music_bottom-container">
      <div className="progress_music">
        <ProgressBar/>
      </div>
      <div className="music_player">
        <div className="music_player-info"></div>
        <div className="music_player-sonata">

          <button className="like-button">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.501 5.501 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    stroke="currentColor"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>
            </svg>
          </button>

          <button className="previus-track-button">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
              <path d="M19 20L9 12L19 4V20Z"
                    stroke="currentColor"
                    stroke-width="1"
                    fill="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>>
              <path d="M5 19V5"
                    stroke="currentColor"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>>
            </svg>
          </button>

          <button className="pause-resume-button" onClick={toggle_music}>
            {isPlay ?
              (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1"/>>
                  <path d="M9 9H11V15H9V9ZM13 9H15V15H13V9Z" fill="currentColor"/>>
                </svg>

              ) :
              (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1"/>>
                  <path d="M10 8V16L16 12L10 8Z" fill="currentColor"/>>
                </svg>
              )
            }
          </button>

          <button className="next-track-button">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
              <path d="M5 4L15 12L5 20V4Z"
                    stroke="currentColor"
                    fill="black"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>>
              <path d="M19 5V19"
                    stroke="currentColor"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>>
            </svg>
          </button>

          <button className="loop-button">
            {isLoop ?
              (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
                  <path d="M17 9V7H7V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>>
                  <path d="M15 11L17 9L15 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>>
                  <path d="M7 15V17H17V15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>>
                  <path d="M9 13L7 15L9 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>>
                  <path d="M11 11.5L12 10.5V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>>
                </svg>

              ) :
              (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
                  <path d="M17 9V7H7V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>>
                  <path d="M15 11L17 9L15 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>>
                  <path d="M7 15V17H17V15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>>
                  <path d="M9 13L7 15L9 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>>
                </svg>
              )
            }
          </button>

          <button className="dislike-button">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.501 5.501 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    stroke="currentColor"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>>
              <line x1="1" y1="3" x2="22" y2="19"
                    stroke="currentColor"
                    stroke-width="1"
                    stroke-linecap="round"/>>
            </svg>
          </button>

        </div>
        <div className="music_player-meta">
          <VolumeBar/>
        </div>
      </div>

    </section>
  )
})

export default MusicBottom