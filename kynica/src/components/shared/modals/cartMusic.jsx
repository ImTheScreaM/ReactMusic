import "../../../assets/css/cart_music.css";
import ApiRequest from "./apiRequest.js";
import { useAuth } from "./authContext.jsx";

export const CartMusic = ({ props }) => {
  console.log(props);

  const { isAuth } = useAuth();

  function favorite_music(e) {
    if(isAuth) {
      const target = props;
      ApiRequest("http://localhost:3003/add_music","POST",target);
    } else {
      console.log("No register");
    }
    
    
  }

  return (
    <div className="cart_music-container">
      <div className="cart_music">
        <div className="cart_music-left_information">
          <div className="cart_music-image">
            <img src={props.url} />
          </div>
          <div className="cart_music_information ">
            <p className="cart_music-name">{props.name}</p>
            <p className="cart_music-author">{props.author}</p>
          </div>
        </div>
        <div className="cart_music-right_information">
          <button onClick={(e) => favorite_music(e)}>LIKE</button>
          <p>{props.time}</p>
        </div>
      </div>
    </div>
  );
};
