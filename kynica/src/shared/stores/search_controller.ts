import ApiRequest from "../api/apiRequest"

import {makeAutoObservable, runInAction} from "mobx";

class Search {
  result = [];
  searchPlaylist = [];
  searchLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  *search_by_category(value,category) {
    this.searchLoading = true;
    this.result = []

    try {
      let url;
      let body;

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
        this.result = res.search;
        this.searchPlaylist = res.search
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

