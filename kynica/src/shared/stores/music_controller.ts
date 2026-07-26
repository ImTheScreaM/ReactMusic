import { musicApi } from "../api/music.api.ts";
import { IMusic, IUploadMusic } from "../interface/intarface";

import { flow, makeAutoObservable, runInAction } from "mobx";

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

  get_all_music = flow(function* (this: Music) {
    this.loadingAllMusic = true;
    try {
      const res = yield musicApi.all_music();
      
      runInAction(() => {
        this.allMusic = res;
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingAllMusic = false;
    }
  });

  get_user_music = flow(function* (this: Music) {
    this.userAllMusic = true;
    try {
      const res = yield musicApi.user_music();

      runInAction(() => {
        this.userMusic = res;
        this.userMusicQuantity = res.length;
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.userAllMusic = false;
    }
  });

  add_rm_user_music = flow(function* (this: Music, data: IMusic) {
    try {
      console.log(data);
      
      const res = yield musicApi.add_rm_music(data);
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
  });

  upload_music = flow(function* (this: Music, data: IUploadMusic) {
    
    console.log(data);
    
    const res = yield musicApi.upload_music(data);

    runInAction(() => {
      this.allMusic.push(res);
    });
  });
}

export default new Music();
