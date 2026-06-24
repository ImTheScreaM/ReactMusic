import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";

import music_controller from "../../../shared/stores/music_controller.ts";
import {CartMusic} from "../../../components/ui/cartMusic";


import "../../../assets/css/main.css";
import "../../../assets/css/buttons.css"
import UploadMusic from "../../../components/ui/uploadMusic";


const Main = observer(() => {
  const navigate = useNavigate()
  const {allMusicLoading,allMusic,userMusicQuantity} = music_controller

  if(allMusicLoading) {
    return <h1>Loading..</h1>
  }

  return (
    <div className="music_main-container pt-5 w-full">
      <UploadMusic/>
      <div className="main-favorite_music">
        <div className="favorite_music-title">
          <button className="button_nav" onClick={() => navigate("/favorite")}>My Favorite</button>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              <CartMusic props={{...item}} playlist={allMusic}/>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
});

export default Main;
