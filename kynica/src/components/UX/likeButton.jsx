import { observer } from "mobx-react-lite";

import { useUserTogglFavoriteMusic } from "../../hook/hooks";
import { LikeSvg } from "../UI/SVG";

const LikeButton = observer(({ track }) => {
  const toggleMusic = useUserTogglFavoriteMusic()
  return (
    <button
      className={`like-button ${track.isLiked ? "active" : ""}`}
      onClick={() => toggleMusic(track )}
    >
      <LikeSvg />
    </button>
  );
});

export default LikeButton;
