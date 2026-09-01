import { useState } from "react";
import { Virtuoso } from "react-virtuoso";

import { CartMusic } from "./cartMusic.tsx";
import {
  IRow,
  IVirtualizationMusic,
} from "../../shared/interface/intarface.ts";

const Row = ({
  index,
  style,
  tracks,
  openTrackId,
  setOpenTrackId,
  showRemoveButton,
}: IRow) => {
  const track = tracks[index];
  const isOpen = openTrackId === track.id;

  return (
    <div style={{ ...style, zIndex: isOpen ? 100 : 1, position: "relative" }}>
      <CartMusic
        isDropDownMenu={isOpen}
        setOpenTrackId={setOpenTrackId}
        track={track}
        playlist={tracks}
        showRemoveButton={showRemoveButton}
      />
    </div>
  );
};

const VirtualizationMusic = ({
  tracks,
  showRemoveButton = false,
}: IVirtualizationMusic) => {
  const [openTrackId, setOpenTrackId] = useState<number | null>(null);

  return (
    <div>
      <Virtuoso
        style={{
          width: "100%",
          height: "770px",
        }}
        data={tracks}
        itemContent={(index, track) => {
          const isOpen = openTrackId === track.id;
          return (
            <div
              style={{
                zIndex: isOpen ? 100 : 1,
                position: "relative",
                padding: "5px",
              }}
            >
              <CartMusic
                isDropDownMenu={isOpen}
                setOpenTrackId={setOpenTrackId}
                track={track}
                playlist={tracks}
                showRemoveButton={showRemoveButton}
              />
            </div>
          );
        }}
      />
    </div>
  );
};

export default VirtualizationMusic;
