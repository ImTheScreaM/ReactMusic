import {useNavigate} from "react-router-dom";

import auth_store from "../../../shared/stores/auth_store.ts";

import "../../../assets/css/main.css";
import "../../../assets/css/buttons.css"

const Main = () => {
  const navigate = useNavigate()



  return (
    <div className="music_main-container pt-5">

      <div className="music_container-favorite">
        <div className="favorite_music">
          <div className="favorite_music-title">
            <button className="button_nav" onClick={() => navigate("/favorite")}>My Favorite</button>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 7l7 7-7 7" />
            </svg>
          </div>
        </div>

        <div className="music_container-population">
          <div className="population_music">
            <h1 className="population_music-title"> Populate Now </h1>
            <div className="population_music-main"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
