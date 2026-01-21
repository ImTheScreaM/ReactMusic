import '../../../assets/css/main.css';
import { CartMusic } from '../../shared/modals/CartMusic';

const TEST = [
    {
        id: 1,
        name: 'Reborn',
        author: 'Теппо',
        time: 214,
        url: 'https://images.genius.com/4359a58369263453193e9d898edce2d1.1000x1000x1.jpg',
    },
    {
        id: 1,
        name: 'Reborn',
        author: 'Теппо',
        time: 214,
        url: 'https://images.genius.com/4359a58369263453193e9d898edce2d1.1000x1000x1.jpg',
    },
];

const Main = () => {
    return (
        <div className="music_main-container">
            <h1>Main</h1>
            <div className="music_container">
                <div className="favorite_music">
                    <h1 className="favorite_music-header"> Your Music </h1>
                    <div className="favorite_music-main">
                        {TEST.map(item => (
                            <CartMusic props={{ ...item }} />
                        ))}
                    </div>
                </div>

                <div className="population_music">
                    <h1 className="population_music-header"> Populate Now </h1>
                    <div className="population_music-main"></div>
                </div>
            </div>

            <div className="navigation_container">
                <ul>
                    <li>MAIN</li>
                    <li>MY_MUSIC</li>
                </ul>
            </div>
        </div>
    );
};

export default Main;
