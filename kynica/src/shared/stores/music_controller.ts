import { ApiRequest, ApiUpload } from "../api/apiRequest.jsx";
import { IMusic, IUploadMusic } from "../interface/intarface";

import { makeAutoObservable, runInAction } from "mobx";

class Music {
  userMusic: IMusic[] = [];
  allMusic: IMusic[] = [];
  userMusicQuantity: number = 0;

  loadingAllMusic: boolean = false;
  userAllMusic: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.get_all_music();
    this.get_user_music();
  }

  *get_all_music() {
    this.loadingAllMusic = true;
    try {
      const res = yield ApiRequest("http://localhost:3003/all_music", "GET");

      runInAction(() => {
        this.allMusic = res.music;
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
      const res = yield ApiRequest("http://localhost:3003/user_music", "GET");

      runInAction(() => {
        this.userMusic = res.userMusic.getMusic;
        this.userMusicQuantity = res.userMusic.getMusic.length;
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.userAllMusic = false;
    }
  }

  *add_rm_user_music(data: IMusic) {
    try {
      const res = yield ApiRequest(
        "http://localhost:3003/add_rm_user_music",
        "POST",
        data,
      );
      console.log(res);
      
      runInAction(() => {
        const music = this.allMusic.find((music) => music.id === data.id);

        if (music) {
          music.isLiked = res.liked;
        }

        if (res.liked) {
          this.userMusic.push(data);
        } else {
          this.userMusic = this.userMusic.filter(
            (music) => music.id !== data.id,
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  *upload_music(data: IUploadMusic) {
    const res = yield ApiUpload(
      "http://localhost:3003/upload_music",
      "POST",
      data,
    );

    runInAction(() => {
      this.allMusic.push(res.uploadMusic);
    });
  }
}

export default new Music();
