import { observer } from "mobx-react-lite";

import { userTogglFavoriteMusic } from "../../hook/hooks";
import { LikeSvg } from "../UI/SVG";

const LikeButton = observer(({track}) => {
  
  return (
    <button
      className={`like-button ${track.isLiked ? "active" : ""}`}
      onClick={() => userTogglFavoriteMusic({track})}
    >
      <LikeSvg />
    </button>
  );
})

export default LikeButton