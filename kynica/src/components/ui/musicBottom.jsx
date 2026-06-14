import {observer} from "mobx-react-lite";

import {toggle_music, use_music_player, use_music_player_controller} from "../../hook/hooks";
import music_player_controller from "../../shared/stores/music_player_controller.ts";
import music_controller from "../../shared/stores/music_controller.ts";
import ProgressBar from "./progressBar";
import VolumeBar from "./volumeBar";

import "../../assets/css/music.bottom.css"


const MusicBottom = observer(() => {
  const {musicId,isPlay,isLoop,track} = use_music_player_controller();
  const {userMusic} = use_music_player();

  function toggle_favorite_music(e) {
    music_controller.add_rm_user_music(musicId);
  }


  return (

      <section className="music_bottom-container">

        <div className="progress_music">
          <ProgressBar/>
        </div>

        <div className="music_player">

          <div className="absolute w-full" onClick={() => music_player_controller.toggleOpen()}></div>

          <div className="music_player-info">
            <div className="track-info">
              <img src={track.urlAvatar} alt="" className="track-img"/>
              <div className="grid">
                <div className="music-info-name">
                  <span className="track-name">{track.name}</span>
                </div>
                <div className="music-info-artist">
                  <span className="track-artist">{track.artist}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="music_player-sonata">

            <button onClick={toggle_favorite_music}
                    className={`like-button ${track.isLiked ? 'active' : ''}`}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.501 5.501 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"/>
              </svg>

            </button>

            <button className="previus-track-button"
                    onClick={() => music_player_controller.prevTrack()}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
                <path d="M19 20L9 12L19 4V20Z"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"/>>
                <path d="M5 19V5"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"/>>
              </svg>
            </button>

            <button className="pause-resume-button" onClick={() => toggle_music(isPlay,musicId,track)}>
              {isPlay ?
                (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1"/>>
                    <path d="M9 9H11V15H9V9ZM13 9H15V15H13V9Z" fill="currentColor"/>>
                  </svg>

                ) :
                (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1"/>>
                    <path d="M10 8V16L16 12L10 8Z" fill="currentColor"/>>
                  </svg>
                )
              }
            </button>

            <button onClick={() => music_player_controller.nextTrack(userMusic)}
                    className="next-track-button">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
                <path d="M5 4L15 12L5 20V4Z"
                      stroke="currentColor"
                      fill="black"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"/>>
                <path d="M19 5V19"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"/>>
              </svg>
            </button>

            <button onClick={() => music_player_controller.loopMusic()} className={`loop-button ${isLoop ? 'active' : ''}`}>
              {isLoop ?
                (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
                    <path d="M17 9V7H7V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>>
                    <path d="M15 11L17 9L15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>>
                    <path d="M7 15V17H17V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>>
                    <path d="M9 13L7 15L9 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>>
                    <path d="M11 11.5L12 10.5V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>>
                  </svg>

                ) :
                (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
                    <path d="M17 9V7H7V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>>
                    <path d="M15 11L17 9L15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>>
                    <path d="M7 15V17H17V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>>
                    <path d="M9 13L7 15L9 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>>
                  </svg>
                )
              }
            </button>

            <button className="dislike-button">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.501 5.501 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"/>>
                <line x1="1" y1="3" x2="22" y2="19"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"/>>
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
