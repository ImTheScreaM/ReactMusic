import music_player_controller from "../shared/stores/music_player_controller.ts";
import music_controller from "../shared/stores/music_controller.ts";
import auth_store from "../shared/stores/auth_store.ts";

export function toggle_music(isPlay,musicId,track,playlist) {
  if(!track || !musicId) return console.log("music_id is null");

  const oldTrackId = music_player_controller.musicId;

  if( oldTrackId !== track.id) return music_player_controller.play(track.id,track,playlist);

  isPlay ?
      music_player_controller.pause()
      :
      music_player_controller.resume();

}

export function use_music_player_controller() {

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

  }
}

export function use_music_player() {
  const userMusic = music_controller.userMusic;
  const allMusic = music_controller.allMusic;
  const userMusicQuantity = music_controller.userMusicQuantity;
  const userMusicLoading= music_controller.loadingAllMusic;
  const allMusicLoading = music_controller.userAllMusic;

  return {
    userMusic,
    allMusic,
    userMusicQuantity,
    userMusicLoading,
    allMusicLoading
  }
}

export function use_auth_store() {
  const isAuth = auth_store.isAuth
  const isLoading = auth_store.isLoading;

  return {
    isAuth,
    isLoading
  }
}