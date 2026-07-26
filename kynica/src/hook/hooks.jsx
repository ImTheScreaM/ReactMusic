import { toast } from "react-toastify";
import auth_store from "../shared/stores/auth_store.ts";
import music_controller from "../shared/stores/music_controller.ts";
import music_player_controller from "../shared/stores/music_player_controller.ts";
import search_controller from "../shared/stores/search_controller.ts";

export function toggleMusic(musicId, track, playlist) {
  const controller = music_player_controller;

  if (!track || !musicId) return console.log("music_id is null");

  if (controller.musicId !== track.id)
    return music_player_controller.play(track.id, track, playlist);

  controller.isPlaying ? controller.pause() : controller.resume();
}

export function useMusicPlayerController() {
  const musicId = music_player_controller.musicId;
  const isPlay = music_player_controller.isPlaying;
  const isLoop = music_player_controller.isLoop;
  const track = music_player_controller.trackData;
  const playlist = music_player_controller.playlist;

  return {
    musicId,
    isPlay,
    isLoop,
    track,
    playlist,
  };
}

export function useMusicPlayer() {
  const userMusic = music_controller.userMusic;
  const allMusic = music_controller.allMusic;
  const userMusicQuantity = music_controller.userMusicQuantity;
  const userMusicLoading = music_controller.loadingAllMusic;
  const allMusicLoading = music_controller.userAllMusic;

  return {
    userMusic,
    allMusic,
    userMusicQuantity,
    userMusicLoading,
    allMusicLoading,
  };
}

export function useAuthStore() {
  const isAuth = auth_store.isAuth;
  const isLoading = auth_store.isLoading;

  return {
    isAuth,
    isLoading,
  };
}

export function useSearchController() {
  const result = search_controller.result;
  const searchPlaylist = search_controller.searchPlaylist;
  const searchLoading = search_controller.searchLoading;

  return {
    result,
    searchPlaylist,
    searchLoading,
  };
}

export function userTogglFavoriteMusic(props) {
  music_controller.add_rm_user_music(props.track);
}
