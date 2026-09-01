import { observer } from "mobx-react-lite";

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

import { useUserTogglFavoriteMusic } from "../../hook/hooks.js";
import { useRootContext } from "../../shared/di/rootStoreContext.tsx";
import ProgressBar from "./progressBar.tsx";
import VolumeBar from "./volumeBar.tsx";

import "../../assets/css/music.bottom.css";

const MusicBottom = observer(() => {
  const {musicPlayerStore } = useRootContext();
  const toggleMusic = useUserTogglFavoriteMusic();

  return (
    <section className="music_bottom-container">
      <div className="progress_music">
        <ProgressBar />
      </div>

      <div className="music_player">
        <div className="" onClick={() => musicPlayerStore.toggleOpen()}></div>

        <div className="music_player-info">
          <div className="track-info">
            <img
              src={`${process.env.REACT_APP_URL_SERVER}${musicPlayerStore.trackData?.urlAvatar.replaceAll(" ", "%20")}`}
              alt=""
              className="track-img"
            />
            <div className="grid">
              <div className="music-info-name">
                <span className="track-name">
                  {musicPlayerStore.trackData?.name}
                </span>
              </div>
              <div className="music-info-artist">
                <span className="track-artist">
                  {musicPlayerStore.trackData?.artist}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="music_player-sonata">
          <button
            onClick={() => toggleMusic(musicPlayerStore.trackData)}
            className={`like-button ${musicPlayerStore.trackData?.isLiked ? "active" : ""}`}
          >
            <LikeSvg />
          </button>

          <button
            className="previus-track-button"
            onClick={() => musicPlayerStore.prevTrack()}
          >
            <LeftArrowSvg />
          </button>

          <button
            className="pause-resume-button"
            onClick={() =>
              musicPlayerStore.toggleMusic(
                musicPlayerStore.musicId,
                musicPlayerStore.trackData,
              )
            }
          >
            {musicPlayerStore.isPlaying ? <PauseSvg /> : <ResumeSvg />}
          </button>

          <button
            onClick={() => musicPlayerStore.nextTrack()}
            className="next-track-button"
          >
            <RightArrowSvg />
          </button>

          <button
            onClick={() => musicPlayerStore.loopMusic()}
            className={`loop-button ${musicPlayerStore.isLoop ? "active" : ""}`}
          >
            {musicPlayerStore.isLoop ? <LoopSvg /> : <NoLoopSvg />}
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
