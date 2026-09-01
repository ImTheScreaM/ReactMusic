import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import VirtualizationMusic from "../../../components/UX/VirtualizationMusic.tsx";
import { useRootContext } from "../../../shared/di/rootStoreContext.tsx";
import ArtistLogo from "../../../components/UI/artist_logo.jsx";

const Artist = observer(() => {
  const { musicStore } = useRootContext();
  const { id } = useParams();

  useEffect(() => {
    musicStore.get_artist_music(Number(id));
  }, [id, musicStore]);

  return (
    <div>
      {musicStore.loadingArtistMusic ? (
        <div></div>
      ) : (
        <div>
          <ArtistLogo props={musicStore.dataArtist} />
        </div>
      )}

      {musicStore.loadingArtistMusic ? (
        <div> </div>
      ) : (
        <VirtualizationMusic tracks={musicStore.artistMusic} />
      )}
    </div>
  );
});

export default Artist;
