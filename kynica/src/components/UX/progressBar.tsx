import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";

import { useRootContext } from "../../shared/di/rootStoreContext.tsx";

import "../../assets/css/progress.css";

const ProgressBar = observer(() => {
  const {musicPlayerStore} = useRootContext();
  const [isDragging, setIsDragging] = useState(false);
  const progressRefBar = useRef(null);

  const handleSeek = (e) => {
    if (!progressRefBar.current) return;

    const rect = progressRefBar.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    const percent = x / rect.width;
    const newTime = percent * musicPlayerStore.duration;
    if (!isNaN(newTime)) {
      musicPlayerStore.seek(newTime);
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    handleSeek(e);

    const handleMouseMove = (moveEvent) => {
      handleSeek(moveEvent);
    };

    const handleMouseUp = () => {
      setIsDragging(false);

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const progress = musicPlayerStore.getProgressPercent();

  return (
    <div className="progress-container">
      <div className="time-current">
        {musicPlayerStore.formatTimer(
          musicPlayerStore.currentTime,
        )}
      </div>
      <div
        ref={progressRefBar}
        className={`progress-bar ${isDragging ? "dragging" : ""}`}
        onMouseDown={handleMouseDown}
      >
        <div className="progress-fill" style={{ width: `${progress}%` }} />
        <div className="volume-handle" style={{ left: `${progress}%` }} />
      </div>
    </div>
  );
});

export default ProgressBar;
