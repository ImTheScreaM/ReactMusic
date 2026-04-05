import {observer} from "mobx-react-lite";
import {useState,useRef} from "react";

import music_player_controller from "../../shared/stores/music_player_controller.ts";

import "../../assets/css/volume.css"

const VolumeBar = observer(() => {
  const [isDragging,setIsDragging] = useState(false);
  const volumeRefBar = useRef(null);
  const volumePercent = music_player_controller.getVolumePercent()
  const isMuted = music_player_controller.isMuted;

  const handleChangeVolume = (e) => {
    if(!volumeRefBar.current) return;

    const rect = volumeRefBar.current.getBoundingClientRect();
    let y = e.clientY - rect.top;
    y = Math.max(0,Math.min(y,rect.height));
    const percent = 1 - (y / rect.height);
    music_player_controller.setVolume(percent);
  }

  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(true);
    handleChangeVolume(e);

    const handleMouseMove = (mouseMove) => {
      handleChangeVolume(mouseMove);
    }

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove",handleMouseMove);
      document.removeEventListener("mouseup",handleMouseUp);
    }

    document.addEventListener("mousemove",handleMouseMove);
    document.addEventListener("mouseup",handleMouseUp);

  }

  return (
    <div className="volume-control-vertical">
      <div ref={volumeRefBar}
           className="volume-bar-vertical opacity-0"
           onMouseDown={handleMouseDown}

      >
        <div className="volume-fill-vertical"
        style={{height:`${volumePercent}%`}}/>
        <div className="volume-handle-vertical"
        style={{bottom:`${volumePercent}%`}}/>
      </div>
      <button className="volume-icon-btn"
      onClick={() => music_player_controller.toggleMuted()}>
        {isMuted ?
          (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
              <path d="M11 5L6 9H2V15H6L11 19V5Z"
                    stroke="currentColor"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>>
              <line x1="2" y1="19" x2="14" y2="4"
                    stroke="currentColor"
                    stroke-width="1"
                    stroke-linecap="round"/>>
            </svg>
          ) :
          (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
              <path d="M11 5L6 9H2V15H6L11 19V5Z"
                    stroke="currentColor"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>>
              <line x1="15.5" y1="8" x2="15.5" y2="16"
                    stroke="currentColor"
                    stroke-width="1"
                    stroke-linecap="round"/>>
            </svg>
          )
        }
      </button>
    </div>
  )
})

export default VolumeBar