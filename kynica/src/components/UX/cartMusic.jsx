import { toggleMusic } from "../../hook/hooks";
import DropdownMusicOption from "./dropdownMusicOption";

import { memo, useCallback } from "react";
import "../../assets/css/cart_music.css";
import LikeButton from "./likeButton";

export const CartMusic = memo(
  ({ track, playlist, showRemoveButton = false }) => {
    const handlePlay = useCallback(() => {
      toggleMusic(track.id, track, playlist);
    }, [track, playlist]);

    console.log(track);
    

    return (
      <div className="cart_music-container">
        <div className="cart_music">
          <div className="cart_music-left_information">
            <div className="cart_music-image">
              <button onClick={handlePlay}>
                <img
                  loading="lazy"
                  src={`http://localhost:3003${track.urlAvatar.replaceAll(" ", "%20")}`}
                />
              </button>
            </div>
            <div className="cart_music_information">
              <p className="cart_music-name">{track.name}</p>
              <p className="cart_music-artist">{track.artist}</p>
            </div>
          </div>
          <div className="cart_music-right_information">
            <LikeButton track={track} />
            <p>
              {Math.floor(track.time / 60)}:
              {String(track.time % 60).padStart(2, "0")}
            </p>

            <DropdownMusicOption
              track={track}
              showRemoveButton={showRemoveButton}
            />
          </div>
        </div>
      </div>
    );
  },
);
