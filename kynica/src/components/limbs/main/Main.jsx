import "../../../assets/css/main.css";

const Main = () => {
    return (
        <div className="music_main-container">
            <h1>Main</h1>
            <div className="music_container">
                <div className="favorite_music">
                    <h1 className="favorite_music-header"> Your Music </h1>
                    <div className="favorite_music-main"></div>
                </div>

                <div className="population_music">
                    <h1 className="population_music-header"> Populate Now </h1>
                    <div className="population_music-main"></div>
                </div>
            </div>

            <div className="navigation_container"></div>
        </div>
    );
};

export default Main;
