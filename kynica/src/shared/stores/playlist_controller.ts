import { flow, makeAutoObservable, runInAction } from "mobx";
import { playlistApi } from "../api/playlist.api.ts";
import { RootStore } from "./rootStore.ts";

export class Playlist {
  rootStore: RootStore;
  playlists = [];
  playlistMusic = [];

  isLoading = false;
  playlistLoading = false;
  playlistMusicLoading = false;
  createLoading = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  create_playlist = flow(function* (this: Playlist, name: string) {
    this.createLoading = true;
    try {
      const playlist = yield playlistApi.create(name);

      this.playlists.push(playlist);
    } catch (error) {
      console.log(error);
    } finally {
      this.createLoading = false;
    }
  });

  delete_playlist = flow(function* (this: Playlist, playlistId: number) {
    this.isLoading = true;
    try {
      yield playlistApi.delete(playlistId);

      runInAction(() => {
        this.playlists = this.playlists.filter(
          (playlist) => playlist.id !== playlistId,
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  });

  get_playlist = flow(function* (this: Playlist) {
    this.playlistLoading = true;
    try {
      const playlist = yield playlistApi.get();

      runInAction(() => {
        this.playlists = playlist;
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.playlistLoading = false;
    }
  });

  add_music_in_playlist = flow(function* (
    this: Playlist,
    playlistId: number,
    musicId: number,
  ) {
    this.isLoading = true;
    try {
      const music = yield playlistApi.add_music(playlistId, musicId);

      runInAction(() => {
        if (!music) return;
        this.playlistMusic.push(music);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  });

  delete_music_from_playlist = flow(function* (
    this: Playlist,
    playlistId: number,
    musicId: number,
  ) {
    this.isLoading = true;
    try {
      yield playlistApi.delete_music(playlistId, musicId);
      runInAction(() => {
        this.playlistMusic = this.playlistMusic.filter(
          (item) => item.musicId !== Number(musicId),
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  });

  get_music_playlist = flow(function* (this: Playlist, playlistId: number) {
    this.playlistMusicLoading = true;
    try {
      const music = yield playlistApi.get_music(playlistId);

      runInAction(() => {
        this.playlistMusic = music.map((item) => item.music);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.playlistMusicLoading = false;
    }
  });

  update_playlist = flow(function* (this: Playlist, formData: FormData) {
    try {
      yield playlistApi.update_info(formData);
    } catch (error) {
      console.log(error);
    }
  });
}
