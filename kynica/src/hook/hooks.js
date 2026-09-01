import { useCallback } from "react";
import { useRootContext } from "../shared/di/rootStoreContext.tsx";

// export function useToggleMusic(musicId, track, playlist) {
//   const {musicPlayerStore} = useRootContext();

//   if (!track || !musicId) return console.log("music_id is null");

//   if (musicPlayerStore.musicId !== musicPlayerStore.id)
//     return musicPlayerStore.play(track.id, track, playlist);

//   musicPlayerStore.isPlaying ? musicPlayerStore.pause() : musicPlayerStore.resume();
// }

export const useUserTogglFavoriteMusic = () => {
  const { musicStore } = useRootContext();
  return useCallback(
    (track) => {
      musicStore.add_rm_user_music(track);
    },
    [musicStore],
  );
};
