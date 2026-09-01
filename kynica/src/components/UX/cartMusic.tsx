import { useCallback } from "react";
import { NavLink } from "react-router-dom";

import DropdownMusicOption from "./dropdownMusicOption.tsx";
import LikeButton from "./likeButton.tsx";
import { useRootContext } from "../../shared/di/rootStoreContext.tsx";
import { ICartMusic } from "../../shared/interface/intarface.ts";

import "../../assets/css/cart_music.css";

export const CartMusic = ({
  track,
  playlist,
  showRemoveButton,
  isDropDownMenu,
  setOpenTrackId,
}: ICartMusic) => {
  const { musicPlayerStore } = useRootContext();

  const handlePlay = useCallback(() => {
    musicPlayerStore.toggleMusic(track.id, track);
  }, [track, musicPlayerStore]);

  return (
    <div className="cart_music-container">
      <div className="cart_music">
        <div className="cart_music-left_information">
          <div className="cart_music-image">
            <button onClick={handlePlay}>
              <img
                loading="lazy"
                src={
                  track.urlAvatar
                    ? `${process.env.REACT_APP_URL_SERVER}${track.urlAvatar.replaceAll(" ", "%20")}`
                    : "null"
                }
                alt={"img"}
              />
            </button>
          </div>
          <div className="cart_music_information">
            <p className="cart_music-name">{track.name}</p>
            <NavLink to={`/artist/${track.userWhoAdd}`}>
              <p className="cart_music-artist">{track.artist}</p>
            </NavLink>
          </div>
        </div>
        <div className="cart_music-right_information">
          <LikeButton track={track} />
          <p style={{ fontSize: "1.1rem" }}>
            {Math.floor(track.time / 60)}:
            {String(track.time % 60).padStart(2, "0")}
          </p>

          <DropdownMusicOption
            track={track}
            showRemoveButton={showRemoveButton}
            isOpen={isDropDownMenu}
            setOpenTrackId={setOpenTrackId}
          />
        </div>
      </div>
    </div>
  );
};
