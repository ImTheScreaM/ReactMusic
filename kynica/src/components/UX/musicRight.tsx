import { observer } from "mobx-react-lite";


import "../../assets/css/music.right.css";
import { useRootContext } from "../../shared/di/rootStoreContext.tsx";

const MusicRight = observer(() => {
  const { musicPlayerStore } = useRootContext();

  return (
    <div className="music_right-drop_menu">
      {musicPlayerStore.isOpen && (
        <section className="music_right-container">
          <div className="music_right-title">{musicPlayerStore.name}</div>

          <div className="music_right-media"></div>

          <div className="music_right-artist">{musicPlayerStore.artist}</div>

          {musicPlayerStore.description && (
            <div className="music_right-description grid">
              <span>TEXT</span>
              <span>{musicPlayerStore.description}</span>
            </div>
          )}
        </section>
      )}
    </div>
  );
});

export default MusicRight;
