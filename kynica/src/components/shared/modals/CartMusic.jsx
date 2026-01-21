import '../../../assets/css/cart_music.css';

export const CartMusic = ({ props }) => {
    console.log(props);

    return (
        <div className="cart_music-container">
            <div>
                <img src={props.url} />
            </div>
            <div className="cart_music-information">
                <div>
                    <p className="cart_music-name">{props.name}</p>
                    <p className="cart_music-author">{props.author}</p>
                </div>
                <div>
                    <p>{props.time}</p>
                </div>
            </div>
        </div>
    );
};
