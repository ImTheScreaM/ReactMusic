import {makeAutoObservable, runInAction} from "mobx";

import ApiRequest from "../api/apiRequest";


const URL = process.env.REACT_APP_URL_SERVER || "http://localhost:3003";

class Playlist {

  playlists = [];
  playlistMusic = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  *create_playlist(name:string) {
    this.isLoading = true;
    try {
      yield ApiRequest(`${URL}/create_playlist`,"POST", {name})

    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  *delete_playlist(playlistId:number) {
    this.isLoading = true;
    try {
      yield ApiRequest(`${URL}/delete_playlist`,"POST",{playlistId})
      runInAction(() => {
        this.playlists = this.playlists.filter(playlist => playlist.id !== playlistId);
      })
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  *get_playlist() {
    this.isLoading = true;
    try {
      const res = yield ApiRequest(`${URL}/get_playlist`,"GET");
      console.log(res);
      runInAction(() => {
        this.playlists = res;
      });

    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  *add_music_in_playlist(playlistId,musicId) {
    this.isLoading = true;
    try {
      const res = yield ApiRequest(`${URL}/add_music_in_playlist`,"POST",{playlistId,musicId});
      runInAction(() => {
        this.playlistMusic.push(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }


  *delete_music_from_playlist(playlistId,musicId) {
    this.isLoading = true;
    try {
      yield ApiRequest(`${URL}/delete_music_from_playlist`,"POST",{playlistId,musicId});
      runInAction(() => {
        this.playlistMusic = this.playlistMusic.filter(playlistMusic => playlistMusic.id !== musicId);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  *get_music_playlist(playlistId) {
    this.isLoading = true;
    try {
      const res = yield ApiRequest(`${URL}/get_music_playlist`,"POST", {playlistId});

      console.log(res)

      runInAction(() => {
        this.playlistMusic = res;
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

}

export default new Playlist();