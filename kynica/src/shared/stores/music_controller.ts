import {ApiRequest} from "../api/apiRequest";
import {IMusic} from "../interface/intarface";

import {makeAutoObservable, runInAction} from "mobx";

class Music {
  userMusic:IMusic[] | string = [];
  allMusic:IMusic[] = [];
  userMusicQuantity:number = 0;

  loadingAllMusic:boolean = false;
  userAllMusic:boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.get_all_music();
    this.get_user_music();
  }

  *get_all_music() {
    this.loadingAllMusic = true;
    try {
      const res = yield ApiRequest(
        "http://localhost:3003/all_music",
        "GET",
      );

      runInAction(() => {
        this.allMusic = res.music;
        this.loadingAllMusic = false;
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingAllMusic = false;
    }
  }

  *get_user_music() {
    this.userAllMusic = true;
    try {
      const res = yield ApiRequest(
        "http://localhost:3003/user_music",
        "GET",
      );

      runInAction(() => {
        this.userMusic = res.userMusic.getMusic.length > 0 ? res.userMusic : null;
        this.userMusicQuantity = res.userMusic.getMusic.length
        this.userAllMusic = false;
      })
    } catch (error) {
      console.log(error);
    } finally {
      this.userAllMusic = false;
    }
  }

  *add_rm_user_music(data:IMusic) {
    console.log(data)
    try {
      const res = yield ApiRequest("http://localhost:3003/add_rm_user_music","POST",data);
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  }

  *upload_music(data:string) {
    yield ApiRequest("http://localhost:3003/upload_music","POST",data);
  }

}

export default new Music()