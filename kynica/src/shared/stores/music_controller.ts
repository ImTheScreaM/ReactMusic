import ApiRequest from "../api/apiRequest";
import {IMusic} from "../interface/intarface";

import {makeAutoObservable, runInAction} from "mobx";

class Music {
  userMusic:IMusic[] | string = [];
  isLoading:boolean = true;
  allMusic:IMusic[] = [];
  userMusicQuantity:number = 0;

  constructor() {
    makeAutoObservable(this);
    this.get_all_music();
    this.get_user_music();
  }

  *get_all_music() {
    try {
      const res = yield ApiRequest(
        "http://localhost:3003/all_music",
        "GET",
      );

      runInAction(() => {
        this.allMusic = res.music;
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  *get_user_music() {
    try {
      const res = yield ApiRequest(
        "http://localhost:3003/user_music",
        "GET",
      );

      runInAction(() => {
        this.userMusic = res.userMusic.getMusic.length > 0 ? res.userMusic : null;
        this.userMusicQuantity = res.userMusic.getMusic.length
      })
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  *find_music() {
    try {
      const response = yield ApiRequest(
        "http://localhost:3003/find_music",
        "POST",
      );
    } catch (error) {
      console.log(error);
    }
  }

  *add_rm_user_music(data) {
    try {
      yield ApiRequest("http://localhost:3003/add_rm_user_music","POST",data);
    } catch (error) {
      console.log(error);
    }

  }

}

export default new Music()