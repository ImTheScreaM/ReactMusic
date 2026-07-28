import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";

import { useRootContext } from "../../shared/di/rootStoreContext.tsx";
import { MutedVolumeSvg, VolumeSvg } from "../UI/SVG.js";

import "../../assets/css/volume.css";

const VolumeBar = observer(() => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const volumeRefBar = useRef(null);

  const { musicPlayerStore } = useRootContext();

  const volumePercent = musicPlayerStore.getVolumePercent();
  const isMuted = musicPlayerStore.isMuted;

  const handleChangeVolume = (e) => {
    if (!volumeRefBar.current) return;

    const rect = volumeRefBar.current.getBoundingClientRect();
    let y = e.clientY - rect.top;
    y = Math.max(0, Math.min(y, rect.height));
    const percent = 1 - y / rect.height;
    musicPlayerStore.setVolume(percent);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    handleChangeVolume(e);

    const handleMouseMove = (mouseMove) => {
      handleChangeVolume(mouseMove);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }; 

  return (
    <div
      className="volume-control-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`volume-slider-container ${isHovered || isDragging ? "visible" : ""}`}
      >
        <div
          ref={volumeRefBar}
          className="volume-bar-vertical"
          onMouseDown={handleMouseDown}
        >
          <div
            className="volume-fill-vertical"
            style={{ height: `${volumePercent}%` }}
          />
          <div
            className="volume-handle-vertical"
            style={{ bottom: `${volumePercent}%` }}
          />
        </div>
      </div>

      <button
        className="volume-icon-btn"
        onClick={() => musicPlayerStore.toggleMuted()}
      >
        {isMuted || volumePercent === 0 ? <MutedVolumeSvg /> : <VolumeSvg />}
      </button>
    </div>
  );
});

export default VolumeBar;
