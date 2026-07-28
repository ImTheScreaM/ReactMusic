import { AuthController } from "./auth_store.ts";
import { Music } from "./music_controller.ts";
import { MusicPlayer } from "./music_player_controller.ts";
import { Playlist } from "./playlist_controller.ts";
import { Search } from "./search_controller.ts";
import { User } from "./user_store_controller.ts";

export class RootStore {
  authStore:AuthController;
  musicStore:Music;
  musicPlayerStore:MusicPlayer;
  playlistStore:Playlist;
  searchStore:Search;
  userStore:User;

  constructor() {
    this.authStore = new AuthController(this);
    this.musicStore = new Music(this);
    this.musicPlayerStore = new MusicPlayer(this);
    this.playlistStore = new Playlist(this);
    this.searchStore = new Search(this);
    this.userStore = new User(this);
  }

  dispose() {
    this.authStore.dispose();
  }

}