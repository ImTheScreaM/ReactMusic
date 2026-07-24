import {ApiRequest} from "../api/apiRequest"


import {makeAutoObservable, runInAction} from "mobx";

class Search {
  result = [];
  searchPlaylist = []
  searchLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  *search_by_category(value:string,category:string) {
    this.searchLoading = true;
    this.result = []

    try {
      let url:string;
      let body:Object;

      switch (category) {
        case "name":
          url = "http://localhost:3003/search_name";
          body = {value};
          break;
        case "artist":
          url = "http://localhost:3003/search_artist";
          body = {value};
          break;
        default:
          url = "http://localhost:3003/search_name";
          body = {value};

      }
      const res = yield ApiRequest(url,"POST",body);

      runInAction(() => {
        this.searchPlaylist = res.search;
        this.result = res.search.map(item => item.id);
        this.searchLoading = false;
      })

    } catch (error) {
      console.error(error);
    } finally {
      this.searchLoading = false;
    }

  }
}

export default new Search();

