import { makeAutoObservable, runInAction } from "mobx";

import { ApiRequest, ApiUpload } from "../api/apiRequest";

const URL = process.env.REACT_APP_URL_SERVER || "http://localhost:3003";

class Playlist {
  playlists = [];
  playlistMusic = [];

  isLoading = false;
  playlistLoading = false;
  playlistMusicLoading = false;
  createLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  *create_playlist(name: string) {
    this.createLoading = true;
    try {
      const res = yield ApiRequest(`${URL}/create_playlist`, "POST", { name });

      runInAction(() => {
        this.playlists.push(res.playlist);
        this.createLoading = false;
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.createLoading = false;
    }
  }

  *delete_playlist(playlistId: number) {
    this.isLoading = true;
    try {
      yield ApiRequest(`${URL}/delete_playlist`, "POST", { playlistId });
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
  }

  *get_playlist() {
    this.playlistLoading = true;
    try {
      const res = yield ApiRequest(`${URL}/get_playlist`, "POST");

      runInAction(() => {
        this.playlists = res;
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.playlistLoading = false;
    }
  }

  *add_music_in_playlist(playlistId: number, musicId: number) {
    this.isLoading = true;
    try {
      const res = yield ApiRequest(`${URL}/add_music_in_playlist`, "POST", {
        playlistId,
        musicId,
      });

      runInAction(() => {
        if (!res.data) return;
        this.playlistMusic.push(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  *delete_music_from_playlist(playlistId: number, musicId: number) {
    this.isLoading = true;
    try {
      yield ApiRequest(`${URL}/delete_music_from_playlist`, "POST", {
        playlistId,
        musicId,
      });
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
  }

  *get_music_playlist(playlistId: number) {
    this.playlistMusicLoading = true;
    try {
      const res = yield ApiRequest(`${URL}/get_music_playlist`, "POST", {
        playlistId,
      });

      runInAction(() => {
        this.playlistMusic = res.map((item) => item.music);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.playlistMusicLoading = false;
    }
  }

  *update_playlist_avatar(formData: FormData) {
    try {
      yield ApiUpload(`${URL}/change_playlist_avatar`, "POST", 
        formData,
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Playlist();
