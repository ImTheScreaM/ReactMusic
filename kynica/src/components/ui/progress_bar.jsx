import music_player_controller from "../../shared/stores/music_player_controller.ts";
import {useState, useRef, useEffect} from "react";

import "../../assets/css/progress.css"
import {observer} from "mobx-react-lite";

const ProgressBar = observer(() => {
  const [isDragging,setIsDragging] = useState(false);
  const progressRefBar = useRef(null);


  const handleSeek = (e) => {
    if (!progressRefBar.current) return;

    const rect = progressRefBar.current.getBoundingClientRect()
    let x = e.clientX - rect.left;
    x = Math.max(0,Math.min(x,rect.width));
    const percent = x / rect.width;
    const newTime = percent * music_player_controller.duration;
    if (!isNaN(newTime)) {
      music_player_controller.seek(newTime);
    }
  }

  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(true);
    handleSeek(e);

    const handleMouseMove = (moveEvent) => {
      handleSeek(moveEvent);
    };

    const handleMouseUp = () => {
      setIsDragging(false);

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  const progress = music_player_controller.getProgressPercent();


  return (
    <div className="progress-container">
      <div className="time-current">
        {music_player_controller.formatTimer(music_player_controller.currentTime)}
      </div>
      <div ref={progressRefBar}
           className={`progress-bar ${isDragging ? 'dragging' : ''}`}
           onMouseDown={handleMouseDown}>
        <div className="progress-fill"
             style={{width:`${progress}%`}}/>
        <div className="volume-handle"
             style={{left:`${progress}%`}}/>
      </div>
    </div>
  )
})

export default ProgressBar