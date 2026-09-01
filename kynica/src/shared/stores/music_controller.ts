import { musicApi } from "../api/music.api.ts";
import { IMusic, IUploadMusic, IArtistData } from "../interface/intarface";

import { flow, makeAutoObservable, runInAction } from "mobx";
import { RootStore } from "./rootStore.ts";

export class Music {
  rootStore: RootStore;
  userMusic: IMusic[] = [];
  artistMusic: IMusic[] = [];
  dataArtist: IArtistData[] = [];
  allMusic: IMusic[] = [];
  userMusicQuantity: number = 0;

  loadingAllMusic: boolean = false;
  loadingUserAllMusic: boolean = false;
  loadingArtistMusic: boolean = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
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
    this.loadingUserAllMusic = true;
    try {
      const res = yield musicApi.user_music();

      runInAction(() => {
        this.userMusic = res;
        this.userMusicQuantity = res.length;
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingUserAllMusic = false;
    }
  });

  get_artist_music = flow(function* (this: Music, idArtist: number) {
    this.loadingArtistMusic = true;
    try {
      const res = yield musicApi.artist_music(idArtist);

      this.artistMusic = res.dataMusic;
      this.dataArtist = res.dataArtist;
    } catch (error) {
      console.log("get artist music error");
    } finally {
      this.loadingArtistMusic = false;
    }
  });

  add_rm_user_music = flow(function* (this: Music, data: IMusic) {
    try {
      const res = yield musicApi.add_rm_music(data);
      runInAction(() => {
        const isLiked = res.liked;
        data.isLiked = isLiked;

        const music = this.allMusic.find((music) => music.id === data.id);

        if (music) {
          music.isLiked = isLiked;
        }

        if (isLiked) {
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
    yield musicApi.upload_music(data);
  });
}
