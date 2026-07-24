import { observer } from "mobx-react-lite";

import {
  useAuthStore,
  useMusicPlayer,
  useMusicPlayerController,
  userTogglFavoriteMusic,
  toggleMusic,
} from "../../hook/hooks.jsx";
import music_player_controller from "../../shared/stores/music_player_controller.ts";
import {
  DislikeSvg,
  LeftArrowSvg,
  LikeSvg,
  LoopSvg,
  NoLoopSvg,
  PauseSvg,
  ResumeSvg,
  RightArrowSvg,
} from "../UI/SVG.js";
import ProgressBar from "./progressBar.jsx";
import VolumeBar from "./volumeBar.jsx";

import "../../assets/css/music.bottom.css";

const MusicBottom = observer(() => {
  const { musicId, isPlay, isLoop, track } = useMusicPlayerController();
  const { userMusic } = useMusicPlayer();
  const { isAuth } = useAuthStore();

  console.log(track);

  return (
    <section className="music_bottom-container">
      <div className="progress_music">
        <ProgressBar />
      </div>

      <div className="music_player">
        <div
          className="absolute w-full"
          onClick={() => music_player_controller.toggleOpen()}
        ></div>

        <div className="music_player-info">
          <div className="track-info">
            <img
              src={`http://localhost:3003${track.urlAvatar.replaceAll(" ", "%20")}`}
              alt=""
              className="track-img"
            />
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
          <button
            onClick={() => userTogglFavoriteMusic({ track, isAuth })}
            className={`like-button ${track.isLiked ? "active" : ""}`}
          >
            <LikeSvg />
          </button>

          <button
            className="previus-track-button"
            onClick={() => music_player_controller.prevTrack()}
          >
            <LeftArrowSvg />
          </button>

          <button
            className="pause-resume-button"
            onClick={() => toggleMusic(musicId, track)}
          >
            {isPlay ? <PauseSvg /> : <ResumeSvg />}
          </button>

          <button
            onClick={() => music_player_controller.nextTrack(userMusic)}
            className="next-track-button"
          >
            <RightArrowSvg />
          </button>

          <button
            onClick={() => music_player_controller.loopMusic()}
            className={`loop-button ${isLoop ? "active" : ""}`}
          >
            {isLoop ? <LoopSvg /> : <NoLoopSvg />}
          </button>

          <button className="dislike-button">
            <DislikeSvg />
          </button>
        </div>

        <div className="music_player-meta">
          <VolumeBar />
        </div>
      </div>
    </section>
  );
});

export default MusicBottom;
