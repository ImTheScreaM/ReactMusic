import {makeAutoObservable} from "mobx";
import ApiRequest from "../api/apiRequest.js";


const URL = process.env.URL_SERVER;

class Playlist_controller {

  constructor() {
    makeAutoObservable(this);
  }


  *createPlaylist(data) {
    try {
      const res = yield ApiRequest(`${URL}create_playlist`,data)
      console.log(res);
    } catch (err) {
      console.error("create F =)",err);
    }
  }

  *getPlaylist(userId) {
    try {
      const res = yield ApiRequest(`${URL}get_playlist`,userId);
      console.log(res);
    } catch (err) {
      console.error("get F =)",err);
    }
  }
}
