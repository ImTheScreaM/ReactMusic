import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import { CartMusic } from "../../../components/UX/cartMusic";
import music_controller from "../../../shared/stores/music_controller.ts";

import "../../../assets/css/buttons.css";
import "../../../assets/css/main.css";

const Main = observer(() => {
  const navigate = useNavigate();
  const { loadingAllMusic, allMusic, userMusicQuantity } = music_controller;

  if (loadingAllMusic) {
    return <h1>Loading..</h1>;
  }

  return (
    <div className="music_main-container pt-5 w-full">
      <div className="main-favorite_music">
        <div className="favorite_music-title">
          <button className="button_nav" onClick={() => navigate("/favorite")}>
            My Favorite
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 7l7 7-7 7" />
          </svg>
        </div>
        <div className="favorite_music_count justify-center">
          <span>{userMusicQuantity} tracks</span>
        </div>
      </div>

      <div className="music_container-population">
        <div className="population_music">
          <h1 className="population_music-title"> Music </h1>
          <div className="population_music-main">
            {allMusic.map((item) => (
              <CartMusic key={item.id} track={item} playlist={allMusic} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Main;
