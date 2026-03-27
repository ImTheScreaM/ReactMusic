import ApiRequest from "../api/apiRequest";
import {IMusic} from "../interface/intarface";
import {makeAutoObservable, runInAction} from "mobx";

class Music {
  favorite = null;
  isLoading = true;

  constructor() {
    makeAutoObservable(this);
    this.get_user_music();
  }
  *all_music() {
    try {
      const response = yield ApiRequest(
        "http://localhost:3003/all_music",
        "GET",
      );
    } catch (error) {
      console.log(error);
    }
  }

  *get_user_music() {
    try {
      const res = yield ApiRequest(
        "http://localhost:3003/user_music",
        "GET",
      );
      runInAction(() => {
        this.favorite = res.userMusic
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
        "GET",
      );
    } catch (error) {
      console.log(error);
    }
  }

  *add_music(data) {
    try {
      const response = yield ApiRequest(
        "http://localhost:3003/add_music",
        "POST",data
      );
    } catch (error) {
      console.log(error);
    }
  }

  *remove_my_music(data) {
    try {
      const response = yield ApiRequest(
        "http://localhost:3003/remove_my_music",
        "DELETE",data
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Music()