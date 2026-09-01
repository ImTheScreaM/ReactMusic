import "../../assets/css/artist_logo.css";
import { LikeSvg } from "./SVG";

const ArtistLogo = ({ props }) => {
  return (
    <div className="artist_logo_container">
      <img
        className="artist_logo_img"
        src={
          props.urlAvatar !== "null"
            ? `http://localhost:3003${props.urlAvatar}`
            : ""
        }
        alt={"artist_avatar"}
      />
      <div className="artist_logo_btn">
        <div className="artist_logo_name">{props.name}</div>
        <LikeSvg />
      </div>
    </div>
  );
};

export default ArtistLogo;
