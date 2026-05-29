import {CartMusic} from "../../../shared/modals/cartMusic";

import "../../../assets/css/favorite.css"
import {observer} from "mobx-react-lite";
import {use_music_player} from "../../../hook/hooks";
import {useEffect} from "react";
import music_controller from "../../../shared/stores/music_controller.ts";

const Favorite = observer(() => {
    const {userMusic,isLoading} = use_music_player();

    useEffect(() => {
      music_controller.get_user_music()
    },[])

    //console.log(music)
    if(isLoading) {
      return <div>Загрузка ...</div>
    }



    if(!userMusic) {
      return <div>Null</div>
    }
  console.log(userMusic)
    return (
        <div className="favorite_music">
            <h1 className="favorite_music-header"> Your Music </h1>
            <div className="favorite_music-main">
                {userMusic.getMusic.map((item) => (
                    <CartMusic props={{ ...item }} playlist={userMusic.getMusic} />
                ))}
            </div>
        </div>
    )
});


export default Favorite